import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";
import { Input, Form, Button } from "@/components/elements";
import { toast } from "react-hot-toast";
import { FullContainer, HalfContainer } from "@/components/elements/styles";
import { formSetErrors, UpdateBatchHelper } from "@/common/helpers/form";
import { styled } from "@/config/stitches/theme.stitches";
import { FormValueState } from "@/components/elements/input";
import SaleItemTable, { SaleItemTableDataType } from "./sale-item-table";
import { SalesOrderItemLite } from "@/api-hooks/sales-order-item/sales-order-item.model";
import SalesOrderSelectOption from "@/components/elements/select-input-helper/sales-order-select-input";
import { useGetSalesOrderItems } from "@/api-hooks/sales-order-item/sales-order-item.query";
import { Sale } from "@/api-hooks/sales/sales.model";
import { TransactionLite } from "@/api-hooks/sales-order/sales-order.model";
import { string2money } from "@/utils/string";

type FormType = {
  code?: string;
  paymentMethod?: string;
  salesOrderId?: string;
  transactionDate?: Date;
  transaction?: TransactionLite;
  salesItems?: {
    id?: string;
    salesOrderItemId?: string;
    quantity?: number | string;
    unit?: string;
  };
  address?: string;
};

interface Props {
  data?: Sale;
  onSubmit: (
    values: FormType,
    salesItems: SaleItemTableDataType[]
  ) => Promise<void> | void;
  defaultEditable?: boolean;
}

export default function SaleForm(props: Props) {
  const { data, defaultEditable = true } = props;
  const [tableData, setTableData] = React.useState<SaleItemTableDataType[]>(
    data?.salesItems.map((item) => ({
      ...item,
      amountNotReceived: 0,
      item: item.salesOrderItem.item,
      priceUnit: item.price,
      siId: item.id,
      id: item.salesOrderItem.id,
      unit: item.salesOrderItem.unit,
    })) || []
  );
  const [tempData, setTempData] = React.useState<SalesOrderItemLite>();
  const isOnline =
    !!data?.salesOrder?.id &&
    data?.salesOrder?.paymentMethod?.provider !== "Offline";
  const YupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        code: Yup.string().nullable().strip(true),
        paymentMethod: Yup.string().nullable().strip(true),
        salesOrderId: Yup.string().required(),
        transactionDate: Yup.date()
          .transform((_, val) => (val ? new Date(val) : null))
          .required(),
        salesItems: Yup.object()
          .shape({
            id: Yup.string().nullable(),
            salesOrderItemId: Yup.string().required(),
            quantity: Yup.string().required(),
            unit: Yup.string().nullable(),
          })
          .strip(true),
      }),
    []
  );
  const resolver = useYupValidationResolver(YupSchema);

  const methods = useForm<FormType>({
    resolver,
    mode: "all",
    defaultValues: {
      ...(data
        ? {
            code: data.code,
            paymentMethod: data.salesOrder.paymentMethod?.name,
            salesOrderId: data.salesOrder.id,
            transactionDate: data.transactionDate,
            transaction: {
              ...data.salesOrder.transaction,
              shippingCost:
                typeof data?.salesOrder?.transaction?.shippingCost === "number"
                  ? (string2money(
                      data?.salesOrder?.transaction?.shippingCost.toString()
                    ) as any)
                  : data?.salesOrder?.transaction?.shippingCost,
            },
            address:
              data?.salesOrder?.transaction?.address?.addressDetail +
              ", " +
              data?.salesOrder?.transaction?.address?.city?.name,
          }
        : {
            transactionDate: new Date(Date.now()),
          }),
    },
  });

  const salesOrderId = useWatch({
    name: "salesOrderId",
    control: methods.control,
  });

  const salesOrderItemQuery = useGetSalesOrderItems(
    { id: salesOrderId! },
    {
      enabled: !!salesOrderId,
      onSuccess: (salesOrderItemData) => {
        onSalesOrderItemSelect(undefined);
        setTempData(undefined);
        if (!data) setTableData([]);
      },
    }
  );

  const salesOrderItemOptions = React.useMemo(() => {
    let _data = [
      ...(salesOrderItemQuery?.data?.data || []),
      ...(data?.salesItems?.map((val) => ({
        ...val.salesOrderItem,
        item: val.salesOrderItem.item,
      })) || []),
    ];
    _data = _data.filter(
      (item) => !tableData.find((tableItem) => tableItem.id === item.id)
    );

    return (
      _data?.map(({ item, id }) => ({
        label: `${item?.categoryItem.name} | ${item.categoryItem?.brand} | ${item?.size} | ${item?.thick}mm | ${item?.color} (${item?.code}) (Stok: ${item.stock})`,
        value: id,
      })) || []
    );
  }, [data?.salesItems, salesOrderItemQuery?.data?.data, tableData]);

  const onSubmit = React.useCallback(
    async (values) => {
      try {
        const input = YupSchema.cast(values) as FormType;
        await props.onSubmit(
          input,
          tableData.map((data) => ({
            ...data,
          }))
        );
        methods.reset();
        setTableData([]);
      } catch (e: any) {
        if (e?.errors) {
          formSetErrors(e?.errors, methods.setError);
        }
        e?.message && toast.error(e?.message);
      }
    },
    [YupSchema, methods, props, tableData]
  );

  const onAddItem = React.useCallback(
    async (values) => {
      try {
        await YupSchema.validateAt(
          "salesItems",
          { salesItems: { ...values } },
          {
            abortEarly: false,
          }
        );
        if (!tempData) return;
        setTableData((prev) =>
          prev.concat([
            {
              ...tempData,
              quantity: values.quantity,
              siId: undefined,
              price: tempData.priceUnit,
              amountNotReceived: 0,
            },
          ])
        );
        UpdateBatchHelper(
          {
            salesItems: {
              salesOrderItemId: "",
              amountNotReceived: "",
              price: "",
              unit: "",
              quantity: "",
            },
          },
          methods
        );
      } catch (e: unknown) {
        if (e instanceof Yup.ValidationError) {
          const errors = e.inner.reduce((prev, cur) => {
            if (!cur.path) return prev;
            return {
              ...prev,
              [cur.path]: cur.message,
            };
          }, {} as { [key: string]: string });
          formSetErrors(errors, methods.setError);
        }
      }
    },
    [YupSchema, methods, tempData]
  );

  const onDeleteItem = React.useCallback(
    (index: number) => {
      methods.clearErrors("salesItems");
      setTableData((prev) => {
        prev.splice(index, 1);
        return [...prev];
      });
    },
    [methods]
  );
  const onSalesOrderItemSelect = React.useCallback(
    (values) => {
      const id = values?.value;
      UpdateBatchHelper(
        {
          salesItems: {
            salesOrderItemId: "",
            amountNotReceived: "",
            price: "",
            unit: "",
            quantity: "",
          },
        },
        methods
      );
      const salesOrderItem = salesOrderItemQuery.data?.data?.find(
        (item) => item.id === id
      );

      setTempData(salesOrderItem);
      UpdateBatchHelper(
        {
          salesItems: {
            salesOrderItemId: id,
            amountNotReceived: salesOrderItem?.amountNotReceived,
            unit: salesOrderItem?.unit,
            price: salesOrderItem?.priceUnit,
          },
        },
        methods
      );
    },
    [methods, salesOrderItemQuery.data?.data]
  );

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      defaultEditable={defaultEditable}
    >
      <FullContainer>
        <HalfContainer>
          {data?.code && (
            <Input name="code" type="text" label="Kode" disabled />
          )}

          <SalesOrderSelectOption
            name="salesOrderId"
            label="Pesanan Penjualan"
            placeholder="Pilih Pesanan Penjualan"
            disabled={!!data?.id}
          />
          {typeof data?.salesOrder?.transaction?.shippingCost === "number" && (
            <Input
              name="transaction.shippingCost"
              type="text"
              label="Ongkos Kirim"
              disabled
              startEnhancer="Rp"
            />
          )}
          {!!data?.salesOrder?.transaction?.address?.id && (
            <Input
              name="address"
              type="textarea"
              label="Alamat Kirim"
              disabled
            />
          )}
        </HalfContainer>
        <HalfContainer>
          <Input
            name="transactionDate"
            type="date"
            label="Tanggal Penjualan"
            disabled={isOnline}
          />

          {data?.salesOrder?.transaction?.status && (
            <Input name="transaction.noReceipt" type="text" label="No Resi" />
          )}
          {data?.salesOrder?.transaction?.status && (
            <Input
              name="transaction.status"
              type="enum"
              enumClass="transaction-status"
              label="Status"
            />
          )}

          {data?.salesOrder.paymentMethod && (
            <Input
              name="paymentMethod"
              type="text"
              label="Metode Pembayaran"
              disabled
            />
          )}
        </HalfContainer>
      </FullContainer>
      <FullContainer direction="column">
        {defaultEditable && !isOnline && (
          <>
            <Input
              name="salesItems.salesOrderItemId"
              type="select"
              label="Tambah Barang"
              placeholder="Pilih Barang"
              options={salesOrderItemOptions}
              isClearable
              isLoading={
                salesOrderItemQuery.isLoading || salesOrderItemQuery.isFetching
              }
              onSelect={onSalesOrderItemSelect}
            />
            <Row>
              <HalfContainer>
                <FormValueState keys={["salesItems.amountNotReceived"]}>
                  {(key) => {
                    return (
                      <Input
                        name="salesItems.quantity"
                        type="number"
                        label="Jumlah"
                        max={key?.["salesItems.amountNotReceived"]}
                        min={1}
                      />
                    );
                  }}
                </FormValueState>
                <Input
                  name="salesItems.price"
                  type="number"
                  label="Harga Satuan"
                  disabled
                />
              </HalfContainer>
              <HalfContainer>
                <Input
                  name="salesItems.unit"
                  type="text"
                  label="Satuan"
                  disabled
                />
              </HalfContainer>
            </Row>
          </>
        )}
        <SaleItemTable
          data={tableData}
          onDelete={onDeleteItem}
          grandTotal={
            data?.grandTotal ||
            tableData?.reduce((prev, current) => {
              return prev + current.quantity * current.price;
            }, 0)
          }
          isOnline={isOnline}
        />
        {defaultEditable && !isOnline && (
          <AddButtonContainer>
            <FormValueState keys={["salesItems"]}>
              {({ salesItems }) => (
                <Button size="large" onClick={() => onAddItem(salesItems)}>
                  TAMBAH
                </Button>
              )}
            </FormValueState>
          </AddButtonContainer>
        )}
      </FullContainer>
      <Input
        type="submit"
        text="SIMPAN"
        size="large"
        disabled={
          Object.keys(methods.formState.errors).length > 0 ||
          tableData.length < 1
        }
      />
    </Form>
  );
}

const Row = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

const AddButtonContainer = styled("div", {
  display: "flex",
  marginTop: 20,
  alignSelf: "flex-end",
});

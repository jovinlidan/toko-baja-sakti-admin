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
import CustomerSelectOption from "@/components/elements/select-input-helper/customer-select-input";
import ItemSelectOption from "@/components/elements/select-input-helper/item-select-input";
import { useGetItems } from "@/api-hooks/item/item.query";
import { ItemUnitEnum } from "@/api-hooks/item/item.model";

type FormType = {
  code?: string;
  paymentMethod?: string;
  salesOrderId?: string;
  transactionDate?: Date;
  transaction?: TransactionLite;
  bypass?: boolean;
  salesItems?: {
    id?: string;
    itemId?: string;
    salesOrderItemId?: string;
    quantity?: number | string;
    unit?: string;
    price?: number | string;
    unitEnum?: string;
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
      Yup.object({
        code: Yup.string().nullable().strip(true),
        paymentMethod: Yup.string().nullable().strip(true),

        salesOrderId: Yup.string().when("bypass", {
          is: (val) => !!val,
          then: (schema) => schema.nullable().strip(true),
          otherwise: (schema) => schema.required(),
        }),
        userId: Yup.string().when("bypass", {
          is: (val) => !val,
          then: (schema) => schema.nullable().strip(true),
          otherwise: (schema) => schema.required(),
        }),
        bypass: Yup.boolean(),
        transactionDate: Yup.date()
          .transform((_, val) => (val ? new Date(val) : null))
          .required(),
        salesItems: Yup.object({
          id: Yup.string().nullable(),
          salesOrderItemId: Yup.string().when("bypass", {
            is: (val) => {
              return !!val;
            },
            then: (schema) => schema.nullable().strip(true),
            otherwise: (schema) => schema.required(),
          }),
          itemId: Yup.string().when("bypass", {
            is: (val) => !val,
            then: (schema) => schema.nullable().strip(true),
            otherwise: (schema) => schema.required(),
          }),
          quantity: Yup.string().required(),
          unit: Yup.string().when("bypass", {
            is: (val) => !val,
            then: (schema) => schema.nullable().strip(true),
            otherwise: (schema) => schema.required(),
          }),
          unitEnum: Yup.string().nullable(),
        }).strip(true),
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
            bypass: true,
          }),
    },
  });
  const salesOrderId = useWatch({
    name: "salesOrderId",
    control: methods.control,
  });

  const itemId = useWatch({
    name: "salesItems.itemId",
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

  const itemQuery = useGetItems({ params: { for: "active" } });

  const salesOrderItemData = React.useMemo(() => {
    let _data = [...(salesOrderItemQuery?.data?.data || [])];

    _data = _data?.reduce((prev, next) => {
      const found = data?.salesItems?.find(
        (item) => item.salesOrderItem.id === next.id
      );
      if (found) {
        return [
          ...prev,
          { ...next, saleQuantity: next.amountNotReceived + found.quantity },
        ];
      }
      return [...prev, next];
    }, [] as any);

    const restData =
      data?.salesItems?.filter((item) => {
        const hasDuplicate = _data?.find(
          (hasDupItem) => hasDupItem.id === item.salesOrderItem.id
        );
        return !hasDuplicate;
      }) || [];

    _data = [
      ..._data,
      ...((restData?.map(({ salesOrderItem, price }) => ({
        id: salesOrderItem.id,
        amountNotReceived: salesOrderItem.quantity,
        item: salesOrderItem.item,
        priceUnit: price,
        quantity: salesOrderItem.quantity,
        unit: salesOrderItem.unit,
      })) as SalesOrderItemLite[]) || []),
    ];

    _data = _data.filter(
      (item) => !tableData.find((tableItem) => tableItem.id === item.id)
    );
    return _data;
  }, [data?.salesItems, salesOrderItemQuery?.data?.data, tableData]);

  const itemOptions = React.useMemo(() => {
    return (
      itemQuery?.data?.data?.map((item) => ({
        label: `${item?.categoryItem.name} | ${item.categoryItem?.brand} | ${item?.size} | ${item?.thick}mm | ${item?.color} | (${item?.code}) (Stok: ${item.stock})`,
        value: item.id,
      })) || []
    );
  }, [itemQuery?.data?.data]);

  const salesOrderItemOptions = React.useMemo(() => {
    return (
      salesOrderItemData?.map(({ item, id, unit }) => ({
        label: `${item?.categoryItem.name} | ${item.categoryItem?.brand} | ${item?.size} | ${item?.thick}mm | ${item?.color}  | ${unit} | (${item?.code}) (Stok: ${item.stock})`,
        value: id,
      })) || []
    );
  }, [salesOrderItemData]);

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
          {
            salesItems: { ...values, bypass: methods.getValues().bypass },
          },
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
              price: values.price,
              unit: values.unit,
              unitEnum: values.unitEnum,
              amountNotReceived: 0,
            },
          ])
        );

        UpdateBatchHelper(
          {
            salesItems: {
              salesOrderItemId: "",
              itemId: "",
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
  const satuanOptions = React.useMemo(() => {
    if (!itemId) return;
    const item = itemQuery?.data?.data?.find((it) => it.id === itemId);
    return [
      {
        label: item?.categoryItem.bigUnit,
        value: item?.categoryItem.bigUnit,
      },
      {
        label: item?.categoryItem.smallUnit,
        value: item?.categoryItem.smallUnit,
      },
    ];
  }, [itemId, itemQuery?.data?.data]);
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
      const salesOrderItem = salesOrderItemData.find((item) => item.id === id);

      setTempData(salesOrderItem);
      UpdateBatchHelper(
        {
          salesItems: {
            salesOrderItemId: id,
            amountNotReceived: salesOrderItem?.amountNotReceived,
            unit: salesOrderItem?.unit,
            price: salesOrderItem?.priceUnit,
            quantity: salesOrderItem?.amountNotReceived,
          },
        },
        methods
      );
    },
    [methods, salesOrderItemData]
  );
  const onItemSelect = React.useCallback(
    (values) => {
      const id = values?.value;
      UpdateBatchHelper(
        {
          salesItems: {
            itemId: "",
            amountNotReceived: "",
            price: "",
            unit: "",
            quantity: "",
          },
        },
        methods
      );
      if (!id) return;
      const item = itemQuery?.data?.data?.find((item) => item.id === id);

      setTempData({
        amountNotReceived: 0,
        id: item?.id!,
        item: item as any,
        priceUnit: 0,
        quantity: 0,
        unit: "",
      });
      UpdateBatchHelper(
        {
          salesItems: {
            itemId: id,
            // amountNotReceived: 0,
            quantity: item?.stock,
          },
        },
        methods
      );
    },
    [itemQuery?.data?.data, methods]
  );

  const onUnitAfterChange = React.useCallback(
    (values: any) => {
      if (!itemId) return;
      const item = itemQuery?.data?.data?.find((it) => it.id === itemId);
      if (values?.value === item?.categoryItem.bigUnit) {
        methods.setValue("salesItems.price", item?.wholesalePrice);
        methods.setValue("salesItems.unitEnum", ItemUnitEnum.Wholesale);
        return;
      } else if (values.value === item?.categoryItem?.smallUnit) {
        methods.setValue("salesItems.price", item?.retailPrice);
        methods.setValue("salesItems.unitEnum", ItemUnitEnum.Retail);
        return;
      }
      methods.setValue("salesItems.price", "");
    },
    [itemId, itemQuery?.data?.data, methods]
  );

  const onAfterChangeCheckbox = React.useCallback(
    (e) => {
      methods.reset({
        bypass: e?.target?.checked,
        salesItems: {
          itemId: "",
          price: "",
          quantity: "",
          unit: "",
          salesOrderItemId: "",
          id: "",
          unitEnum: "",
        },
        salesOrderId: "",
      });
      setTableData([]);
    },
    [methods]
  );

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      defaultEditable={defaultEditable}
    >
      <FullContainer direction="column">
        {!data?.id && (
          <Row>
            <HalfContainer>
              <Input
                type="checkbox"
                name="bypass"
                label="Tanpa Pesanan Penjualan"
                onAfterChange={onAfterChangeCheckbox}
              />
            </HalfContainer>
          </Row>
        )}
        <Row>
          <HalfContainer>
            {data?.code && (
              <Input name="code" type="text" label="Kode" disabled />
            )}

            <FormValueState keys={["bypass"]}>
              {({ bypass }) =>
                !bypass ? (
                  <SalesOrderSelectOption
                    name="salesOrderId"
                    label="Pesanan Penjualan"
                    placeholder="Pilih Pesanan Penjualan"
                    disabled={!!data?.id}
                    params={{ for: "sales" }}
                  />
                ) : (
                  <CustomerSelectOption
                    name="userId"
                    label="Pelanggan"
                    placeholder="Pilih Pelanggan"
                  />
                )
              }
            </FormValueState>

            {typeof data?.salesOrder?.transaction?.shippingCost ===
              "number" && (
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
        </Row>
      </FullContainer>
      <FullContainer direction="column">
        {defaultEditable && !isOnline && (
          <>
            <FormValueState keys={["bypass"]}>
              {({ bypass }) =>
                !bypass ? (
                  <Input
                    name="salesItems.salesOrderItemId"
                    type="select"
                    label="Tambah Barang"
                    placeholder="Pilih Barang"
                    options={salesOrderItemOptions}
                    isClearable
                    isLoading={
                      salesOrderItemQuery.isLoading ||
                      salesOrderItemQuery.isFetching
                    }
                    onSelect={onSalesOrderItemSelect}
                  />
                ) : (
                  <Input
                    name="salesItems.itemId"
                    type="select"
                    label="Tambah Barang"
                    placeholder="Pilih Barang"
                    options={itemOptions}
                    isClearable
                    isLoading={itemQuery.isLoading || itemQuery.isFetching}
                    onSelect={onItemSelect}
                  />
                )
              }
            </FormValueState>

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
                <FormValueState keys={["bypass"]}>
                  {({ bypass }) => {
                    return bypass ? (
                      <Input
                        name="salesItems.unit"
                        type="select"
                        label="Satuan"
                        isLoading={itemQuery.isLoading || itemQuery.isFetching}
                        placeholder="Pilih Satuan"
                        options={satuanOptions as any}
                        onAfterChange={onUnitAfterChange}
                      />
                    ) : (
                      <Input
                        name="salesItems.unit"
                        type="text"
                        label="Satuan"
                        disabled
                      />
                    );
                  }}
                </FormValueState>
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

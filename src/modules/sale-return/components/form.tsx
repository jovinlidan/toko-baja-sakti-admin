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
import SaleItemTable, {
  SaleReturnItemTableDataType,
} from "./sale-return-item-table";
import { SalesOrderItemLite } from "@/api-hooks/sales-order-item/sales-order-item.model";
import SalesOrderSelectOption from "@/components/elements/select-input-helper/sales-order-select-input";
import { useGetSalesOrderItems } from "@/api-hooks/sales-order-item/sales-order-item.query";
import { Sale } from "@/api-hooks/sales/sales.model";
import {
  SaleReturn,
  SaleReturnItem,
} from "@/api-hooks/sales-return/sales-return.model";
import { useGetSalesItems } from "@/api-hooks/sales-item/sales-item.query";
import SalesSelectOption from "@/components/elements/select-input-helper/sales-select-input";
import { SalesItemLite } from "@/api-hooks/sales-item/sales-item.model";

type FormType = {
  code?: string;
  salesId?: string;
  transactionDate?: Date;
  salesItems?: {
    id?: string;
    salesItemId?: string;
    quantity?: number;
    reason?: string;
    saleQuantity?: string;
  };
};

interface Props {
  data?: SaleReturn;
  onSubmit: (
    values: FormType,
    salesItems: SaleReturnItemTableDataType[]
  ) => Promise<void> | void;
  defaultEditable?: boolean;
}

export default function SaleReturnForm(props: Props) {
  const { data, defaultEditable = true } = props;
  const [tableData, setTableData] = React.useState<
    SaleReturnItemTableDataType[]
  >(
    data?.salesReturnItems?.map((item) => ({
      ...item,
      unit: item.salesItems.salesOrderItem.unit,
      priceUnit: item.salesItems.price,
      saleQuantity: item.salesItems.quantity,
      item: item.salesItems.salesOrderItem.item,
      sriId: item.id,
      id: item.salesItems.id,
    })) || []
  );
  const [tempData, setTempData] = React.useState<SalesItemLite>();

  const YupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        code: Yup.string().nullable().strip(true),
        salesId: Yup.string().required(),
        transactionDate: Yup.date().required(),
        salesItems: Yup.object()
          .shape({
            id: Yup.string().nullable(),
            salesItemId: Yup.string().required(),
            quantity: Yup.number().required(),
            reason: Yup.string().nullable(),
            saleQuantity: Yup.string().nullable(),
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
            salesId: data.sales.id,
            transactionDate: data.transactionDate,
          }
        : {
            transactionDate: new Date(Date.now()),
          }),
    },
  });

  const salesId = useWatch({
    name: "salesId",
    control: methods.control,
  });

  const salesItemQuery = useGetSalesItems(
    { id: salesId! },
    {
      enabled: !!salesId,
      onSuccess: () => {
        onSalesItemSelect(undefined);
        setTempData(undefined);
        if (!data) setTableData([]);
      },
    }
  );

  const salesItemOptions = React.useMemo(() => {
    return (
      salesItemQuery.data?.data?.map((item) => ({
        label: `${item.item.categoryItem.name} (${item.item.categoryItem.code})`,
        value: item.id,
      })) || []
    );
  }, [salesItemQuery.data?.data]);

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
              sriId: undefined,
              reason: values.reason,
            },
          ])
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
  const onSalesItemSelect = React.useCallback(
    (values) => {
      const id = values?.value;
      UpdateBatchHelper(
        {
          salesItems: {
            reason: "",
            saleQuantity: "",
            quantity: "",
          },
        },
        methods
      );
      const salesItem = salesItemQuery.data?.data?.find(
        (item) => item.id === id
      );

      setTempData(salesItem);
      UpdateBatchHelper(
        {
          salesItems: {
            salesItemId: id,
            saleQuantity: salesItem?.saleQuantity,
          },
        },
        methods
      );
    },
    [methods, salesItemQuery.data?.data]
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

          <SalesSelectOption
            name="salesId"
            label="Penjualan"
            placeholder="Pilih Penjualan"
          />
        </HalfContainer>
        <HalfContainer>
          <Input
            name="transactionDate"
            type="date"
            label="Tanggal Retur Penjualan"
          />
        </HalfContainer>
      </FullContainer>
      <FullContainer direction="column">
        {defaultEditable && (
          <>
            <Input
              name="salesItems.salesItemId"
              type="select"
              label="Tambah Barang"
              placeholder="Pilih Barang"
              options={salesItemOptions}
              isClearable
              isLoading={salesItemQuery.isLoading || salesItemQuery.isFetching}
              onSelect={onSalesItemSelect}
            />
            <Row>
              <HalfContainer>
                <Input
                  name="salesItems.saleQuantity"
                  type="number"
                  label="Jumlah Jual"
                  disabled
                />
                <Input
                  name="salesItems.quantity"
                  type="number"
                  label="Jumlah Retur"
                />
              </HalfContainer>
              <HalfContainer>
                <Input
                  name="salesItems.reason"
                  type="textarea"
                  label="Alasan"
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
              return prev + current.quantity * current.priceUnit;
            }, 0)
          }
        />
        {defaultEditable && (
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

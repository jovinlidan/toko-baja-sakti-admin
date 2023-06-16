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
import { SaleReturn } from "@/api-hooks/sales-return/sales-return.model";
import { useGetSalesItems } from "@/api-hooks/sales-item/sales-item.query";
import SalesSelectOption from "@/components/elements/select-input-helper/sales-select-input";
import { SalesItemLite } from "@/api-hooks/sales-item/sales-item.model";

type FormType = {
  code?: string;
  salesId?: string;
  transactionDate?: Date;
  salesReturnItems?: {
    id?: string;
    salesItemId?: string;
    quantity?: number | string;
    reason?: string;
    saleQuantity?: string;
  };
};

interface Props {
  data?: SaleReturn;
  onSubmit: (
    values: FormType,
    salesReturnItems: SaleReturnItemTableDataType[]
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
        transactionDate: Yup.date()
          .transform((_, val) => (val ? new Date(val) : null))
          .required(),
        salesReturnItems: Yup.object()
          .shape({
            id: Yup.string().nullable(),
            salesItemId: Yup.string().required(),
            quantity: Yup.string().required(),
            reason: Yup.string().required(),
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
    let data = [...(salesItemQuery?.data?.data || [])];
    data = data.filter(
      (item) => !tableData.find((tableItem) => tableItem.id === item.id)
    );
    return (
      data?.map(({ item, id }) => ({
        label: `${item?.categoryItem.name} | ${item.categoryItem?.brand} | ${item?.size} | ${item?.thick}mm | ${item?.color} (${item?.code}) (Stok: ${item.stock})`,
        value: id,
      })) || []
    );
  }, [salesItemQuery?.data?.data, tableData]);

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
          "salesReturnItems",
          { salesReturnItems: { ...values } },
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
        UpdateBatchHelper(
          {
            salesReturnItems: {
              reason: "",
              saleQuantity: "",
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
      methods.clearErrors("salesReturnItems");
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
          salesReturnItems: {
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
          salesReturnItems: {
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
              name="salesReturnItems.salesItemId"
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
                  name="salesReturnItems.saleQuantity"
                  type="number"
                  label="Jumlah Jual"
                  disabled
                />
                <Input
                  name="salesReturnItems.quantity"
                  type="number"
                  label="Jumlah Retur"
                />
              </HalfContainer>
              <HalfContainer>
                <Input
                  name="salesReturnItems.reason"
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
            <FormValueState keys={["salesReturnItems"]}>
              {({ salesReturnItems }) => (
                <Button
                  size="large"
                  onClick={() => onAddItem(salesReturnItems)}
                >
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

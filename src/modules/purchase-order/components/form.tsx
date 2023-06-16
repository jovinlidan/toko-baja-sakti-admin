import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";
import { Input, Form, Button } from "@/components/elements";
import { toast } from "react-hot-toast";
import { FullContainer, HalfContainer } from "@/components/elements/styles";
import { formSetErrors } from "@/common/helpers/form";
import { PurchaseOrder } from "@/api-hooks/purchase-order/purchase-order.model";
import SupplierSelectOption from "@/components/elements/select-input-helper/supplier-select-input";
import ItemSelectOption from "@/components/elements/select-input-helper/item-select-input";
import { styled } from "@/config/stitches/theme.stitches";
import TableItem, {
  ItemTableDataType,
} from "@/modules/purchase-order/components/item-table";
import { FormValueState } from "@/components/elements/input";
import { Item, ItemUnitEnum } from "@/api-hooks/item/item.model";
import { useGetItem } from "@/api-hooks/item/item.query";
import { camelizeKeys } from "humps";

type FormType = {
  code?: string;
  transactionDate?: Date;
  purchaseOrderItems?: {
    id?: string;
    itemId?: string;
    quantity?: number | string;
    unit?: string;
  };
  supplierId?: string;
  status?: string;
};

interface Props {
  data?: PurchaseOrder;
  onSubmit: (
    values: FormType,
    purchaseOrderItems: ItemTableDataType[]
  ) => Promise<void> | void;
  defaultEditable?: boolean;
}

export default function PurchaseOrderForm(props: Props) {
  const { data, defaultEditable = true } = props;
  const [tableData, setTableData] = React.useState<ItemTableDataType[]>(
    data?.purchaseOrderItems?.map((item) => ({
      ...item.item,
      poiId: item.id,
      unit: item.unit,
      quantity: item.quantity,
    })) || []
  );
  const [tempData, setTempData] = React.useState<Item>();

  const YupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        code: Yup.string().nullable().strip(true),
        status: Yup.string().nullable().strip(true),
        transactionDate: Yup.date().required(),
        supplierId: Yup.string().required(),
        purchaseOrderItems: Yup.object()
          .shape({
            id: Yup.string().nullable(),
            itemId: Yup.string().required(),
            quantity: Yup.string().required(),
            unit: Yup.string().required(),
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
            supplierId: data.supplier.id,
            transactionDate: data.transactionDate,
            status: data?.status,
          }
        : {
            transactionDate: new Date(Date.now()),
          }),
    },
  });

  const itemId = useWatch({
    name: "purchaseOrderItems.itemId",
    control: methods.control,
  });

  const itemQuery = useGetItem(
    { id: itemId! },
    {
      enabled: !!itemId,
      onSuccess: (data) => {
        if (data.data) {
          setTempData(camelizeKeys(data.data));
        }
      },
    }
  );

  const onSubmit = React.useCallback(
    async (values) => {
      try {
        const input = YupSchema.cast(values) as FormType;
        await props.onSubmit(
          input,
          tableData.map((data) => ({
            ...data,
            unit:
              data.unit === data.categoryItem.bigUnit
                ? ItemUnitEnum.Wholesale
                : ItemUnitEnum.Retail,
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
          "purchaseOrderItems",
          { purchaseOrderItems: { ...values } },
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
              unit: values.unit,
              poiId: undefined,
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

  const onDeleteItem = React.useCallback((index: number) => {
    setTableData((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
  }, []);

  const satuanOptions = React.useMemo(() => {
    if (!tempData) return [];
    return [
      {
        label: tempData.categoryItem.bigUnit,
        value: tempData.categoryItem.bigUnit,
      },
      {
        label: tempData.categoryItem.smallUnit,
        value: tempData.categoryItem.smallUnit,
      },
    ];
  }, [tempData]);

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

          <SupplierSelectOption
            name="supplierId"
            label="Supplier"
            placeholder="Pilih Supplier"
          />
        </HalfContainer>
        <HalfContainer>
          <Input
            name="transactionDate"
            type="date"
            label="Tanggal Pesanan Pembelian"
          />
          {data?.status && (
            <Input
              name="status"
              type="enum"
              enumClass="purchase-order-status"
              label="Status Pesanan"
              isDisabled
            />
          )}
        </HalfContainer>
      </FullContainer>
      <FullContainer direction="column">
        {defaultEditable && (
          <>
            <ItemSelectOption
              name="purchaseOrderItems.itemId"
              label="Tambah Barang"
              placeholder="Pilih Barang"
            />
            <Row>
              <HalfContainer>
                <Input
                  name="purchaseOrderItems.quantity"
                  type="number"
                  label="Jumlah"
                />
              </HalfContainer>
              <HalfContainer>
                <Input
                  name="purchaseOrderItems.unit"
                  type="select"
                  label="Satuan"
                  isLoading={itemQuery.isLoading || itemQuery.isFetching}
                  placeholder="Pilih Satuan"
                  options={satuanOptions}
                />
              </HalfContainer>
            </Row>
          </>
        )}
        <TableItem data={tableData} onDelete={onDeleteItem} />
        {defaultEditable && (
          <AddButtonContainer>
            <FormValueState keys={["purchaseOrderItems"]}>
              {({ purchaseOrderItems }) => (
                <Button
                  size="large"
                  onClick={() => onAddItem(purchaseOrderItems)}
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

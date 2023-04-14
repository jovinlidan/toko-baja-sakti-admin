import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";
import { Input, Form, Button } from "@/components/elements";
import { toast } from "react-hot-toast";
import { FullContainer, HalfContainer } from "@/components/elements/styles";
import { formSetErrors, UpdateBatchHelper } from "@/common/helpers/form";
import SupplierSelectOption from "@/components/elements/select-input-helper/supplier-select-input";
import ItemSelectOption from "@/components/elements/select-input-helper/item-select-input";
import { styled } from "@/config/stitches/theme.stitches";
import PurchaseOrderItemTable, {
  PurchaseOrderItemTableDataType,
} from "@/modules/purchase/components/purchase-order-item-table";
import { FormValueState } from "@/components/elements/input";
import { Item } from "@/api-hooks/item/item.model";
import { camelizeKeys } from "humps";
import { Purchase } from "@/api-hooks/purchase/purchase.model";
import { useGetPurchaseOrderItems } from "@/api-hooks/purchase-order-item/purchase-order-item.query";
import PurchaseOrderSelectOption from "@/components/elements/select-input-helper/purchase-order-select-input";
import { PurchaseOrderItemLite } from "@/api-hooks/purchase-order-item/purchase-order-item.model";

type FormType = {
  code?: string;
  purchaseOrderId?: string;
  receivedDate?: Date;
  purchaseItems?: {
    id?: string;
    purchaseOrderItemId?: string;
    quantity?: number;
    price?: number;
    amountNotReceived?: number;
    unit?: string;
  };
};

interface Props {
  data?: Purchase;
  onSubmit: (
    values: FormType,
    purchaseItems: PurchaseOrderItemTableDataType[]
  ) => Promise<void> | void;
  defaultEditable?: boolean;
}

export default function PurchaseForm(props: Props) {
  const { data, defaultEditable = true } = props;
  const [tableData, setTableData] = React.useState<
    PurchaseOrderItemTableDataType[]
  >([]);
  const [tempData, setTempData] = React.useState<PurchaseOrderItemLite>();

  const YupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        code: Yup.string().nullable().strip(true),
        purchaseOrderId: Yup.string().required(),
        receivedDate: Yup.date().required(),
        purchaseItems: Yup.object()
          .shape({
            id: Yup.string().nullable(),
            purchaseOrderItemId: Yup.string().required(),
            quantity: Yup.number().required(),
            price: Yup.number().required(),
            amountNotReceived: Yup.number().nullable().strip(true),
            unit: Yup.string().nullable().strip(true),
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
            purchaseOrderId: data.purchaseOrder.id,
            receivedDate: data.receivedDate,
          }
        : {
            receivedDate: new Date(Date.now()),
          }),
    },
  });

  const purchaseOrderId = useWatch({
    name: "purchaseOrderId",
    control: methods.control,
  });

  const purchaseOrderItemQuery = useGetPurchaseOrderItems(
    { id: purchaseOrderId! },
    {
      enabled: !!purchaseOrderId,
      onSuccess: (data) => {
        onPurchaseOrderItemSelect(undefined);
        setTempData(undefined);
        setTableData([]);
      },
    }
  );

  const purchaseOrderItemOptions = React.useMemo(() => {
    return (
      purchaseOrderItemQuery.data?.data?.map((item) => ({
        label: `${item.item.categoryItem.name}-(${item.item.categoryItem.code})`,
        value: item.id,
      })) || []
    );
  }, [purchaseOrderItemQuery.data?.data]);

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
          "purchaseItems",
          { purchaseItems: { ...values } },
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
              price: values.price,
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

  const onPurchaseOrderItemSelect = React.useCallback(
    (values) => {
      const id = values?.value;
      if (!id) {
        UpdateBatchHelper(
          {
            purchaseItems: {
              purchaseOrderItemId: "",
              amountNotReceived: "",
              unit: "",
              price: "",
              quantity: "",
            },
          },
          methods
        );
        return;
      }
      const purchaseOrderItem = purchaseOrderItemQuery.data?.data?.find(
        (item) => item.id === id
      );
      setTempData(purchaseOrderItem);
      UpdateBatchHelper(
        {
          purchaseItems: {
            purchaseOrderItemId: id,
            amountNotReceived: purchaseOrderItem?.amountNotReceived,
            unit: purchaseOrderItem?.unit,
          },
        },
        methods
      );
    },
    [methods, purchaseOrderItemQuery.data?.data]
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

          <PurchaseOrderSelectOption
            name="purchaseOrderId"
            label="Pesanan Pembelian"
            placeholder="Pilih Pesanan Pembelian"
          />
        </HalfContainer>
        <HalfContainer>
          <Input name="receivedDate" type="date" label="Tanggal Pembelian" />
        </HalfContainer>
      </FullContainer>
      <FullContainer direction="column">
        {defaultEditable && (
          <>
            <Input
              name="purchaseItems.purchaseOrderItemId"
              type="select"
              label="Tambah Barang"
              placeholder="Pilih Barang"
              options={purchaseOrderItemOptions}
              isClearable
              isLoading={
                purchaseOrderItemQuery.isLoading ||
                purchaseOrderItemQuery.isFetching
              }
              onSelect={onPurchaseOrderItemSelect}
            />
            <Row>
              <HalfContainer>
                <Input
                  name="purchaseItems.quantity"
                  type="number"
                  label="Jumlah"
                />
                <Input
                  name="purchaseItems.amountNotReceived"
                  type="number"
                  label="Jumlah Belum Diterima"
                  disabled
                />
              </HalfContainer>
              <HalfContainer>
                <Input
                  name="purchaseItems.price"
                  type="number"
                  label="Harga Satuan"
                />
                <Input
                  name="purchaseItems.unit"
                  type="text"
                  label="Satuan"
                  disabled
                />
              </HalfContainer>
            </Row>
          </>
        )}
        <PurchaseOrderItemTable data={tableData} onDelete={onDeleteItem} />
        {defaultEditable && (
          <AddButtonContainer>
            <FormValueState keys={["purchaseItems"]}>
              {({ purchaseItems }) => (
                <Button size="large" onClick={() => onAddItem(purchaseItems)}>
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
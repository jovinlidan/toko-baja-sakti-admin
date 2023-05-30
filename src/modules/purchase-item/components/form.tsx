import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Input, Form, Button } from "@/components/elements";
import { toast } from "react-hot-toast";
import { FullContainer, HalfContainer } from "@/components/elements/styles";
import { formSetErrors } from "@/common/helpers/form";
import { styled } from "@/config/stitches/theme.stitches";
import { PurchaseItem } from "@/api-hooks/purchase/purchase.model";
import { useGetPurchaseOrderItems } from "@/api-hooks/purchase-order-item/purchase-order-item.query";
import PurchaseOrderSelectOption from "@/components/elements/select-input-helper/purchase-order-select-input";
import Separator from "@/components/common/separator";

type FormType = {
  purchaseItemId?: string;
  quantity?: number;
  price?: number;
  id?: string;
  unit?: string;
};

interface PropsData extends Partial<PurchaseItem> {}

interface Props {
  data?: PropsData;
  onSubmit: (values: FormType) => Promise<void> | void;
  defaultEditable?: boolean;
  onDelete: VoidFunction;
}

export default function PurchaseItemForm(props: Props) {
  const { data, defaultEditable = true, onDelete } = props;

  const YupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        id: Yup.string().nullable(),
        quantity: Yup.number().required(),
        price: Yup.number().required(),
        unit: Yup.string().nullable().strip(true),
      }),
    []
  );
  const resolver = useYupValidationResolver(YupSchema);

  const methods = useForm<FormType>({
    resolver,
    mode: "all",
    defaultValues: {
      id: data?.id,
      price: data?.price,
      quantity: data?.quantity,
      unit: data?.unit,
      purchaseItemId: `${data?.item?.categoryItem.name} | ${data?.item?.categoryItem.code} | ${data?.item?.size} | ${data?.item?.thick}mm | ${data?.item?.color} (${data?.item?.code}) (Stok: ${data?.item?.stock})`,
    },
  });

  const onSubmit = React.useCallback(
    async (values) => {
      try {
        const input = YupSchema.cast(values) as FormType;
        await props.onSubmit(input);
      } catch (e: any) {
        if (e?.errors) {
          formSetErrors(e?.errors, methods.setError);
        }
        e?.message && toast.error(e?.message);
      }
    },
    [YupSchema, methods, props]
  );

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      defaultEditable={defaultEditable}
    >
      <FullContainer direction="column">
        {defaultEditable && (
          <>
            <Input name="purchaseItemId" type="text" label="Barang" disabled />
            <Row>
              <HalfContainer>
                <Input name="quantity" type="number" label="Jumlah" />
                <Input name="unit" type="text" label="Satuan" disabled />
              </HalfContainer>
              <HalfContainer>
                <Input
                  startEnhancer="Rp"
                  name="price"
                  type="number"
                  label="Harga Satuan"
                />
              </HalfContainer>
            </Row>
          </>
        )}
      </FullContainer>
      <Row style={{ justifyContent: "flex-start" }}>
        <Input
          type="submit"
          text="SIMPAN"
          size="large"
          disabled={Object.keys(methods.formState.errors).length > 0}
        />
        <Separator mr={20} />
        <Button variant="error" size="large" onClick={onDelete}>
          HAPUS
        </Button>
      </Row>
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

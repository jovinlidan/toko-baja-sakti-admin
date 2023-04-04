import Form from "@/components/elements/form";
import { styled } from "@/config/stitches/theme.stitches";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import * as Yup from "yup";
import { Input } from "@/components/elements";
import CategoryItemSelectOption from "@/components/elements/select-input-helper/category-item-select-input";
import { Item, ItemAvailableOptions } from "@/api-hooks/item/item.model";
import { toast } from "react-hot-toast";
import { formSetErrors } from "@/common/helpers/form";

type FormType = {
  code?: string;
  categoryItemId: string;
  size: string;
  thick: number;
  color: string;
  minimumStock: number;
  stock: number;
  wholesalePrice: number;
  retailPrice: number;
  status: string;
  isAvailable: boolean;
};

interface Props {
  data?: Item;
  onSubmit: (values: FormType) => void;
  defaultEditable?: boolean;
}
export default function ItemForm(props: Props) {
  const { defaultEditable = true, data } = props;
  const YupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        code: Yup.string().strip(true),
        categoryItemId: Yup.string().required(),
        size: Yup.string(),
        thick: Yup.number(),
        color: Yup.string(),
        minimumStock: Yup.number(),
        stock: Yup.number().required(),
        wholesalePrice: Yup.number(),
        retailPrice: Yup.number(),
        status: Yup.string().required(),
        isAvailable: Yup.boolean().required(),
      }),
    []
  );
  const resolver = useYupValidationResolver(YupSchema);

  const methods = useForm<any>({
    resolver,
    mode: "all",
    defaultValues: {
      ...data,
      categoryItemId: data?.categoryItem?.id,
      isAvailable: data?.isAvailable?.toString(),
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
      <FullContainer>
        <HalfContainer>
          {data?.code && (
            <Input name="code" type="text" label="Kode" disabled />
          )}
          <CategoryItemSelectOption
            name="categoryItemId"
            label="Kategori Barang"
            placeholder="Pilih Kategori Barang"
          />
          <Input name="size" type="text" label="Ukuran" />
          <Input name="thick" type="number" label="Tebal (mm)" />
          <Input name="color" type="text" label="Warna" />
          <Input
            name="isAvailable"
            type="select"
            options={ItemAvailableOptions}
            label="Ketersediaan"
            placeholder="Pilih Ketersediaan"
          />
        </HalfContainer>
        <HalfContainer>
          <Input name="stock" type="number" label="Stok" />
          <Input name="minimumStock" type="number" label="Stok Minimum" />

          <Input name="retailPrice" type="number" label="Harga Ecer" />

          <Input name="wholesalePrice" type="number" label="Harga Grosir" />

          <Input
            name="status"
            type="enum"
            label="Status"
            placeholder="Pilih Status"
            enumClass="status-type"
          />
        </HalfContainer>
      </FullContainer>
      <Input type="submit" text="SIMPAN" size="large" />
    </Form>
  );
}
const FullContainer = styled("div", {
  background: "#FFFFFF",
  padding: "40px 44px",
  borderRadius: 4,
  mb: 24,

  display: "flex",
  justifyContent: "space-between",
});

const HalfContainer = styled("div", {
  width: "48%",
});

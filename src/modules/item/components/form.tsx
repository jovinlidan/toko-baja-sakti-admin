import Form from "@/components/elements/form";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Input } from "@/components/elements";
import CategoryItemSelectOption from "@/components/elements/select-input-helper/category-item-select-input";
import { Item, ItemAvailableOptions } from "@/api-hooks/item/item.model";
import { toast } from "react-hot-toast";
import { formSetErrors } from "@/common/helpers/form";
import { FullContainer, HalfContainer } from "@/components/elements/styles";

type FormType = {
  code?: string;
  categoryItemId: string;
  size: string;
  thick: number | string;
  color: string;
  minimumStock: number | string;
  stock: number | string;
  wholesalePrice: number | string;
  retailPrice: number | string;
  status: string;
  isAvailable: boolean;
  weight: number | string;
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
        size: Yup.string().nullable(),
        thick: Yup.string().nullable(),
        color: Yup.string().nullable(),
        minimumStock: Yup.string().nullable().required(),
        stock: Yup.string().required(),
        wholesalePrice: Yup.string().nullable().required(),
        retailPrice: Yup.string().nullable().required(),
        status: Yup.string().required(),
        isAvailable: Yup.boolean().required(),
        weight: Yup.string().required(),
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

          <Input name="retailPrice" type="number" label="Harga Ecer (Satuan Kecil)" />

          <Input name="wholesalePrice" type="number" label="Harga Grosir (Satuan Besar)" />

          <Input
            name="weight"
            type="number"
            label="Berat per Satuan Kecil (gram)"
          />

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

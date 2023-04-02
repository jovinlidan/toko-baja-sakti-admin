import { styled } from "@/config/stitches/theme.stitches";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Input, Form } from "@/components/elements";
import { useGetEnums } from "@/api-hooks/common/common.query";
import { useCreateCategoryItem } from "@/api-hooks/category-item/category.item.mutation";
import { queryClient } from "@/common/repositories/query-client";
import { getCategoryItemsKey } from "@/api-hooks/category-item/category-item.query";
import { toast } from "react-hot-toast";

type FormType = {
  name: string;
  brand: string;
  conversionUnit: number;
  bigUnit: string;
  smallUnit: string;
};

export default function CategoryCreateForm() {
  const YupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().required(),
        brand: Yup.string().nullable(),
        conversionUnit: Yup.number(),
        bigUnit: Yup.string().required(),
        smallUnit: Yup.string().required(),
      }),
    []
  );
  const resolver = useYupValidationResolver(YupSchema);

  const { data: bigUnitTypeData, isLoading: bigUnitTypeLoading } = useGetEnums({
    class: "big-unit-type",
  });
  const { data: smallUnitTypeData, isLoading: smallUnitTypeLoading } =
    useGetEnums({ class: "small-unit-type" });

  const { mutateAsync: createCategoryItem } = useCreateCategoryItem();

  const methods = useForm<any>({
    resolver,
    mode: "all",
    defaultValues: {},
  });

  const onSubmit = React.useCallback(
    async (values) => {
      try {
        const input = YupSchema.cast(values) as FormType;
        const res = await createCategoryItem({ body: input });
        res.message && toast.success(res.message);
        methods.reset();
        await queryClient.invalidateQueries(getCategoryItemsKey());
      } catch (e: any) {
        toast.error(e?.message);
      }
    },
    [YupSchema, createCategoryItem, methods]
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <FullContainer>
        <HalfContainer>
          <Input name="name" type="text" label="Nama" />
          <Input name="brand" type="text" label="Merk" />
          <Input name="conversionUnit" type="number" label="Konversi Satuan" />
        </HalfContainer>
        <HalfContainer>
          <Input
            name="smallUnit"
            type="select"
            label="Satuan Kecil (Ecer)"
            options={smallUnitTypeData || []}
            isLoading={smallUnitTypeLoading}
            // onMenuOpen={}
          />
          <Input
            name="bigUnit"
            type="select"
            label="Satuan Besar (Grosir)"
            options={bigUnitTypeData || []}
            isLoading={bigUnitTypeLoading}
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

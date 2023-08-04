import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Input, Form, Button } from "@/components/elements";
import { toast } from "react-hot-toast";
import { FullContainer, HalfContainer } from "@/components/elements/styles";
import { formSetErrors } from "@/common/helpers/form";
import { FormValueState } from "@/components/elements/input";
import { Brand } from "@/api-hooks/brand/brand.model";
import Separator from "@/components/common/separator";
import { useDeleteBrand } from "@/api-hooks/brand/brand.mutation";
import { queryClient } from "@/common/repositories/query-client";
import { getBrandsKey } from "@/api-hooks/brand/brand.query";

type FormType = {
  name?: string;
  id?: string;
};

interface Props {
  data?: Partial<Brand>;
  onSubmit: (values: FormType) => Promise<void> | void;
  defaultEditable?: boolean;
  isLoading?: boolean;
  onSelectedBrand: (brand?: Partial<Brand>) => void;
}

export default function FormBrand(props: Props) {
  const { data, defaultEditable = true, isLoading, onSelectedBrand } = props;
  const { mutateAsync: deleteBrand, isLoading: deleteBrandLoading } =
    useDeleteBrand();
  const YupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().required(),
      }),
    []
  );
  const resolver = useYupValidationResolver(YupSchema);

  const methods = useForm<FormType>({
    resolver,
    mode: "all",
    values: {
      name: data?.name,
      id: data?.id,
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
  const handleDeleteBrand = React.useCallback(async () => {
    try {
      if (data?.id) {
        const res = await deleteBrand({ params: { id: data?.id } });
        toast.success(res?.message);
        onSelectedBrand({});
        await queryClient.invalidateQueries(getBrandsKey());
      }
    } catch (e: any) {
      if (e?.errors) {
        formSetErrors(e?.errors, methods.setError);
      }
      e?.message && toast.error(e?.message);
    }
  }, [data?.id, deleteBrand, methods.setError, onSelectedBrand]);

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      defaultEditable={defaultEditable}
    >
      <FullContainer>
        <HalfContainer>
          <Input name="name" type="text" label="Merk" />
          <div style={{ display: "flex" }}>
            <Input
              type="submit"
              text="SIMPAN"
              size="medium"
              loading={isLoading}
            />
            <Separator mr={20} />
            <Button
              type="button"
              size="medium"
              variant="secondary"
              disabled={!data?.id}
              loading={deleteBrandLoading}
              onClick={handleDeleteBrand}
            >
              HAPUS
            </Button>
          </div>
        </HalfContainer>
      </FullContainer>
    </Form>
  );
}

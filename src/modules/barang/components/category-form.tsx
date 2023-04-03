import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import * as Yup from "yup";
import { Input, Form } from "@/components/elements";
import { toast } from "react-hot-toast";
import { FullContainer, HalfContainer } from "@/components/elements/styles";
import { CategoryItem } from "@/api-hooks/category-item/category-item.model";

type FormType = {
  code?: string;
  name: string;
  brand: string;
  conversionUnit: number;
  bigUnit: string;
  smallUnit: string;
};

interface Props {
  data?: CategoryItem;
  onSubmit: (methods: UseFormReturn<FormType, any>, values: FormType) => void;
  defaultEditable?: boolean;
}

export default function CategoryForm(props: Props) {
  const { data, defaultEditable = true } = props;
  const YupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        code: Yup.string().nullable().strip(true),
        name: Yup.string().required(),
        brand: Yup.string().nullable(),
        conversionUnit: Yup.number(),
        bigUnit: Yup.string().required(),
        smallUnit: Yup.string().required(),
      }),
    []
  );
  const resolver = useYupValidationResolver(YupSchema);

  const methods = useForm<FormType>({
    resolver,
    mode: "all",
    defaultValues: data,
  });

  const onSubmit = React.useCallback(
    async (values) => {
      try {
        const input = YupSchema.cast(values) as FormType;
        await props.onSubmit(methods, input);
      } catch (e: any) {
        toast.error(e?.message);
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
          <Input name="name" type="text" label="Nama" />
          <Input name="brand" type="text" label="Merk" />
          {!data?.code && (
            <Input
              name="conversionUnit"
              type="number"
              label="Konversi Satuan"
            />
          )}
        </HalfContainer>
        <HalfContainer>
          {data?.code && (
            <Input
              name="conversionUnit"
              type="number"
              label="Konversi Satuan"
            />
          )}
          <Input
            name="smallUnit"
            type="enum"
            label="Satuan Kecil (Ecer)"
            enumClass="small-unit-type"
          />
          <Input
            name="bigUnit"
            type="enum"
            label="Satuan Besar (Grosir)"
            enumClass="big-unit-type"
          />
        </HalfContainer>
      </FullContainer>
      <Input type="submit" text="SIMPAN" size="large" />
    </Form>
  );
}

import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import * as Yup from "yup";
import { Input, Form } from "@/components/elements";
import { toast } from "react-hot-toast";
import { FullContainer, HalfContainer } from "@/components/elements/styles";
import { CategoryItem } from "@/api-hooks/category-item/category-item.model";
import { formSetErrors } from "@/common/helpers/form";
import { FormValueState } from "@/components/elements/input";

type FormType = {
  code?: string;
  name: string;
  brand: string;
  conversionUnit: string | number;
  bigUnit: string;
  smallUnit: string;
  image: string;
  imagePreview?: string;
};

interface Props {
  data?: CategoryItem;
  onSubmit: (values: FormType) => Promise<void> | void;
  defaultEditable?: boolean;
}

export default function FormCategoryItem(props: Props) {
  const { data, defaultEditable = true } = props;
  const YupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        code: Yup.string().nullable().strip(true),
        name: Yup.string().required(),
        brand: Yup.string().nullable(),
        conversionUnit: Yup.string()
          .nullable()
          .required()
          .when(["bigUnit", "smallUnit"], {
            is: (bigUnit, smallUnit) => bigUnit === smallUnit,
            then: (schema) => schema.oneOf(["1"], "Konversi Satuan wajib 1"),
            otherwise: (schema) => schema,
          }),
        bigUnit: Yup.string().required(),
        smallUnit: Yup.string().required(),
        image: Yup.string().required(),
      }),
    []
  );
  const resolver = useYupValidationResolver(YupSchema);

  const methods = useForm<FormType>({
    resolver,
    mode: "all",
    defaultValues: {
      ...data,
      image: data?.file?.name,
      imagePreview: data?.file?.fileUrl,
    },
  });

  const onSubmit = React.useCallback(
    async (values) => {
      try {
        const input = YupSchema.cast(values) as FormType;
        await props.onSubmit(input);
        methods.reset();
      } catch (e: any) {
        if (e?.errors) {
          formSetErrors(e?.errors, methods.setError);
        }
        e?.message && toast.error(e?.message);
      }
    },
    [YupSchema, methods, props]
  );

  const onAfterChangeSmallUnit = React.useCallback(
    (smallUnit, bigUnit) => {
      if (smallUnit?.value === bigUnit) methods.setValue("conversionUnit", "1");
    },
    [methods]
  );

  const onAfterChangeBigUnit = React.useCallback(
    (bigUnit, smallUnit) => {
      if (bigUnit?.value === smallUnit) methods.setValue("conversionUnit", "1");
    },
    [methods]
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
          <Input
            name="image"
            type="file"
            label="Gambar"
            previewName="imagePreview"
            resizeImage
            resizeWidth={720}
            resizeHeight={720}
          />
        </HalfContainer>
        <HalfContainer>
          {data?.code && (
            <Input
              name="conversionUnit"
              type="number"
              label="Konversi Satuan"
            />
          )}
          <FormValueState keys={["bigUnit"]}>
            {({ bigUnit }) => (
              <Input
                name="smallUnit"
                type="enum"
                label="Satuan Kecil (Ecer)"
                enumClass="small-unit-type"
                onAfterChange={(value) =>
                  onAfterChangeSmallUnit(value, bigUnit)
                }
              />
            )}
          </FormValueState>
          <FormValueState keys={["smallUnit"]}>
            {({ smallUnit }) => (
              <Input
                name="bigUnit"
                type="enum"
                label="Satuan Besar (Grosir)"
                enumClass="big-unit-type"
                onAfterChange={(value) =>
                  onAfterChangeBigUnit(value, smallUnit)
                }
              />
            )}
          </FormValueState>
        </HalfContainer>
      </FullContainer>
      <Input type="submit" text="SIMPAN" size="large" />
    </Form>
  );
}

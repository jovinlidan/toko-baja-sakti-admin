import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import * as Yup from "yup";
import { Input, Form } from "@/components/elements";
import { toast } from "react-hot-toast";
import { FullContainer, HalfContainer } from "@/components/elements/styles";
import { formSetErrors } from "@/common/helpers/form";
import CitySelectOption from "@/components/elements/select-input-helper/city-select-input";
import { Supplier } from "@/api-hooks/supplier/supplier.model";

type FormType = {
  name?: string;
  email?: string;
  phone?: string;
  status?: string;
  contactPerson?: string;
  address?: {
    id?: string;
    cityId?: string;
    addressDetail?: string;
  };
};

interface Props {
  data?: Supplier;
  onSubmit: (values: FormType) => Promise<void> | void;
  defaultEditable?: boolean;
}

export default function FormSupplier(props: Props) {
  const { data, defaultEditable = true } = props;
  const YupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        code: Yup.string().nullable().strip(true),
        name: Yup.string().required(),
        email: Yup.string().email().nullable(),
        contactPerson: Yup.string().nullable(),
        phone: Yup.string().nullable(),
        status: Yup.string().nullable(),
        address: Yup.object().shape({
          id: Yup.string().nullable(),
          cityId: Yup.string().required(),
          addressDetail: Yup.string().nullable(),
        }),
      }),
    []
  );
  const resolver = useYupValidationResolver(YupSchema);

  const methods = useForm<FormType>({
    resolver,
    mode: "all",
    defaultValues: {
      ...data,
      address: {
        id: data?.address?.id,
        cityId: data?.address?.city?.id,
        addressDetail: data?.address?.addressDetail,
      },
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
          <Input name="contactPerson" type="text" label="Contact Person" />
          <Input name="address.addressDetail" type="textarea" label="Alamat" />
        </HalfContainer>
        <HalfContainer>
          <Input name="phone" type="text" label="No Handphone" />
          <Input name="email" type="text" label="Email" />
          <Input
            name="status"
            type="enum"
            label="Status"
            placeholder="Pilih Status"
            enumClass="status-type"
          />
          <CitySelectOption
            name="address.cityId"
            label="Kota"
            placeholder="Pilih Kota"
          />
        </HalfContainer>
      </FullContainer>
      <Input type="submit" text="SIMPAN" size="large" />
    </Form>
  );
}

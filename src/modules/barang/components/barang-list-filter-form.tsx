import Form from "@/components/elements/form";
import { styled, theme } from "@/config/stitches/theme.stitches";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Button, Input } from "@/components/elements";
import Separator from "@/components/common/separator";
import { BxSearchSVG } from "@/common/assets";

export default function BarangListFilterForm() {
  const YupSchema = React.useMemo(() => Yup.object().shape({}), []);
  const resolver = useYupValidationResolver(YupSchema);

  const methods = useForm<any>({
    resolver,
    mode: "all",
    defaultValues: {},
  });

  const onSubmit = React.useCallback(async (values) => {}, []);
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Container>
        <Input
          name="barang.nama"
          type="text"
          size="large"
          placeholder="Cari Barang"
          startEnhancer={<BxSearchSVG color={theme.colors.textPrimary.value} />}
        />
        <Input type="submit" text="CARI" size="large" />
      </Container>
    </Form>
  );
}

const Container = styled("div", {
  mb: 26,
});

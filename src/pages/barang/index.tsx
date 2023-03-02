import { BxLeftArrowAltSVG } from "@/common/assets";
import BxSearchSVG from "@/common/assets/bx-search-svg";
import TableComponent from "@/components/common/table";
import { Button, Input } from "@/components/elements";
import Form from "@/components/elements/form";
import { theme } from "@/config/stitches/theme.stitches";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

export default function BarangPage() {
  const YupSchema = React.useMemo(() => Yup.object().shape({}), []);
  const resolver = useYupValidationResolver(YupSchema);

  const methods = useForm<any>({
    resolver,
    mode: "all",
    defaultValues: {},
  });

  const onSubmit = React.useCallback(async (values) => {}, []);
  return (
    <div>
      <Form methods={methods} onSubmit={onSubmit}>
        <Input
          type="text"
          name="search"
          size="large"
          disabled
          placeholder="Cari Barang"
          startEnhancer={<BxSearchSVG color={theme.colors.textPrimary.value} />}
        />

        <Input
          type="text"
          label="oke"
          name="searchs"
          size="small"
          disabled
          placeholder="Cari Barang"
        />
        <Input
          name="tester"
          type="select"
          label="Pilih kota"
          options={[
            { label: "1", value: "oke" },
            { label: "2", value: "oke" },
            { label: "3", value: "oke" },
            { label: "4", value: "oke" },
          ]}
        />

        <Input name="files" type="file" label="File" previewName="prev" />
        <Button
          size="large"
          variant="primary"
          startEnhancer={(size) => (
            <BxLeftArrowAltSVG
              color={theme.colors.backgroundPaper.value}
              width={size}
              height={24}
            />
          )}
        >
          Halo
        </Button>
        <Button size="medium" variant="error">
          Halo
        </Button>
        <Button size="small" variant="info">
          Halo
        </Button>
        <Button size="medium" variant="secondary">
          Halo
        </Button>
        <Button size="medium" variant="success">
          Halo
        </Button>
        <Button size="medium" variant="warning">
          Halo
        </Button>
      </Form>
      <TableComponent />
      <h1>ini Page Barnag</h1>
    </div>
  );
}

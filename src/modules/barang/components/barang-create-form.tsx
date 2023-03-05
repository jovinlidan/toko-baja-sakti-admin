import Form from "@/components/elements/form";
import { styled } from "@/config/stitches/theme.stitches";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Input } from "@/components/elements";

export default function BarangCreateForm() {
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
      <FullContainer>
        <HalfContainer>
          <Input
            name="nama"
            type="select"
            options={[]}
            label="Nama"
            placeholder="Pilih Kategori Barang"
          />
          <Input name="merk" type="text" label="Merk" />
          <Input name="konversiSatuan" type="text" label="Konversi Satuan" />
        </HalfContainer>
        <HalfContainer>
          <Input
            name="ecer"
            type="select"
            label="Satuan Kecil (Ecer)"
            options={[]}
          />
          <Input
            name="grosir"
            type="select"
            label="Satuan Besar (Grosir)"
            options={[]}
          />
          <Input
            name="gambar"
            type="file"
            label="Gambar"
            previewName="prevGambar"
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

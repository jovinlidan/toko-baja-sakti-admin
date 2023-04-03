import { styled } from "@/config/stitches/theme.stitches";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Input, Form, Button } from "@/components/elements";

import { CategoryItem } from "@/api-hooks/category-item/category-item.model";
import Separator from "@/components/common/separator";
import { FullContainer, HalfContainer } from "@/components/elements/styles";
import useDialog from "@/hooks/use-dialog";
import { useDeleteCategoryItem } from "@/api-hooks/category-item/category.item.mutation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import routeConstant from "@/constants/route.constant";

type FormType = {
  code: string;
  name: string;
  brand: string;
  conversionUnit: number;
  bigUnit: string;
  smallUnit: string;
};
interface Props {
  data: CategoryItem;
}

export default function CategoryViewForm(props: Props) {
  const { data } = props;
  const dialog = useDialog();
  const { mutateAsync } = useDeleteCategoryItem();
  const router = useRouter();

  const methods = useForm<FormType>({
    defaultValues: {
      ...data,
    },
  });

  const onSubmit = React.useCallback(async (values) => {
    return;
  }, []);

  const handleDelete = React.useCallback(() => {
    dialog.showConfirmation({
      title: "Hapus Kategori Barang",
      message: "Apakah anda yakin? Aksi tidak dapat dibatalkan",
      onPositiveAction: async (close) => {
        try {
          const { message } = await mutateAsync({ categoryId: data?.id });
          message && toast.success(message);
          router.replace(routeConstant.BarangCategoryCreate);
          close();
        } catch (e: any) {
          e?.messsage && toast.error(e?.message);
        }
      },
    });
  }, [data?.id, dialog, mutateAsync, router]);

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={false}>
      <FullContainer>
        <HalfContainer>
          <Input name="code" type="text" label="Kode" />
          <Input name="name" type="text" label="Nama" />
          <Input name="brand" type="text" label="Merk" />
        </HalfContainer>
        <HalfContainer>
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
          <Input name="conversionUnit" type="number" label="Konversi Satuan" />
        </HalfContainer>
      </FullContainer>
      <Row>
        <Button>UBAH</Button>
        <Separator mr={24} />
        <Button variant="error" onClick={handleDelete}>
          HAPUS
        </Button>
      </Row>
    </Form>
  );
}
const Row = styled("div", {
  display: "flex",
});

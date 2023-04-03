import { getCategoryItemsKey } from "@/api-hooks/category-item/category-item.query";
import { useCreateCategoryItem } from "@/api-hooks/category-item/category.item.mutation";
import { BxChevronLeftSVG } from "@/common/assets";
import { queryClient } from "@/common/repositories/query-client";
import Separator from "@/components/common/separator";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import CategoryCreateTable from "./components/category-create-table";
import CategoryForm from "./components/category-form";

export default function CategoryCreate() {
  const { mutateAsync: createCategoryItem } = useCreateCategoryItem();

  const onSubmit = useCallback(
    async (methods, values) => {
      try {
        const res = await createCategoryItem({ body: values });
        res.message && toast.success(res.message);
        methods.reset();
        await queryClient.invalidateQueries(getCategoryItemsKey());
      } catch (e: any) {
        toast.error(e?.message);
      }
    },
    [createCategoryItem]
  );

  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.BarangList}
        startEnhancer={(color) => <BxChevronLeftSVG color={color} />}
      />
      <Separator mb={24} />
      <CategoryForm onSubmit={onSubmit} />
      <Separator mb={24} />
      <CategoryCreateTable />
    </Container>
  );
}
const Container = styled("div", {});

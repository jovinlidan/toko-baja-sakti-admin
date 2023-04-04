import { getCategoryItemsKey } from "@/api-hooks/category-item/category-item.query";
import { useCreateCategoryItem } from "@/api-hooks/category-item/category-item.mutation";
import { BxChevronLeftSVG } from "@/common/assets";
import { queryClient } from "@/common/repositories/query-client";
import Separator from "@/components/common/separator";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import TableCategoryItem from "@/modules/category-item/components/table";
import FormCategoryItem from "@/modules/category-item/components/form";

export default function CreateCategoryItem() {
  const { mutateAsync: createCategoryItem } = useCreateCategoryItem();

  const onSubmit = useCallback(
    async (values) => {
      const res = await createCategoryItem({ body: values });
      res.message && toast.success(res.message);
      await queryClient.invalidateQueries(getCategoryItemsKey());
    },
    [createCategoryItem]
  );

  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.ItemList}
        startEnhancer={(color) => <BxChevronLeftSVG color={color} />}
      />
      <Separator mb={24} />
      <FormCategoryItem onSubmit={onSubmit} />
      <Separator mb={24} />
      <TableCategoryItem />
    </Container>
  );
}
const Container = styled("div", {});

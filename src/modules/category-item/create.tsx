import { getCategoryItemsKey } from "@/api-hooks/category-item/category-item.query";
import { useCreateCategoryItem } from "@/api-hooks/category-item/category-item.mutation";
import { BxChevronLeftSVG } from "@/common/assets";
import { queryClient } from "@/common/repositories/query-client";
import Separator from "@/components/common/separator";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import TableCategoryItem from "@/modules/category-item/components/table";
import FormCategoryItem from "@/modules/category-item/components/form";
import { useRouter } from "next/router";
import FormBrand from "./components/brand-form";
import { Brand } from "@/api-hooks/brand/brand.model";
import {
  useCreateBrand,
  useDeleteBrand,
  useUpdateBrand,
} from "@/api-hooks/brand/brand.mutation";
import { getBrandsKey } from "@/api-hooks/brand/brand.query";

export default function CreateCategoryItem() {
  const { mutateAsync: createCategoryItem } = useCreateCategoryItem();
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState<Partial<Brand>>();

  const { mutateAsync: createBrand, isLoading: createBrandLoading } =
    useCreateBrand();
  const { mutateAsync: updateBrand, isLoading: updateBrandLoading } =
    useUpdateBrand();

  const onSubmit = useCallback(
    async (values) => {
      const res = await createCategoryItem({ body: values });
      res.message && toast.success(res.message);
      router.push({
        pathname: routeConstant.CategoryItemView,
        query: { id: res.data.id },
      });
      await queryClient.invalidateQueries(getCategoryItemsKey());
    },
    [createCategoryItem, router]
  );

  const onSelectBrand = useCallback((_brand?: Partial<Brand>) => {
    setSelectedBrand(_brand);
  }, []);

  const handleBrandSubmit = useCallback(
    async (values) => {
      try {
        if (selectedBrand?.id) {
          const res = await updateBrand({
            params: { id: selectedBrand?.id },
            body: { name: values.name },
          });
          onSelectBrand({ id: selectedBrand?.id, name: values.name });
          res?.message && toast.success(res?.message);
        } else {
          const res = await createBrand({
            body: { name: values.name },
          });
          onSelectBrand({ name: values.name });
          res?.message && toast.success(res?.message);
        }
        await queryClient.invalidateQueries(getBrandsKey());
      } catch (e: any) {
        e?.message && toast.error(e?.message);
      }
    },
    [createBrand, onSelectBrand, selectedBrand?.id, updateBrand]
  );

  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.ItemList}
        startEnhancer={(color) => <BxChevronLeftSVG color={color} />}
      />
      <Separator mb={24} />
      <FormCategoryItem
        onSubmit={onSubmit}
        onSelectedBrand={onSelectBrand}
        selectedBrand={selectedBrand}
      />
      <Separator mb={24} />
      <FormBrand
        data={selectedBrand}
        onSelectedBrand={onSelectBrand}
        onSubmit={handleBrandSubmit}
        isLoading={createBrandLoading || updateBrandLoading}
      />
      <Separator mb={24} />
      <TableCategoryItem />
    </Container>
  );
}
const Container = styled("div", {});

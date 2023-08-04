import {
  getCategoryItemKey,
  getCategoryItemsKey,
  useGetCategoryItem,
} from "@/api-hooks/category-item/category-item.query";
import { useUpdateCategoryItem } from "@/api-hooks/category-item/category-item.mutation";
import { BxChevronLeftSVG } from "@/common/assets";
import { queryClient } from "@/common/repositories/query-client";
import FetchWrapperComponent from "@/components/common/fetch-wrapper-component";
import Separator from "@/components/common/separator";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import FormCategoryItem from "@/modules/category-item/components/form";
import FormBrand from "./components/brand-form";
import { Brand } from "@/api-hooks/brand/brand.model";
import {
  useCreateBrand,
  useUpdateBrand,
} from "@/api-hooks/brand/brand.mutation";
import { getBrandsKey } from "@/api-hooks/brand/brand.query";

export default function EditCategoryItem() {
  const router = useRouter();
  const { data, isLoading, isFetching, error, refetch } = useGetCategoryItem(
    {
      id: router?.query?.id as string,
    },
    { enabled: !!router?.query?.id }
  );
  const { mutateAsync } = useUpdateCategoryItem();

  const [selectedBrand, setSelectedBrand] = useState<Partial<Brand>>();

  const { mutateAsync: createBrand, isLoading: createBrandLoading } =
    useCreateBrand();
  const { mutateAsync: updateBrand, isLoading: updateBrandLoading } =
    useUpdateBrand();

  const onSubmit = useCallback(
    async (values) => {
      const res = await mutateAsync({
        id: router?.query?.id as string,
        body: values,
      });
      res.message && toast.success(res.message);
      await router.replace({
        pathname: routeConstant.CategoryItemView,
        query: { id: router?.query?.id },
      });
      await queryClient.invalidateQueries(getCategoryItemsKey());
    },
    [mutateAsync, router]
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
        href={{
          pathname: routeConstant.CategoryItemView,
          query: { id: router?.query?.id as string },
        }}
        startEnhancer={(color) => <BxChevronLeftSVG color={color} />}
      />
      <Separator mb={24} />
      <FetchWrapperComponent
        isLoading={isLoading || isFetching}
        error={error}
        onRetry={refetch}
        component={
          data?.data && (
            <>
              <FormCategoryItem
                data={data?.data}
                onSubmit={onSubmit}
                onSelectedBrand={onSelectBrand}
              />
              <Separator mb={24} />
              <FormBrand
                data={selectedBrand}
                onSelectedBrand={onSelectBrand}
                onSubmit={handleBrandSubmit}
                isLoading={createBrandLoading || updateBrandLoading}
              />
            </>
          )
        }
      />
    </Container>
  );
}
const Container = styled("div", {});

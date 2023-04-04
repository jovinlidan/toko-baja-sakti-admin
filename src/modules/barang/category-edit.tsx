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
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import CategoryForm from "./components/category-form";

export default function CategoryEdit() {
  const router = useRouter();
  const { data, isLoading, isFetching, error, refetch } = useGetCategoryItem({
    categoryId: router?.query?.id as string,
  });
  const { mutateAsync } = useUpdateCategoryItem();

  const onSubmit = useCallback(
    async (methods, values) => {
      try {
        const res = await mutateAsync({
          categoryId: router?.query?.id as string,
          body: values,
        });
        res.message && toast.success(res.message);
        methods.reset();
        await router.replace({
          pathname: routeConstant.BarangCategoryView,
          query: { id: router?.query?.id },
        });
        await queryClient.invalidateQueries(getCategoryItemsKey());
      } catch (e: any) {
        e?.message && toast.error(e?.message);
      }
    },
    [mutateAsync, router]
  );
  return (
    <Container>
      <LinkText
        label="Kembali"
        href={{
          pathname: routeConstant.BarangCategoryView,
          query: router?.query?.id as string,
        }}
        startEnhancer={(color) => <BxChevronLeftSVG color={color} />}
      />
      <Separator mb={24} />
      <FetchWrapperComponent
        isLoading={isLoading || isFetching}
        error={error}
        onRetry={refetch}
        component={
          data?.data && <CategoryForm data={data?.data} onSubmit={onSubmit} />
        }
      />
    </Container>
  );
}
const Container = styled("div", {});

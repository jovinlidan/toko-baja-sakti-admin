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
import FormCategoryItem from "@/modules/category-item/components/form";

export default function EditCategoryItem() {
  const router = useRouter();
  const { data, isLoading, isFetching, error, refetch } = useGetCategoryItem(
    {
      id: router?.query?.id as string,
    },
    { enabled: !!router?.query?.id }
  );
  const { mutateAsync } = useUpdateCategoryItem();

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
            <FormCategoryItem data={data?.data} onSubmit={onSubmit} />
          )
        }
      />
    </Container>
  );
}
const Container = styled("div", {});

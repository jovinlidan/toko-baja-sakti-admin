import { useGetCategoryItem } from "@/api-hooks/category-item/category-item.query";
import { BxChevronLeftSVG } from "@/common/assets";
import FetchWrapperComponent from "@/components/common/fetch-wrapper-component";
import Separator from "@/components/common/separator";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import { useRouter } from "next/router";
import CategoryViewForm from "./components/category-view-form";

export default function CategoryView() {
  const router = useRouter();
  const { data, isLoading, isFetching, error, refetch } = useGetCategoryItem({
    categoryId: router?.query?.id as string,
  });
  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.BarangCategoryCreate}
        startEnhancer={(color) => <BxChevronLeftSVG color={color} />}
      />
      <Separator mb={24} />
      <FetchWrapperComponent
        isLoading={isLoading || isFetching}
        error={error}
        onRetry={refetch}
        component={data?.data && <CategoryViewForm data={data?.data} />}
      />
    </Container>
  );
}
const Container = styled("div", {});

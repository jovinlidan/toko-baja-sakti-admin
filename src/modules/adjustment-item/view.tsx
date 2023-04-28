import { BxChevronLeftSVG } from "@/common/assets";
import FetchWrapperComponent from "@/components/common/fetch-wrapper-component";
import Separator from "@/components/common/separator";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import useDialog from "@/hooks/use-dialog";
import { useRouter } from "next/router";
import AdjustmentItemForm from "./components/form";
import { useGetAdjustmentItem } from "@/api-hooks/adjustment-item/adjustment-item.query";

export default function ViewAdjustmentItem() {
  const router = useRouter();
  const dialog = useDialog();

  const { data, isLoading, isFetching, error, refetch } = useGetAdjustmentItem(
    {
      id: router?.query?.id as string,
    },
    { enabled: !!router?.query?.id }
  );

  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.AdjustmentItemList}
        startEnhancer={(color) => <BxChevronLeftSVG color={color} />}
      />
      <Separator mb={24} />
      <FetchWrapperComponent
        isLoading={isLoading || isFetching}
        error={error}
        onRetry={refetch}
        component={
          <>
            {data?.data && (
              <AdjustmentItemForm
                data={data?.data}
                onSubmit={() => {}}
                defaultEditable={false}
              />
            )}
          </>
        }
      />
    </Container>
  );
}
const Container = styled("div", {});
const Row = styled("div", {
  display: "flex",
});

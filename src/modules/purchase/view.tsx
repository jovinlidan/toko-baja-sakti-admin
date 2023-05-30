import { BxChevronLeftSVG } from "@/common/assets";
import FetchWrapperComponent from "@/components/common/fetch-wrapper-component";
import Separator from "@/components/common/separator";
import { Button } from "@/components/elements";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import useDialog from "@/hooks/use-dialog";
import { useRouter } from "next/router";
import { useGetPurchase } from "@/api-hooks/purchase/purchase.query";
import PurchaseForm from "./components/form";

export default function ViewPurchase() {
  const router = useRouter();
  const dialog = useDialog();

  const { data, isLoading, isFetching, error, refetch } = useGetPurchase(
    {
      id: router?.query?.id as string,
    },
    { enabled: !!router?.query?.id }
  );

  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.PurchaseList}
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
              <PurchaseForm
                data={data?.data}
                onSubmit={() => {}}
                defaultEditable={false}
              />
            )}
            <Row>
              <Button
                href={{
                  pathname: routeConstant.PurchaseEdit,
                  query: { id: router?.query?.id },
                }}
              >
                UBAH
              </Button>
            </Row>
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

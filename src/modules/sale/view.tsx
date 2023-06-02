import { BxChevronLeftSVG } from "@/common/assets";
import FetchWrapperComponent from "@/components/common/fetch-wrapper-component";
import Separator from "@/components/common/separator";
import { Button } from "@/components/elements";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import { useRouter } from "next/router";
import { useGetSale } from "@/api-hooks/sales/sales.query";
import SaleForm from "./components/form";
import { useCallback } from "react";

export default function ViewSale() {
  const router = useRouter();

  const { data, isLoading, isFetching, error, refetch } = useGetSale(
    {
      id: router?.query?.id as string,
    },
    { enabled: !!router?.query?.id }
  );

  const handlePrintReport = useCallback(async () => {
    if (!router.query.id) return;
    const reportView = routeConstant.ReportView.replace(
      "[id]",
      encodeURIComponent(`sales/${router.query.id}/print`)
    );
    window.open(reportView, "_blank");
  }, [router.query.id]);
  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.SaleList}
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
              <SaleForm
                data={data?.data}
                onSubmit={() => {}}
                defaultEditable={false}
              />
            )}
            <Row>
              <Button
                href={{
                  pathname: routeConstant.SaleEdit,
                  query: { id: router?.query?.id },
                }}
              >
                UBAH
              </Button>
              <Separator mr={24} />
              <Button onClick={handlePrintReport} variant="info">
                CETAK FAKTUR
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

import { BxChevronLeftSVG } from "@/common/assets";
import FetchWrapperComponent from "@/components/common/fetch-wrapper-component";
import Separator from "@/components/common/separator";
import { Button } from "@/components/elements";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import useDialog from "@/hooks/use-dialog";
import { useRouter } from "next/router";
import { useCallback } from "react";
import SaleReturnForm from "./components/form";
import { useDeleteSaleReturn } from "@/api-hooks/sales-return/sales-return.mutation";
import { useGetSaleReturn } from "@/api-hooks/sales-return/sales-return.query";

export default function ViewSaleReturn() {
  const router = useRouter();

  const { data, isLoading, isFetching, error, refetch } = useGetSaleReturn(
    {
      id: router?.query?.id as string,
    },
    { enabled: !!router?.query?.id }
  );

  const handlePrintReport = useCallback(async () => {
    if (!router.query.id) return;
    const reportView = routeConstant.ReportView.replace(
      "[id]",
      encodeURIComponent(`sales-returns/${router.query.id}/print`)
    );
    window.open(reportView, "_blank");
  }, [router.query.id]);

  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.SaleReturnList}
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
              <SaleReturnForm
                data={data?.data}
                onSubmit={() => {}}
                defaultEditable={false}
              />
            )}
            <Row>
              <Button
                href={{
                  pathname: routeConstant.SaleReturnEdit,
                  query: { id: router?.query?.id },
                }}
              >
                UBAH
              </Button>
              <Separator mr={24} />
              <Button onClick={handlePrintReport} variant="info">
                CETAK NOTA
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

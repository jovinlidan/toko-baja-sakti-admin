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
import { toast } from "react-hot-toast";
import { useDeletePurchaseOrder } from "@/api-hooks/purchase-order/purchase-order.mutation";
import { useGetPurchaseOrder } from "@/api-hooks/purchase-order/purchase-order.query";
import FormPurchaseOrder from "./components/form";

export default function ViewPurchaseOrder() {
  const router = useRouter();
  const dialog = useDialog();
  const { mutateAsync } = useDeletePurchaseOrder();

  const { data, isLoading, isFetching, error, refetch } = useGetPurchaseOrder(
    {
      id: router?.query?.id as string,
    },
    { enabled: !!router?.query?.id }
  );

  const handleDelete = useCallback(() => {
    dialog.showConfirmation({
      title: "Hapus Pesanan Pembelian",
      message: "Apakah anda yakin? Aksi tidak dapat dibatalkan",
      onPositiveAction: async (close) => {
        try {
          const { message } = await mutateAsync({
            id: router?.query?.id as string,
          });
          message && toast.success(message);
          router.replace(routeConstant.PurchaseOrderList);
          close();
        } catch (e: any) {
          e?.message && toast.error(e?.message);
        }
      },
    });
  }, [dialog, mutateAsync, router]);

  const handlePrintReport = useCallback(async () => {
    if (!router.query.id) return;
    const reportView = routeConstant.ReportView.replace(
      "[id]",
      encodeURIComponent(`purchase-orders/${router.query.id}/print`)
    );
    window.open(reportView, "_blank");
  }, [router.query.id]);

  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.PurchaseOrderList}
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
              <FormPurchaseOrder
                data={data?.data}
                onSubmit={() => {}}
                defaultEditable={false}
              />
            )}
            <Row>
              <Button
                href={{
                  pathname: routeConstant.PurchaseOrderEdit,
                  query: { id: router?.query?.id },
                }}
              >
                UBAH
              </Button>
              <Separator mr={24} />
              <Button variant="info" onClick={handlePrintReport}>
                CETAK
              </Button>
              <Separator mr={24} />
              <Button variant="error" onClick={handleDelete}>
                HAPUS
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

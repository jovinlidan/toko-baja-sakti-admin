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
import { useDeletePurchase } from "@/api-hooks/purchase/purchase.mutation";
import { useGetPurchase } from "@/api-hooks/purchase/purchase.query";
import PurchaseForm from "./components/form";

export default function ViewPurchase() {
  const router = useRouter();
  const dialog = useDialog();
  const { mutateAsync } = useDeletePurchase();

  const { data, isLoading, isFetching, error, refetch } = useGetPurchase(
    {
      id: router?.query?.id as string,
    },
    { enabled: !!router?.query?.id }
  );

  const handleDelete = useCallback(() => {
    dialog.showConfirmation({
      title: "Hapus Pembelian",
      message: "Apakah anda yakin? Aksi tidak dapat dibatalkan",
      onPositiveAction: async (close) => {
        try {
          const { message } = await mutateAsync({
            id: router?.query?.id as string,
          });
          message && toast.success(message);
          router.replace(routeConstant.PurchaseList);
          close();
        } catch (e: any) {
          e?.messsage && toast.error(e?.message);
        }
      },
    });
  }, [dialog, mutateAsync, router]);

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

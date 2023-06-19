import { useUpdatePurchase } from "@/api-hooks/purchase/purchase.mutation";
import {
  getPurchaseKey,
  getPurchasesKey,
  useGetPurchase,
} from "@/api-hooks/purchase/purchase.query";
import { BxChevronLeftSVG } from "@/common/assets";
import { queryClient } from "@/common/repositories/query-client";
import FetchWrapperComponent from "@/components/common/fetch-wrapper-component";
import Separator from "@/components/common/separator";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import useDialog from "@/hooks/use-dialog";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import PurchaseForm from "./components/form";

export default function EditPurchaseItem() {
  const router = useRouter();
  const dialog = useDialog();
  const { data, isLoading, isFetching, error, refetch } = useGetPurchase(
    {
      id: router?.query?.id as string,
    },
    { enabled: !!router?.query?.id }
  );
  const { mutateAsync } = useUpdatePurchase();

  const onSubmit = useCallback(
    async (values) => {
      const res = await mutateAsync({
        id: router?.query?.id as string,
        body: {
          receivedDate: data?.data?.receivedDate!,
          purchaseOrderId: data?.data?.purchaseOrder?.id!,

          purchaseItems:
            data?.data.purchaseItems.map((item) => {
              if (values.id === item.id) {
                return {
                  purchaseOrderItemId: item.purchaseOrderItem.id,
                  price: values.price,
                  quantity: values.quantity,
                  id: item.id,
                };
              }
              return {
                id: item.id,
                purchaseOrderItemId: item.purchaseOrderItem.id,
                quantity: item.quantity,
                price: item.price,
              };
            }) || [],
        },
      });
      res.message && toast.success(res.message);
      await router.replace({
        pathname: routeConstant.PurchaseView,
        query: { id: router?.query?.id },
      });
      await queryClient.invalidateQueries(getPurchasesKey());
      await queryClient.invalidateQueries(
        getPurchaseKey({ id: router?.query?.id as string })
      );
    },
    [
      data?.data?.purchaseItems,
      data?.data?.purchaseOrder?.id,
      data?.data?.receivedDate,
      mutateAsync,
      router,
    ]
  );

  const handleDelete = useCallback(async () => {
    dialog.showConfirmation({
      title: "Hapus Barang Pembelian",
      message: "Apakah anda yakin? Aksi tidak dapat dibatalkan",
      onPositiveAction: async (close) => {
        try {
          const res = await mutateAsync({
            id: router?.query?.id as string,
            body: {
              receivedDate: data?.data?.receivedDate!,
              purchaseOrderId: data?.data?.purchaseOrder?.id!,
              purchaseItems:
                data?.data?.purchaseItems
                  .filter(
                    (item) =>
                      router?.query?.itemId !== item.purchaseOrderItem?.id
                  )
                  .map((item) => ({
                    id: item.id,
                    price: item.price,
                    purchaseOrderItemId: item?.purchaseOrderItem?.id,
                    quantity: item?.quantity,
                  })) || [],
            },
          });
          res.message && toast.success(res.message);
          close();
          await router.replace({
            pathname: routeConstant.PurchaseView,
            query: { id: router?.query?.id },
          });
          await queryClient.invalidateQueries(getPurchasesKey());
          await queryClient.invalidateQueries(
            getPurchaseKey({ id: router?.query?.id as string })
          );
        } catch (e: any) {
          e?.message && toast.error(e?.message);
        }
      },
    });
  }, [
    data?.data?.purchaseItems,
    data?.data?.purchaseOrder?.id,
    data?.data?.receivedDate,
    dialog,
    mutateAsync,
    router,
  ]);
  const dataForm = useMemo(() => {
    return {
      ...data?.data?.purchaseItems?.find(
        (item) => item.purchaseOrderItem?.id === router?.query?.itemId
      ),
      purchaseOrderId: data?.data?.purchaseOrder?.id,
    };
  }, [
    data?.data?.purchaseItems,
    data?.data?.purchaseOrder?.id,
    router?.query?.itemId,
  ]);

  return (
    <Container>
      <LinkText
        label="Kembali"
        href={{
          pathname: routeConstant.PurchaseView,
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
          <PurchaseForm
            data={dataForm}
            onSubmit={onSubmit}
            onDelete={handleDelete}
          />
        }
      />
    </Container>
  );
}
const Container = styled("div", {});

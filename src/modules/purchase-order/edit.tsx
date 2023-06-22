import { useUpdatePurchaseOrder } from "@/api-hooks/purchase-order/purchase-order.mutation";
import {
  getPurchaseOrdersKey,
  useGetPurchaseOrder,
} from "@/api-hooks/purchase-order/purchase-order.query";
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
import FormPurchaseOrder from "./components/form";

export default function EditPurchaseOrder() {
  const router = useRouter();
  const { data, isLoading, isFetching, error, refetch } = useGetPurchaseOrder(
    {
      id: router?.query?.id as string,
    },
    { enabled: !!router?.query?.id }
  );
  const { mutateAsync } = useUpdatePurchaseOrder();

  const onSubmit = useCallback(
    async (values, purchaseOrderItems) => {
      const res = await mutateAsync({
        id: router?.query?.id as string,
        body: {
          ...values,
          purchaseOrderItems: purchaseOrderItems.map((item) => ({
            id: item.poiId,
            itemId: item.id,
            quantity: item.quantity,
            unit: item.unit,
            negotiationPrice: item.negotiationPrice,
          })),
        },
      });
      res.message && toast.success(res.message);
      await router.replace({
        pathname: routeConstant.PurchaseOrderView,
        query: { id: router?.query?.id },
      });
      await queryClient.invalidateQueries(getPurchaseOrdersKey());
    },
    [mutateAsync, router]
  );

  return (
    <Container>
      <LinkText
        label="Kembali"
        href={{
          pathname: routeConstant.PurchaseOrderView,
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
            <FormPurchaseOrder data={data?.data} onSubmit={onSubmit} />
          )
        }
      />
    </Container>
  );
}
const Container = styled("div", {});

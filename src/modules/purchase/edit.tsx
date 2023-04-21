import { useUpdatePurchase } from "@/api-hooks/purchase/purchase.mutation";
import {
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
import { useRouter } from "next/router";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import PurchaseForm from "./components/form";

export default function EditPurchase() {
  const router = useRouter();
  const { data, isLoading, isFetching, error, refetch } = useGetPurchase(
    {
      id: router?.query?.id as string,
    },
    { enabled: !!router?.query?.id }
  );
  const { mutateAsync } = useUpdatePurchase();

  const onSubmit = useCallback(
    async (values, purchaseItems) => {
      const res = await mutateAsync({
        id: router?.query?.id as string,
        body: {
          ...values,
          purchaseItems: purchaseItems.map((item) => ({
            id: item.piId,
            purchaseOrderItemId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      });
      res.message && toast.success(res.message);
      await router.replace({
        pathname: routeConstant.PurchaseView,
        query: { id: router?.query?.id },
      });
      await queryClient.invalidateQueries(getPurchasesKey());
    },
    [mutateAsync, router]
  );

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
          data?.data && <PurchaseForm data={data?.data} onSubmit={onSubmit} />
        }
      />
    </Container>
  );
}
const Container = styled("div", {});

import { useUpdateSale } from "@/api-hooks/sales/sales.mutation";
import { getSalesKey, useGetSale } from "@/api-hooks/sales/sales.query";
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
import SaleForm from "./components/form";

export default function EditSale() {
  const router = useRouter();
  const { data, isLoading, isFetching, error, refetch } = useGetSale(
    {
      id: router?.query?.id as string,
    },
    { enabled: !!router?.query?.id }
  );
  const { mutateAsync } = useUpdateSale();

  const onSubmit = useCallback(
    async (values, salesItems) => {
      const res = await mutateAsync({
        id: router?.query?.id as string,
        body: {
          ...values,
          salesItems: salesItems.map((item) => ({
            salesOrderItemId: item.id,
            quantity: item.quantity,
            id: item.siId,
            price: item.price,
          })),
        },
      });
      res.message && toast.success(res.message);
      await router.replace({
        pathname: routeConstant.SaleView,
        query: { id: router?.query?.id },
      });
      await queryClient.invalidateQueries(getSalesKey());
    },
    [mutateAsync, router]
  );

  return (
    <Container>
      <LinkText
        label="Kembali"
        href={{
          pathname: routeConstant.SaleView,
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
          data?.data && <SaleForm data={data?.data} onSubmit={onSubmit} />
        }
      />
    </Container>
  );
}
const Container = styled("div", {});

import { useUpdateSalesOrder } from "@/api-hooks/sales-order/sales-order.mutation";
import {
  getSalesOrdersKey,
  useGetSalesOrder,
} from "@/api-hooks/sales-order/sales-order.query";
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
import FormSaleOrder from "./components/form";

export default function EditSaleOrder() {
  const router = useRouter();
  const { data, isLoading, isFetching, error, refetch } = useGetSalesOrder(
    {
      id: router?.query?.id as string,
    },
    { enabled: !!router?.query?.id }
  );
  const { mutateAsync } = useUpdateSalesOrder();

  const onSubmit = useCallback(
    async (values, salesOrderItems) => {
      const res = await mutateAsync({
        id: router?.query?.id as string,
        body: {
          ...values,
          salesOrderItems: salesOrderItems.map((item) => ({
            id: item.poiId,
            itemId: item.id,
            quantity: item.quantity,
            unit: item.unit,
          })),
        },
      });
      res.message && toast.success(res.message);
      await router.replace({
        pathname: routeConstant.SaleOrderView,
        query: { id: router?.query?.id },
      });
      await queryClient.invalidateQueries(getSalesOrdersKey());
    },
    [mutateAsync, router]
  );

  return (
    <Container>
      <LinkText
        label="Kembali"
        href={{
          pathname: routeConstant.SaleOrderView,
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
          data?.data && <FormSaleOrder data={data?.data} onSubmit={onSubmit} />
        }
      />
    </Container>
  );
}
const Container = styled("div", {});

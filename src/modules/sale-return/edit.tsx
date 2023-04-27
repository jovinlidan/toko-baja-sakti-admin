import { useUpdateSaleReturn } from "@/api-hooks/sales-return/sales-return.mutation";
import {
  getSaleReturnsKey,
  useGetSaleReturn,
} from "@/api-hooks/sales-return/sales-return.query";
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

export default function EditSaleReturn() {
  const router = useRouter();
  const { data, isLoading, isFetching, error, refetch } = useGetSaleReturn(
    {
      id: router?.query?.id as string,
    },
    { enabled: !!router?.query?.id }
  );
  const { mutateAsync } = useUpdateSaleReturn();

  const onSubmit = useCallback(
    async (values, salesReturnItems) => {
      const res = await mutateAsync({
        id: router?.query?.id as string,
        body: {
          ...values,
          salesReturnItems: salesReturnItems.map((item) => ({
            salesItemId: item.id,
            quantity: item.quantity,
            reason: item.reason,
            id: item.sriId,
          })),
        },
      });
      res.message && toast.success(res.message);
      await router.replace({
        pathname: routeConstant.SaleReturnView,
        query: { id: router?.query?.id },
      });
      await queryClient.invalidateQueries(getSaleReturnsKey());
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

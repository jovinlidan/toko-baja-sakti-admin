import { BxChevronLeftSVG } from "@/common/assets";
import { queryClient } from "@/common/repositories/query-client";
import Separator from "@/components/common/separator";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { ItemTableDataType } from "./components/item-table";
import { useCreateSalesOrder } from "@/api-hooks/sales-order/sales-order.mutation";
import { getSalesOrdersKey } from "@/api-hooks/sales-order/sales-order.query";
import SaleOrderForm from "@/modules/sale-order/components/form";

export default function CreateSaleOrder() {
  const { mutateAsync } = useCreateSalesOrder();
  const router = useRouter();

  const onSubmit = useCallback(
    async (values, salesOrderItems: ItemTableDataType[]) => {
      const res = await mutateAsync({
        body: {
          ...values,
          salesOrderItems: salesOrderItems.map((item) => ({
            itemId: item.id,
            quantity: item.quantity,
            unit: item.unit,
          })),
        },
      });
      res.message && toast.success(res.message);
      router.push({
        pathname: routeConstant.SaleOrderView,
        query: { id: res.data.id },
      });
      await queryClient.invalidateQueries(getSalesOrdersKey());
    },
    [mutateAsync, router]
  );

  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.SaleOrderList}
        startEnhancer={(color) => <BxChevronLeftSVG color={color} />}
      />
      <Separator mb={24} />
      <SaleOrderForm onSubmit={onSubmit} />
    </Container>
  );
}
const Container = styled("div", {});

import { BxChevronLeftSVG } from "@/common/assets";
import { queryClient } from "@/common/repositories/query-client";
import Separator from "@/components/common/separator";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useCreatePurchaseOrder } from "@/api-hooks/purchase-order/purchase-order.mutation";
import { getPurchaseOrdersKey } from "@/api-hooks/purchase-order/purchase-order.query";
import FormPurchaseOrder from "@/modules/purchase-order/components/form";
import { ItemTableDataType } from "./components/item-table";

export default function CreatePurchaseOrder() {
  const { mutateAsync } = useCreatePurchaseOrder();
  const router = useRouter();

  const onSubmit = useCallback(
    async (values, purchaseOrderItems: ItemTableDataType[]) => {
      const res = await mutateAsync({
        body: {
          ...values,
          purchaseOrderItems: purchaseOrderItems.map((item) => ({
            itemId: item.id,
            quantity: item.quantity,
            unit: item.unit,
            negotiationPrice: item.negotiationPrice,
          })),
        },
      });
      res.message && toast.success(res.message);
      router.push({
        pathname: routeConstant.PurchaseOrderView,
        query: { id: res.data.id },
      });
      await queryClient.invalidateQueries(getPurchaseOrdersKey());
    },
    [mutateAsync, router]
  );

  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.PurchaseOrderList}
        startEnhancer={(color) => <BxChevronLeftSVG color={color} />}
      />
      <Separator mb={24} />
      <FormPurchaseOrder onSubmit={onSubmit} />
    </Container>
  );
}
const Container = styled("div", {});

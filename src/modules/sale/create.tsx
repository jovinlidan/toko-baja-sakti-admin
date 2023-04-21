import { BxChevronLeftSVG } from "@/common/assets";
import { queryClient } from "@/common/repositories/query-client";
import Separator from "@/components/common/separator";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useCreatePurchase } from "@/api-hooks/purchase/purchase.mutation";
import { PurchaseOrderItemTableDataType } from "@/modules/purchase/components/purchase-order-item-table";
import PurchaseForm from "@/modules/purchase/components/form";
import { getPurchasesKey } from "@/api-hooks/purchase/purchase.query";

export default function CreatePurchase() {
  const { mutateAsync } = useCreatePurchase();
  const router = useRouter();

  const onSubmit = useCallback(
    async (values, purchaseItems: PurchaseOrderItemTableDataType[]) => {
      const res = await mutateAsync({
        body: {
          ...values,
          purchaseItems: purchaseItems.map((item) => ({
            purchaseOrderItemId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      });
      res.message && toast.success(res.message);
      router.push({
        pathname: routeConstant.PurchaseView,
        query: { id: res.data.id },
      });
      await queryClient.invalidateQueries(getPurchasesKey());
    },
    [mutateAsync, router]
  );

  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.PurchaseList}
        startEnhancer={(color) => <BxChevronLeftSVG color={color} />}
      />
      <Separator mb={24} />
      <PurchaseForm onSubmit={onSubmit} />
    </Container>
  );
}
const Container = styled("div", {});

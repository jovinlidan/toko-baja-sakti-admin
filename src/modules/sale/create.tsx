import { BxChevronLeftSVG } from "@/common/assets";
import { queryClient } from "@/common/repositories/query-client";
import Separator from "@/components/common/separator";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { SaleItemTableDataType } from "@/modules/sale/components/sale-item-table";
import SaleForm from "@/modules/sale/components/form";
import { useCreateSale } from "@/api-hooks/sales/sales.mutation";
import { getSalesKey } from "@/api-hooks/sales/sales.query";

export default function CreateSale() {
  const { mutateAsync } = useCreateSale();
  const router = useRouter();

  const onSubmit = useCallback(
    async (values, salesItems: SaleItemTableDataType[]) => {
      const res = await mutateAsync({
        body: {
          ...values,
          salesItems: salesItems.map((item) => ({
            salesOrderItemId: item.id,
            quantity: item.quantity,
          })),
        },
      });
      res.message && toast.success(res.message);
      router.push({
        pathname: routeConstant.SaleView,
        query: { id: res.data.id },
      });
      await queryClient.invalidateQueries(getSalesKey());
    },
    [mutateAsync, router]
  );

  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.SaleList}
        startEnhancer={(color) => <BxChevronLeftSVG color={color} />}
      />
      <Separator mb={24} />
      <SaleForm onSubmit={onSubmit} />
    </Container>
  );
}
const Container = styled("div", {});

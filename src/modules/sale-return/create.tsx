import { BxChevronLeftSVG } from "@/common/assets";
import { queryClient } from "@/common/repositories/query-client";
import Separator from "@/components/common/separator";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

import SaleReturnForm from "@/modules/sale-return/components/form";
import { useCreateSaleReturn } from "@/api-hooks/sales-return/sales-return.mutation";
import { SaleReturnItemTableDataType } from "./components/sale-return-item-table";
import { getSaleReturnsKey } from "@/api-hooks/sales-return/sales-return.query";

export default function CreateSaleReturn() {
  const { mutateAsync } = useCreateSaleReturn();
  const router = useRouter();

  const onSubmit = useCallback(
    async (values, salesReturnItems: SaleReturnItemTableDataType[]) => {
      const res = await mutateAsync({
        body: {
          ...values,
          salesReturnItems: salesReturnItems.map((item) => ({
            salesItemId: item.id,
            quantity: item.quantity,
            reason: item.reason,
          })),
        },
      });
      res.message && toast.success(res.message);
      router.push({
        pathname: routeConstant.SaleReturnView,
        query: { id: res.data.id },
      });
      await queryClient.invalidateQueries(getSaleReturnsKey());
    },
    [mutateAsync, router]
  );

  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.SaleReturnList}
        startEnhancer={(color) => <BxChevronLeftSVG color={color} />}
      />
      <Separator mb={24} />
      <SaleReturnForm onSubmit={onSubmit} />
    </Container>
  );
}
const Container = styled("div", {});

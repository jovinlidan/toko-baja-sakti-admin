import { useCreateAdjustmentItem } from "@/api-hooks/adjustment-item/adjustment-item.mutation";
import { getAdjustmentItemsKey } from "@/api-hooks/adjustment-item/adjustment-item.query";
import { BxChevronLeftSVG } from "@/common/assets";
import { queryClient } from "@/common/repositories/query-client";
import Separator from "@/components/common/separator";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import AdjustmentItemForm from "./components/form";

export default function CreateAdjustmentItem() {
  const { mutateAsync } = useCreateAdjustmentItem();
  const router = useRouter();

  const onSubmit = useCallback(
    async (values) => {
      const res = await mutateAsync({ body: values });
      res.message && toast.success(res.message);
      router.push({
        pathname: routeConstant.AdjustmentItemView,
        query: { id: res.data.id },
      });
      await queryClient.invalidateQueries(getAdjustmentItemsKey());
    },
    [mutateAsync, router]
  );
  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.AdjustmentItemList}
        startEnhancer={(color) => <BxChevronLeftSVG color={color} />}
      />
      <Separator mb={24} />
      <AdjustmentItemForm onSubmit={onSubmit} />
    </Container>
  );
}
const Container = styled("div", {});

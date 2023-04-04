import { useCreateItem } from "@/api-hooks/item/item.mutation";
import { getItemsKey } from "@/api-hooks/item/item.query";
import { BxChevronLeftSVG } from "@/common/assets";
import { queryClient } from "@/common/repositories/query-client";
import Separator from "@/components/common/separator";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import BarangForm from "./components/form";

export default function CreateItem() {
  const { mutateAsync } = useCreateItem();

  const onSubmit = useCallback(
    async (values) => {
      const res = await mutateAsync({ body: values });
      res.message && toast.success(res.message);
      await queryClient.invalidateQueries(getItemsKey());
    },
    [mutateAsync]
  );
  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.ItemList}
        startEnhancer={(color) => <BxChevronLeftSVG color={color} />}
      />
      <Separator mb={24} />
      <BarangForm onSubmit={onSubmit} />
    </Container>
  );
}
const Container = styled("div", {});

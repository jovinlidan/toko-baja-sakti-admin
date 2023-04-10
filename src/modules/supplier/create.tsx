import { BxChevronLeftSVG } from "@/common/assets";
import { queryClient } from "@/common/repositories/query-client";
import Separator from "@/components/common/separator";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useCreateSupplier } from "@/api-hooks/supplier/supplier.mutation";
import { getSuppliersKey } from "@/api-hooks/supplier/supplier.query";
import FormSupplier from "./components/form";

export default function CreateSupplier() {
  const { mutateAsync } = useCreateSupplier();
  const router = useRouter();

  const onSubmit = useCallback(
    async (values) => {
      const res = await mutateAsync({ body: values });
      res.message && toast.success(res.message);
      router.push({
        pathname: routeConstant.SupplierView,
        query: { id: res.data.id },
      });
      await queryClient.invalidateQueries(getSuppliersKey());
    },
    [mutateAsync, router]
  );

  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.SupplierList}
        startEnhancer={(color) => <BxChevronLeftSVG color={color} />}
      />
      <Separator mb={24} />
      <FormSupplier onSubmit={onSubmit} />
    </Container>
  );
}
const Container = styled("div", {});

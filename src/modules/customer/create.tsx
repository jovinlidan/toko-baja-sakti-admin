import { BxChevronLeftSVG } from "@/common/assets";
import { queryClient } from "@/common/repositories/query-client";
import Separator from "@/components/common/separator";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import FormCustomer from "@/modules/customer/components/form";
import { useCreateCustomer } from "@/api-hooks/customer/customer.mutation";
import { getCustomersKey } from "@/api-hooks/customer/customer.query";
import { useRouter } from "next/router";

export default function CreateCustomer() {
  const { mutateAsync } = useCreateCustomer();
  const router = useRouter();

  const onSubmit = useCallback(
    async (values) => {
      const res = await mutateAsync({ body: values });
      res.message && toast.success(res.message);
      router.push({
        pathname: routeConstant.CustomerView,
        query: { id: res.data.id },
      });
      await queryClient.invalidateQueries(getCustomersKey());
    },
    [mutateAsync, router]
  );

  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.CustomerList}
        startEnhancer={(color) => <BxChevronLeftSVG color={color} />}
      />
      <Separator mb={24} />
      <FormCustomer onSubmit={onSubmit} />
    </Container>
  );
}
const Container = styled("div", {});

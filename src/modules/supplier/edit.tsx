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
import {
  getSuppliersKey,
  useGetSupplier,
} from "@/api-hooks/supplier/supplier.query";
import { useUpdateSupplier } from "@/api-hooks/supplier/supplier.mutation";
import FormSupplier from "./components/form";

export default function EditSupplier() {
  const router = useRouter();
  const { data, isLoading, isFetching, error, refetch } = useGetSupplier(
    {
      id: router?.query?.id as string,
    },
    { enabled: !!router?.query?.id }
  );
  const { mutateAsync } = useUpdateSupplier();

  const onSubmit = useCallback(
    async (values) => {
      const res = await mutateAsync({
        id: router?.query?.id as string,
        body: values,
      });
      res.message && toast.success(res.message);
      await router.replace({
        pathname: routeConstant.SupplierView,
        query: { id: router?.query?.id },
      });
      await queryClient.invalidateQueries(getSuppliersKey());
    },
    [mutateAsync, router]
  );
  return (
    <Container>
      <LinkText
        label="Kembali"
        href={{
          pathname: routeConstant.SupplierView,
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
          data?.data && <FormSupplier data={data?.data} onSubmit={onSubmit} />
        }
      />
    </Container>
  );
}
const Container = styled("div", {});

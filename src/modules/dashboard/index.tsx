import { useGetOverview } from "@/api-hooks/overview/overview.query";
import FetchWrapperComponent from "@/components/common/fetch-wrapper-component";
import Separator from "@/components/common/separator";
import { styled } from "@/config/stitches/theme.stitches";
import DailyTotalSale from "./sections/daily-total-sale";
import MinimumStockNotification from "./sections/minimum-stock-notification";
import DashboardPurchase from "./sections/purchase";
import DashboardSale from "./sections/sale";

export default function Dashboard() {
  const { data, error, isLoading, isFetching, refetch } = useGetOverview();
  return (
    <Container>
      <FetchWrapperComponent
        isLoading={isLoading || isFetching}
        error={error}
        onRetry={refetch}
        component={
          <>
            <DashboardSale data={data?.salesOrders} />
            <Separator mb={24} />
            <DashboardPurchase data={data?.purchaseOrders} />
            <Separator mb={24} />
            <MinimumStockNotification
              data={data?.notificationStockMinimum || []}
            />
            <Separator mb={24} />
            <DailyTotalSale />
          </>
        }
      />
    </Container>
  );
}
const Container = styled("div", {});

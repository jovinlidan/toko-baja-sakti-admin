import Separator from "@/components/common/separator";
import { styled } from "@/config/stitches/theme.stitches";
import DailyTotalSale from "./sections/daily-total-sale";
import MinimumStockNotification from "./sections/minimum-stock-notification";
import DashboardPurchase from "./sections/purchase";
import DashboardSale from "./sections/sale";

export default function Dashboard() {
  return (
    <Container>
      <DashboardSale />
      <Separator mb={24} />
      <DashboardPurchase />
      <Separator mb={24} />
      <MinimumStockNotification />
      <Separator mb={24} />
      <DailyTotalSale />
    </Container>
  );
}
const Container = styled("div", {});

import { OverviewSalesOrders } from "@/api-hooks/overview/overview.model";
import { useGetOverview } from "@/api-hooks/overview/overview.query";
import Separator from "@/components/common/separator";
import { Text } from "@/components/elements";
import LinkText from "@/components/elements/link-text";
import { FullContainer } from "@/components/elements/styles";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";

interface Props {
  data?: OverviewSalesOrders;
}

export default function DashboardSale(props: Props) {
  const { data } = props;
  return (
    <Container>
      <Text variant="h5">Penjualan</Text>
      <Separator mb={24} />
      <FullContainer direction="column" style={{ padding: "20px 32px" }}>
        <Row>
          <Text>
            Pesanan Belum Diproses : {data?.notInProcessSalesOrder} |{" "}
          </Text>
          &nbsp;
          <LinkText
            variant="body1"
            href={{
              pathname: routeConstant.SaleOrderList,
              query: { status: "belum_diproses" },
            }}
            label="Detail"
          />
        </Row>
        <Separator mb={12} />
        <Row>
          <Text>Pesanan Sedang Diproses : {data?.inProcessSalesOrder} | </Text>
          &nbsp;
          <LinkText
            variant="body1"
            href={{
              pathname: routeConstant.SaleOrderList,
              query: { status: "sudah_diproses" },
            }}
            label="Detail"
          />
        </Row>
      </FullContainer>
    </Container>
  );
}
const Container = styled("div", {});
const Row = styled("div", {
  display: "flex",
  alignItems: "center",
  "& span": {
    letterSpacing: "0.15px",
  },
});

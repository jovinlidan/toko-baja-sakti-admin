import { OverviewPurchaseOrders } from "@/api-hooks/overview/overview.model";
import Separator from "@/components/common/separator";
import { Text } from "@/components/elements";
import LinkText from "@/components/elements/link-text";
import { FullContainer } from "@/components/elements/styles";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";

interface Props {
  data?: OverviewPurchaseOrders;
}

export default function DashboardPurchase(props: Props) {
  const { data } = props;
  return (
    <Container>
      <Text variant="h5">Pembelian</Text>
      <Separator mb={24} />
      <FullContainer direction="column" style={{ padding: "20px 32px" }}>
        <Row>
          <Text>
            Pembelian Belum Diproses : {data?.notInProcessPurchaseOrder} |{" "}
          </Text>
          &nbsp;
          <LinkText
            variant="body1"
            href={{
              pathname: routeConstant.PurchaseOrderList,
              query: { status: "belum_diproses" },
            }}
            label="Detail"
          />
        </Row>
        <Separator mb={12} />
        <Row>
          <Text>
            Pembelian Sedang Diproses : {data?.inProcessPurchaseOrder} |{" "}
          </Text>
          &nbsp;
          <LinkText
            variant="body1"
            href={{
              pathname: routeConstant.PurchaseOrderList,
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

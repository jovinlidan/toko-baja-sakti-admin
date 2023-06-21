import Separator from "@/components/common/separator";
import { Text } from "@/components/elements";
import LinkText from "@/components/elements/link-text";
import { FullContainer } from "@/components/elements/styles";
import { styled } from "@/config/stitches/theme.stitches";

export default function DashboardPurchase() {
  return (
    <Container>
      <Text variant="h5">Pembelian</Text>
      <Separator mb={24} />
      <FullContainer direction="column" style={{ padding: "20px 32px" }}>
        <Row>
          <Text>Pembelian Belum Diproses : 3 | </Text>&nbsp;
          <LinkText variant="body1" href="/" label="Detail" />
        </Row>
        <Separator mb={12} />
        <Row>
          <Text>Pembelian Sedang Diproses : 3 | </Text>&nbsp;
          <LinkText variant="body1" href="/" label="Detail" />
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

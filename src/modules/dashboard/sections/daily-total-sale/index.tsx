import Separator from "@/components/common/separator";
import { Text } from "@/components/elements";
import LinkText from "@/components/elements/link-text";
import { FullContainer } from "@/components/elements/styles";
import { styled } from "@/config/stitches/theme.stitches";

export default function DailyTotalSale() {
  return (
    <Container>
      <Text variant="h5">Total Penjualan Hari Ini</Text>
      <Separator mb={24} />
      <FullContainer direction="column" style={{ padding: "20px 32px" }}>
        <Text variant="h6">Rp 1.530.000</Text>
      </FullContainer>
    </Container>
  );
}
const Container = styled("div", {});

import Separator from "@/components/common/separator";
import { Text } from "@/components/elements";
import LinkText from "@/components/elements/link-text";
import { FullContainer } from "@/components/elements/styles";
import { styled } from "@/config/stitches/theme.stitches";
import { string2money } from "@/utils/string";

interface Props {
  total?: number;
}
export default function DailyTotalSale(props: Props) {
  const { total } = props;
  return (
    <Container>
      <Text variant="h5">Total Penjualan Hari Ini</Text>
      <Separator mb={24} />
      <FullContainer direction="column" style={{ padding: "20px 32px" }}>
        <Text variant="h6">Rp {string2money(total)}</Text>
      </FullContainer>
    </Container>
  );
}
const Container = styled("div", {});

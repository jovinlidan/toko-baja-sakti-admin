import Link from "next/link";
import { Text } from "@/components/elements";
import { css, styled } from "@/config/stitches/theme.stitches";

export default function Logo() {
  return (
    <Container>
      <Link href="/">
        <Text align="center" weight="bold" className={styles.text()}>
          Toko Baja Sakti
        </Text>
      </Link>
    </Container>
  );
}

const Container = styled("div", {
  padding: "48px 48px 20px 32px",
});
const styles = {
  text: css({
    fontSize: 28,
    lineHeight: "24px",
    letterSpacing: "0.15px",
  }),
};

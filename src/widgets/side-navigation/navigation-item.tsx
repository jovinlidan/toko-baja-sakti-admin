import { NavigationInterface } from "@/hooks/use-side-navigation";
import Image from "next/image";
import Link from "next/link";
import { Text } from "@/components/elements";
import { css, styled, theme } from "@/config/stitches/theme.stitches";
import Separator from "@/components/common/separator";
import imageConstant from "@/constants/image.constant";

interface Props extends NavigationInterface {
  active: boolean;
}

export default function NavigationItem(props: Props) {
  return (
    <Link href={props.href} className={styles.link()}>
      <Content active={props.active}>
        <Image
          src={props.active ? props.iconActive : props.icon}
          alt={props.label}
          width={24}
          height={24}
          priority
        />
        <Separator mr={8} />
        <Text
          variant="body1"
          color={
            !props.active
              ? theme.colors.otherMenuLink.value
              : theme.colors.primaryMain.value
          }
        >
          {props.label}
        </Text>
      </Content>
    </Link>
  );
}

const Content = styled("div", {
  display: "flex",
  alignItems: "center",
  padding: "10px 16px 10px 32px",
  marginBottom: 5,
  marginTop: 5,
  variants: {
    active: {
      true: {
        borderRight: "4px solid",
        borderRightColor: "$primaryMain",
      },
    },
  },
});
const styles = {
  link: css({
    height: 200,
  }),
};

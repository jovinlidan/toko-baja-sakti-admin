import { css, styled, theme } from "@/config/stitches/theme.stitches";
import { default as NextLink, LinkProps } from "next/link";
import * as React from "react";
import Separator from "../common/separator";

import Text, { TextVariants } from "./text";

interface Props extends LinkProps {
  label: string;
  href: string;
  variant?:
    | "normal"
    | "medium"
    | "small"
    | "extrasmall"
    | TextVariants["variant"];
  disabled?: boolean;
  startEnhancer?: (color: string) => React.ReactNode;
}

export default function LinkText(props: Props) {
  const { href, label, variant = "normal", disabled, startEnhancer } = props;

  const textVariant = React.useMemo(() => {
    switch (variant) {
      case "medium":
        return "body1";
      case "small":
        return "body2";
      case "extrasmall":
        return "caption";
      case "normal":
        return "h6";
      default:
        return variant;
    }
  }, [variant]);

  if (disabled) {
    return (
      <Wrapper>
        <DisabledText variant={textVariant}>{label} </DisabledText>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <NextLink passHref href={href} title={label} className={styles.link()}>
        {!!startEnhancer && (
          <Row>
            {startEnhancer(theme.colors.textPrimary.value)}
            <Separator mr={8} />
          </Row>
        )}
        <StyledText variant={textVariant}>{label}</StyledText>
      </NextLink>
    </Wrapper>
  );
}

const styles = {
  link: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textDecoration: "none",
    position: "relative",
    "&::after": {
      content: `""`,
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "1px",
      background: "$textPrimary",
      transition: "transform 300ms",
      transform: "scale(0)",
      transformOrigin: "center",
    },
    "&:hover::after, &:focus::after": {
      transform: "scale(1)",
    },

    "&:active::after": {
      background: "$secondaryDark",
    },
  }),
};
const StyledText = styled(Text, {
  color: "$secondaryDefault",
  "&:active": {
    color: "$textSecondary",
  },
});

const DisabledText = styled(Text, {
  color: "$skyLight",
  cursor: "not-allowed",
});

const Wrapper = styled("div", {
  width: "fit-content",
});

const Row = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

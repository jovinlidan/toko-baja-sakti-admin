import ColorConstant, {
  ColorThemeType,
} from "@/config/stitches/color.stitches";
import { css, styled } from "@/config/stitches/theme.stitches";
import TypographyConstant from "@/config/stitches/typography.stitches";
import type * as Polymorphic from "@radix-ui/react-polymorphic";
import type * as Stitches from "@stitches/react";
import classNames from "classnames";
import * as React from "react";
import merge from "ts-deepmerge";

const DEFAULT_TAG = "span";

const StyledText = styled(DEFAULT_TAG, {
  margin: "0",
  fontWeight: "$regular",
  display: "block",
  variants: {
    variant: TypographyConstant,
    weight: {
      light: {
        fontWeight: "$light",
      },
      regular: {
        fontWeight: "$regular",
      },
      medium: {
        fontWeight: "$bold",
      },
      bold: {
        fontWeight: "$bold",
      },
    },
    align: {
      center: {
        textAlign: "center",
      },
      left: {
        textAlign: "left",
      },
      right: {
        textAlign: "right",
      },
    },
  },
});

type ColorType = ColorThemeType | string;

type TextCSSProp = {
  css?: Stitches.CSS;
  color?: ColorType;
  capitalize?: boolean;
};
export type TextVariants = Stitches.VariantProps<typeof StyledText>;
type TextOwnProps = TextCSSProp & TextVariants;

export type TextComponentType = Polymorphic.ForwardRefComponent<
  typeof DEFAULT_TAG,
  TextOwnProps
>;

const Text = React.forwardRef((props, forwardedRef) => {
  const { capitalize, color = "$textPrimary", ...restProps } = props;
  const cssOverrides = merge(
    {
      color,
    },
    { ...props.css }
  );
  return (
    <StyledText
      {...restProps}
      className={classNames(css(cssOverrides)(), props.className)}
      ref={forwardedRef}
    />
  );
}) as TextComponentType;
Text.displayName = StyledText.className;
export default Text;

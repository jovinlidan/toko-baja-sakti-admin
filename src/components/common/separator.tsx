import { css, styled } from "@/config/stitches/theme.stitches";
import type * as Polymorphic from "@radix-ui/react-polymorphic";
import { CSS, VariantProps } from "@stitches/react";
import * as React from "react";
interface Props {
  p?: number;
  px?: number;
  py?: number;
  pl?: number;
  pt?: number;
  pr?: number;
  pb?: number;

  m?: number;
  mx?: number;
  my?: number;
  ml?: number;
  mt?: number;
  mr?: number;
  mb?: number;
}

const DEFAULT_TAG = "div";

const SeparatorContainer = styled(DEFAULT_TAG, {
  variants: {
    media: {
      onlyMobile: {
        "@desktop": {
          margin: "0px",
          padding: "0px",
        },
      },
      onlyDesktop: {
        "@mobile": {
          margin: "0px",
          padding: "0px",
        },
      },
    },
    variant: {},
  },
});

type SeparatorCSSProp = { css?: CSS } & Props;
type SeparatorVariants = VariantProps<typeof SeparatorContainer>;
type SeparatorOwnProps = SeparatorCSSProp & SeparatorVariants;

type SeparatorComponent = Polymorphic.ForwardRefComponent<
  typeof DEFAULT_TAG,
  SeparatorOwnProps
>;

const Separator = React.forwardRef((props, forwardedRef) => {
  const {
    media,
    m,
    ml,
    mr,
    mt,
    mb,
    mx,
    my,
    p,
    pb,
    pl,
    pt,
    pr,
    px,
    py,

    ...restProps
  } = props;
  return (
    <SeparatorContainer
      {...restProps}
      media={media}
      className={css({
        m,
        mx,
        my,
        ml,
        mr,
        mt,
        mb,
        p,
        px,
        py,
        pb,
        pl,
        pt,
        pr,
      })()}
      ref={forwardedRef}
    />
  );
}) as SeparatorComponent;

export default Separator;

Separator.toString = () => `.${SeparatorContainer.className}`;
Separator.displayName = `.${SeparatorContainer.className}`;

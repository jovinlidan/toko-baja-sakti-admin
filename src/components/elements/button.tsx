import { css, styled } from "@/config/stitches/theme.stitches";
import TypographyConstant from "@/config/stitches/typography.stitches";
import { VariantProps } from "@stitches/react";
import classNames from "classnames";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonVariants = VariantProps<typeof StyledButton>;

type BaseButtonType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export interface ButtonProps extends Omit<BaseButtonType, "ref"> {
  size?: ButtonVariants["size"];
  variant?: ButtonVariants["variant"];
  loading?: boolean;

  startEnhancer?: (size: number) => React.ReactNode;
  endEnhancer?: (size: number) => React.ReactNode;
}

export default function Button(props: ButtonProps) {
  const {
    startEnhancer,
    endEnhancer,
    variant = "primary",
    size = "medium",
    loading,
    ...restProps
  } = props;

  const iconSize = React.useMemo(() => {
    switch (size) {
      case "small":
        return 18;
      case "medium":
        return 20;
      case "large":
        return 24;
    }
    return 0;
  }, [size]);

  return (
    <StyledButton
      {...restProps}
      variant={variant}
      size={size}
      className={classNames(restProps.disabled ? styles.disabled() : undefined)}
    >
      {!!startEnhancer && (
        <StartEnhancerContainer>
          {startEnhancer(iconSize)}
          <EnhancerDivider state="start" size={size} />
        </StartEnhancerContainer>
      )}
      {props.children}
      {!!endEnhancer && (
        <EndEnhancerContainer>
          <EnhancerDivider state="end" size={size} />
          {endEnhancer(iconSize)}
        </EndEnhancerContainer>
      )}
    </StyledButton>
  );
}
const styles = {
  disabled: css({
    background: "$actionDisabledBackground !important",
    cursor: "not-allowed !important",
    color: "$actionDisabled !important",
    boxShadow: "none !important",
  }),
};

const EnhancerDivider = styled("div", {
  variants: {
    size: {
      small: {},
      medium: {},
      large: {},
    },
    state: {
      start: {},
      end: {},
    },
  },
  compoundVariants: [
    {
      size: "small",
      state: "start",
      css: {
        mr: 4,
      },
    },
    {
      size: "medium",
      state: "start",
      css: {
        mr: 8,
      },
    },
    {
      size: "large",
      state: "start",
      css: {
        mr: 12,
      },
    },

    {
      size: "small",
      state: "end",
      css: {
        ml: 4,
      },
    },
    {
      size: "medium",
      state: "end",
      css: {
        ml: 8,
      },
    },
    {
      size: "large",
      state: "end",
      css: {
        ml: 12,
      },
    },
  ],
});

const StartEnhancerContainer = styled("div", {
  display: "flex",
  alignItems: "center",
});

const EndEnhancerContainer = styled("div", {
  display: "flex",
  alignItems: "center",
});

const StyledButton = styled("button", {
  display: "flex",
  alignItems: "center",
  width: "fit-content",
  height: "fit-content",
  cursor: "pointer",
  color: "#FFFFFF",
  border: "none",
  transition: "200ms all",
  boxShadow: "$elevation3",
  borderRadius: 4,
  letterSpacing: "0.46px",

  variants: {
    variant: {
      primary: {
        background: "$primaryMain",
        "&:hover": {
          background: "$primaryDark",
        },
        "&:active": {
          background: "$primaryLight",
        },
      },
      secondary: {
        background: "$secondaryMain",
        "&:hover": {
          background: "$secondaryDark",
        },
        "&:active": {
          background: "$secondaryLight",
        },
      },
      error: {
        background: "$errorMain",
        "&:hover": {
          background: "$errorDark",
        },
        "&:active": {
          background: "$errorLight",
        },
      },
      warning: {
        background: "$warningMain",
        "&:hover": {
          background: "$warningDark",
        },
        "&:active": {
          background: "$warningLight",
        },
      },
      info: {
        background: "$infoMain",
        "&:hover": {
          background: "$infoDark",
        },
        "&:active": {
          background: "$infoLight",
        },
      },
      success: {
        background: "$successMain",
        "&:hover": {
          background: "$successDark",
        },
        "&:active": {
          background: "$successLight",
        },
      },
    },
    size: {
      small: {
        ...TypographyConstant.buttonSmall,
        padding: "4px 14px",
      },
      medium: {
        ...TypographyConstant.buttonMedium,
        padding: "7px 20px",
      },
      large: {
        ...TypographyConstant.buttonLarge,
        padding: "8px 26px",
      },
    },
  },
});

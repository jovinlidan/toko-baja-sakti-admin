import { styled } from "@/config/stitches/theme.stitches";

export const styles = {
  reset: {
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    backgroundColor: "transparent",
    padding: "0px !important",
    margin: "0px !important",
  },
};

export const RightEnhancerContainer = styled("div", {
  marginLeft: "8px",
  display: "flex",
  alignItems: "center",
});

export const LabelContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
});

export const RequiredText = styled("span", {
  color: "red",
  marginTop: "-4px",
  marginLeft: "3px",
});

export const PaginationContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginTop: "24px",
  justifyContent: "space-between",
});

export const PaginationText = styled("span", {
  color: "#9DA0A1",
});

export const PaginationHighlightText = styled("span", {
  color: "black",
});

export const PaginationSectionContainer = styled("div", {
  display: "flex",
});

export const ErrorViewContainer = styled("div", ({ vertical }) => ({
  display: "flex",
  flexDirection: "row",
  maxWidth: "100%",
  alignItems: "center",
  cursor: "pointer",

  variants: {
    vertical: {
      true: {
        flexDirection: "column",
      },
    },
  },
}));

export const ErrorImageContainer = styled("div", {
  width: "60px",
  height: "50px",
  minWidth: "60px",
  minHeight: "50px",
});

export const ErrorImage = styled("img", {
  width: "100%",
  height: "100%",
});

export const ErrorContentContainer = styled("div", {
  margin: "0px 8px",
  textAlign: "center",
  variants: {
    vertical: {
      true: {
        margin: "16px 0px",
      },
    },
  },
});

export const ErrorActionContainer = styled("div", {});
export const ErrorSpan = styled("p", {
  fontSize: "12px",
  lineHeight: 1.2,
  margin: 0,
});

export const RefreshContainer = styled("div", {
  cursor: "pointer",
});

export const CustomFormControlWrapper = styled("div", {
  variants: {
    noMargin: {
      true: {
        marginBottom: 0,
      },
      false: {
        marginBottom: 0,
      },
    },
  },
});

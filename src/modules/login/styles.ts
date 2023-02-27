import { css, styled } from "@/config/stitches/theme.stitches";

export const LoginContainer = styled("div", {
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const LoginCard = styled("div", {
  background: "#F5F5F9",
  padding: "40px 100px 34px 100px",
  borderRadius: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const TitleContainer = styled("div", {
  width: 180,
  mx: "auto",
  mb: 25,
});

export const styles = {
  logoText: css({
    fontSize: 28,
    fontWeight: "$bold !important",
    lineHeight: "24px",
    textAlign: "center",
  }),
  input: css({
    width: "100%",
    "@lg": {
      width: 562,
    },
  }),
};

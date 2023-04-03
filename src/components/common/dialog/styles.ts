import { styled } from "@/config/stitches/theme.stitches";

export const Panel = styled("div", {
  minWidth: "35%",
  maxWidth: "90%",
  padding: "32px",
  background: "$backgroundPaper",
  position: "relative",
  borderRadius: 12,
  zIndex: 9999,
  minHeight: 160,
  maxHeight: "90vh",
  overflow: "scroll",

  width: "90%",

  "@md": {
    width: "70%",
  },
  "@lg": {
    width: "unset",
  },
});

export const CloseButton = styled("div", {
  transform: "rotate(45deg)",
  userSelect: "none",
  position: "absolute",
  fontSize: 24,
  cursor: "pointer",
  right: 16,
  top: 4,
});

export const TitleContainer = styled("div", {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  paddingBottom: "$space24",
  justifyContent: "center",
  alignItems: "center",
});

export const DescContainer = styled("div", {
  textAlign: "center",
  maxWidth: 360,
  margin: "auto",
});

export const ModalContent = styled("div", {
  marginTop: "32px",
});

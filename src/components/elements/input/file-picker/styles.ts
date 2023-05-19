import { styled, theme } from "@/config/stitches/theme.stitches";

export const PickerContainer = styled("div", {
  width: 128,
  height: 128,
  minWidth: 128,
  minHeight: 128,
});

export const MainPreviewContainer = styled("div", {
  flexDirection: "row",
  display: "flex",
  flexWrap: "wrap",
  marginTop: "-12px",
  marginBottom: "12px",
});
export const MainDropzoneContainer = styled("div", {
  border: `1px dashed ${theme.colors.textPrimary.value}`,
  cursor: "pointer",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  height: "100%",
  borderRadius: 8,
  background: theme.colors.backgroundPaper.value,
  variants: {
    error: {
      true: {
        border: `2px dashed ${theme.colors.errorMain.value}`,
      },
    },
    disabled: {
      true: {
        cursor: "not-allowed !important",
        border: `2px dashed ${theme.colors.disabledInput.value}`,
        background: theme.colors.disabledInput.value,
      },
    },
  },
});

export const ContentContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
});

export const BrowseFilesPill = styled("div", {
  marginTop: 8,
});

export const PreviewContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  marginTop: "12px",
  position: "relative",
});

export const PreviewSeparator = styled("div", {
  marginRight: "4%",
});

export const ImagePreviewContainer = styled("div", {
  width: "100%",
  paddingTop: "100%",
  cursor: "pointer",
  border: `1px dashed ${theme.colors.primaryDark.value}`,
  position: "relative",

  ":hover:after": {
    content: '" "',
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    zIndex: 1,
    position: "absolute",
    top: "0",
    right: "0",
    left: "0",
    bottom: "0",
  },
});

export const LoadingContainer = styled("div", {
  position: "absolute",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const ImagePreview = styled("img", {
  position: "absolute",
  top: "0",
  left: "0",
  bottom: "0",
  objectFit: "cover",
  right: "0",
  width: "100%",
  height: "100%",
});

export const FilePreview = styled("img", {
  position: "absolute",
  top: "0",
  objectFit: "contain",
  left: "0",
  bottom: "0",
  right: "0",
  width: "100%",
  height: "100%",
});

export const ActionContainer = styled("img", {
  width: "100%",
  height: "100%",
});

export const PreviewText = styled("span", {
  fontSize: "14px",
});

export const RemoveImage = styled("div", {
  position: "absolute",
  top: "-6px",
  right: "-6px",
  backgroundColor: "#e75b64",
  color: "white",
  borderRadius: "50%",
  fontSize: "16px",
  width: "16px",
  height: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  userSelect: "none",
  margin: "0 !important",
  zIndex: 2,
});

export const EditComponent = styled("div", {
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "2px 2px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  zIndex: 2,
});

import { createStitches } from "@stitches/react";
import ColorConstant from "./color.stitches";

export const stitches = createStitches({
  prefix: "baja-sakti",
  theme: {
    colors: ColorConstant,
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
    shadows: {
      inputElevation: "0px 1px 5px rgba(0, 0, 0, 0.25)",
      elevation2:
        "0px 1px 3px 2px rgba(50, 71, 92, 0.06), 0px 2px 5px 1px rgba(50, 71, 92, 0.04), 0px 1px 3px 2px rgba(50, 71, 92, 0.02)",
      elevation3:
        "0px 1px 6px 2px rgba(50, 71, 92, 0.06), 0px 2px 6px 1px rgba(50, 71, 92, 0.04), 0px 1px 4px 2px rgba(50, 71, 92, 0.02)",
    },
    zIndices: {
      header: 10001,
      toast: 10001,
      modal: 10002,
      selectStartEnhancer: 10000,
      selectMenu: 100001,
    },
  },
  media: {
    xs: "(min-width: 414px)",
    maxxs: "(max-width: 413px)",
    sm: "(min-width: 576px)",
    maxsm: "(max-width: 575px)",
    md: "(min-width: 768px)",
    maxmd: "(max-width: 768px)",
    lg: "(min-width: 992px)",
    maxlg: "(max-width: 991px)",
    xl: "(min-width: 1280px)",
    sl: "(min-width: 1380px)",
  },
  utils: {
    p: (value: any) => {
      if (!value) return {};
      return {
        paddingTop: value,
        paddingBottom: value,
        paddingLeft: value,
        paddingRight: value,
      };
    },
    pt: (value: any) => {
      if (!value) return {};
      return {
        paddingTop: value,
      };
    },
    pr: (value: any) => {
      if (!value) return {};
      return {
        paddingRight: value,
      };
    },
    pb: (value: any) => {
      if (!value) return {};
      return {
        paddingBottom: value,
      };
    },
    pl: (value: any) => {
      if (!value) return {};
      return {
        paddingLeft: value,
      };
    },
    px: (value: any) => {
      if (!value) return {};
      return {
        paddingLeft: value,
        paddingRight: value,
      };
    },
    py: (value: any) => {
      if (!value) return {};
      return {
        paddingTop: value,
        paddingBottom: value,
      };
    },

    m: (value: any) => {
      if (!value) return {};
      return {
        marginTop: value,
        marginBottom: value,
        marginLeft: value,
        marginRight: value,
      };
    },
    mt: (value: any) => {
      if (!value) return {};
      return {
        marginTop: value,
      };
    },
    mr: (value: any) => {
      if (!value) return {};
      return {
        marginRight: value,
      };
    },
    mb: (value: any) => {
      if (!value) return {};
      return {
        marginBottom: value,
      };
    },
    ml: (value: any) => {
      if (!value) return {};
      return {
        marginLeft: value,
      };
    },
    mx: (value: any) => {
      if (!value) return {};
      return {
        marginLeft: value,
        marginRight: value,
      };
    },
    my: (value: any) => {
      if (!value) return {};
      return {
        marginTop: value,
        marginBottom: value,
      };
    },
  },
});

export const { styled, css, getCssText, theme } = stitches;

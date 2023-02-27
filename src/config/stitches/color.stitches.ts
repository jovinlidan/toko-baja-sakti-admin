export type ColorThemeType = keyof typeof ColorConstant;

const ColorConstant = {
  primaryMain: "#696CFF",
  primaryLight: "#8082FF",
  primaryDark: "#6062E8",

  secondaryMain: "#8592A3",
  secondaryLight: "#97A2B1",
  secondaryDark: "#646E7A",

  infoMain: "#03C3EC",
  infoLight: "#40CDFA",
  infoDark: "#21AEDB",

  successMain: "#71DD37",
  successLight: "#86E255",
  successDark: "#67C932",

  warningMain: "#FFAB00",
  warningLight: "#FFB826",
  warningDark: "#E89C00",

  errorMain: "#FF3E1D",
  errorLight: "#FF5B3F",
  errorDark: "#E8381A",

  textPrimary: "rgba(50, 71, 92, 0.87)",
  textSecondary: "rgba(50, 71, 92, 0.6)",
  textDisabled: "rgba(50, 71, 92, 0.38)",

  otherMenuLink: "rgba(50, 71, 92, 0.68)",

  backgroundPaper: "#FFFFFF",

  actionDisabled: "rgba(50, 71, 92, 0.26)",
  actionDisabledBackground: "rgba(50, 71, 92, 0.12)",
};

export default ColorConstant;

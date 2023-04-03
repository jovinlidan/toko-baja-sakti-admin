import { styled } from "@/config/stitches/theme.stitches";
import ClipLoader from "react-spinners/ClipLoader";

export default function LoadingViewComponent() {
  return (
    <LoadingContainer>
      <ClipLoader />
    </LoadingContainer>
  );
}
const LoadingContainer = styled("div", {
  width: "100%",
  height: 300,
  background: "$disabledInput",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

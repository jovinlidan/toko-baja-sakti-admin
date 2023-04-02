import { LottieOptions, useLottie } from "lottie-react";
import { CSSProperties } from "react";

interface Props {
  options: LottieOptions;
  style?: CSSProperties;
}
export default function LottieAnimator(props: Props) {
  const { options, style } = props;
  const { View } = useLottie(options, style);
  return <>{View}</>;
}

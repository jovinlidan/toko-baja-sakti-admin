import { styled } from "@/config/stitches/theme.stitches";
import ParticlesContainer from "./particles";
import LoginForm from "./login-form";

export default function Login() {
  return (
    <LoginContainer>
      {/* <ParticlesContainer /> */}
      <LoginForm />
    </LoginContainer>
  );
}

const LoginContainer = styled("div", {
  background: "$primaryDark",
  height: "100%",
});

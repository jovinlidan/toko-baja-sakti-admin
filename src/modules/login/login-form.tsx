import * as React from "react";
import * as Yup from "yup";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import Image from "next/image";
import { useForm } from "react-hook-form";
import router from "next/router";
import { LoginCard, LoginContainer, styles, TitleContainer } from "./styles";
import { Input, Text } from "@/components/elements";
import Form from "@/components/elements/form";
// import { useKY } from "hooks/use-ky";
interface FormType {
  username?: string;
  password?: string;
  step?: number;
}

export default function LoginForm() {
  //   const { refreshContainer } = useKY();

  const YupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required(),
      }),
    []
  );

  const resolver = useYupValidationResolver(YupSchema);

  const defaultValues = React.useMemo(() => {
    return {};
  }, []);

  const methods = useForm<FormType>({
    resolver,
    mode: "all",
    defaultValues,
  });

  const onSubmit = React.useCallback(
    async (values) => {
      try {
        methods.reset();
        await router.push("/");
      } catch (e: any) {
      } finally {
      }
    },
    [methods]
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <LoginContainer>
        <LoginCard>
          <TitleContainer>
            <Text className={styles.logoText()}>Toko Baja Sakti</Text>
          </TitleContainer>
          <Input
            label="Username"
            type="text"
            name="username"
            className={styles.input()}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            className={styles.input()}
          />
          <Input type="submit" text="LOGIN" />
        </LoginCard>
      </LoginContainer>
    </Form>
  );
}

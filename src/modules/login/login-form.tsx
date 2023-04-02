import * as React from "react";
import * as Yup from "yup";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { LoginCard, LoginContainer, styles, TitleContainer } from "./styles";
import { Input, Text } from "@/components/elements";
import Form from "@/components/elements/form";
import { toast } from "react-hot-toast";
import { useLogin } from "@/api-hooks/auth/auth.mutation";
import { setCookie } from "@/common/helpers/common";

interface FormType {
  username?: string;
  password?: string;
}

export default function LoginForm() {
  const { mutateAsync } = useLogin();
  const router = useRouter();

  const YupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        username: Yup.string().required().email(),
        password: Yup.string().required(),
      }),
    []
  );

  const resolver = useYupValidationResolver(YupSchema);

  const defaultValues = React.useMemo(() => {
    return {
      username: "admin@gmail.com",
      password: "secret",
    };
  }, []);

  const methods = useForm<FormType>({
    resolver,
    mode: "all",
    defaultValues,
  });

  const onSubmit = React.useCallback(
    async (values) => {
      try {
        const res = await mutateAsync({ body: values });
        setCookie("token", res.data.accessToken, 1);
        setCookie("refresh", res.data.refreshToken, 1);
        res?.message && toast.success(res?.message);
        router.push("/");
        methods.reset();
      } catch (e: any) {
        toast.error(e?.message);
      }
    },
    [methods, mutateAsync, router]
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

import Login from "@/modules/login";

export default function LoginPage() {
  return <Login />;
}

LoginPage.getLayout = function getLayout(page) {
  return page;
};

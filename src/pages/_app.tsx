import AdminLayout from "@/layouts/admin-layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
interface MyAppProps extends AppProps {}

export default function App({ Component, pageProps }: MyAppProps) {
  return (
    <>
      <Head>
        <title>Toko Baja Sakti</title>
      </Head>
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    </>
  );
}

import AdminLayout from "@/layouts/admin-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import type { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { setLocale } from "yup";
import validationID from "@/locales/validation.id";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

setLocale(validationID);
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout || ((page) => <AdminLayout>{page}</AdminLayout>);
  return (
    <>
      <Head>
        <title>Toko Baja Sakti</title>
      </Head>
      <Toaster />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

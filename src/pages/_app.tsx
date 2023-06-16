import "reflect-metadata";
import "react-datepicker/dist/react-datepicker.css";

import AdminLayout from "@/layouts/admin-layout";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import type { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import validationID from "@/locales/validation.id";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/common/repositories/query-client";
import KYContainer from "@/hooks/use-ky";
import { theme } from "@/config/stitches/theme.stitches";
import { DialogProvider } from "@/hooks/use-dialog";
import TimezoneContainer from "@/hooks/use-timezone";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

Yup.setLocale(validationID);

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout || ((page) => <AdminLayout>{page}</AdminLayout>);
  return (
    <QueryClientProvider client={queryClient}>
      <KYContainer>
        <TimezoneContainer>
          <DialogProvider>
            <Head>
              <title>Toko Baja Sakti</title>
            </Head>
            <Toaster containerStyle={{ zIndex: theme.zIndices.toast.value }} />
            {getLayout(<Component {...pageProps} />)}
          </DialogProvider>
        </TimezoneContainer>
      </KYContainer>
    </QueryClientProvider>
  );
}

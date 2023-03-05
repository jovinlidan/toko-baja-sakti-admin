import routeConstant from "@/constants/route.constant";
import { useRouter } from "next/router";
import * as React from "react";

export interface NavigationInterface {
  label: string;
  href: string;
}

const context = React.createContext({
  // activeKey: "/",
  // setActiveKey: (_: string) => {},
  navigations: [] as NavigationInterface[],
});

const { Provider } = context;

interface SideNavigationProviderProps {
  children: React.ReactNode;
}

const navigations: NavigationInterface[] = [
  {
    href: routeConstant.BarangList,
    label: "Barang",
  },
  {
    href: "/pelanggan",
    label: "Pelanggan",
  },
  {
    href: "/supplier",
    label: "Supplier",
  },
  {
    href: "/pesanan-pembelian",
    label: "Pesanan Pembelian",
  },
  {
    href: "/pembelian",
    label: "Pembelian",
  },
  {
    href: "/pesanan-penjualan",
    label: "Pesanan Penjualan",
  },
  {
    href: "/penjualan",
    label: "Penjualan",
  },
  {
    href: "/retur-penjualan",
    label: "Retur Penjualan",
  },
  {
    href: "/penyesuaian-barang",
    label: "Penyesuaian Barang",
  },
  {
    href: "/data-logging",
    label: "Data Logging",
  },
  {
    href: "/laporan",
    label: "Laporan",
  },
];

export function SideNavigationProvider(props: SideNavigationProviderProps) {
  // const [activeKey, setActiveKey] = React.useState<string>("/");

  return (
    <Provider
      value={{
        // activeKey,
        // setActiveKey,
        navigations,
      }}
    >
      {props.children}
    </Provider>
  );
}

export function useSideNavigation() {
  return React.useContext(context);
}

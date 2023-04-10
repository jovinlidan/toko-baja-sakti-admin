import routeConstant from "@/constants/route.constant";
import * as React from "react";

export interface NavigationInterface {
  label: string;
  href: string;
  key: string;
}

const context = React.createContext({
  navigations: [] as NavigationInterface[],
});

const { Provider } = context;

interface SideNavigationProviderProps {
  children: React.ReactNode;
}

const navigations: NavigationInterface[] = [
  {
    href: routeConstant.ItemList,
    label: "Barang",
    key: "item",
  },
  {
    href: routeConstant.CustomerList,
    label: "Pelanggan",
    key: "customer",
  },
  {
    href: routeConstant.SupplierList,
    label: "Supplier",
    key: "supplier",
  },
  {
    href: "/pesanan-pembelian",
    label: "Pesanan Pembelian",
    key: "order-purchase",
  },
  {
    href: "/pembelian",
    label: "Pembelian",
    key: "purchase",
  },
  {
    href: "/pesanan-penjualan",
    label: "Pesanan Penjualan",
    key: "order-sale",
  },
  {
    href: "/penjualan",
    label: "Penjualan",
    key: "sale",
  },
  {
    href: "/retur-penjualan",
    label: "Retur Penjualan",
    key: "refund-sale",
  },
  {
    href: "/penyesuaian-barang",
    label: "Penyesuaian Barang",
    key: "adjust-item",
  },
  {
    href: "/data-logging",
    label: "Data Logging",
    key: "data-logging",
  },
  {
    href: "/laporan",
    label: "Laporan",
    key: "report",
  },
];

export function SideNavigationProvider(props: SideNavigationProviderProps) {
  return (
    <Provider
      value={{
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

import imageConstant from "@/constants/image.constant";
import routeConstant from "@/constants/route.constant";
import * as React from "react";

export interface NavigationInterface {
  label: string;
  href: string;
  key: string | string[];
  icon: string;
  iconActive: string;
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
    key: ["item", "category-item"],
    icon: imageConstant.item,
    iconActive: imageConstant.itemActive,
  },
  {
    href: routeConstant.CustomerList,
    label: "Pelanggan",
    key: "customer",
    icon: imageConstant.customer,
    iconActive: imageConstant.customerActive,
  },
  {
    href: routeConstant.SupplierList,
    label: "Supplier",
    key: "supplier",
    icon: imageConstant.supplier,
    iconActive: imageConstant.supplierActive,
  },
  {
    href: routeConstant.PurchaseOrderList,
    label: "Pesanan Pembelian",
    key: "purchase-order",
    icon: imageConstant.purchaseOrder,
    iconActive: imageConstant.purchaseOrderActive,
  },
  {
    href: routeConstant.PurchaseList,
    label: "Pembelian",
    key: "purchase",
    icon: imageConstant.order,
    iconActive: imageConstant.orderActive,
  },
  {
    href: routeConstant.SaleOrderList,
    label: "Pesanan Penjualan",
    key: "sale-order",
    icon: imageConstant.saleOrder,
    iconActive: imageConstant.saleOrderActive,
  },
  {
    href: routeConstant.SaleList,
    label: "Penjualan",
    key: "sale",
    icon: imageConstant.sale,
    iconActive: imageConstant.saleActive,
  },
  {
    href: routeConstant.SaleReturnList,
    label: "Retur Penjualan",
    key: "sale-return",
    icon: imageConstant.saleReturn,
    iconActive: imageConstant.saleReturnActive,
  },
  {
    href: routeConstant.AdjustmentItemList,
    label: "Penyesuaian Barang",
    key: "adjustment-item",
    icon: imageConstant.itemAdjustment,
    iconActive: imageConstant.itemAdjustmentActive,
  },
  {
    href: routeConstant.AuditList,
    label: "Data Logging",
    key: "audit",
    icon: imageConstant.dataLogging,
    iconActive: imageConstant.dataLoggingActive,
  },
  {
    href: routeConstant.ReportList,
    label: "Laporan",
    key: "report",
    icon: imageConstant.report,
    iconActive: imageConstant.reportActive,
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

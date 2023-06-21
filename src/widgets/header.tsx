import sizeConstant from "@/constants/size.constant";
import { useSideNavigation } from "@/hooks/use-side-navigation";
import { useRouter } from "next/router";
import { Text } from "@/components/elements";
import * as React from "react";
import { css, styled, theme } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import { useKY } from "@/hooks/use-ky";
import Separator from "@/components/common/separator";
import { LogoutSVG } from "@/common/assets";

export default function Header() {
  const { navigations } = useSideNavigation();
  const router = useRouter();
  const { logout } = useKY();

  const mappings = React.useMemo(() => {
    return [
      ...navigations,
      {
        href: "/",
        label: "Dashboard",
      },
      {
        href: routeConstant.CategoryItemCreate,
        label: "Tambah Kategori Barang",
      },
      {
        href: routeConstant.CategoryItemView,
        label: "Detail Kategori Barang",
      },
      {
        href: routeConstant.CategoryItemEdit,
        label: "Ubah Kategori Barang",
      },
      {
        href: routeConstant.ItemCreate,
        label: "Tambah Barang",
      },
      {
        href: routeConstant.ItemView,
        label: "Detail Barang",
      },
      {
        href: routeConstant.ItemEdit,
        label: "Ubah Barang",
      },
      {
        href: routeConstant.CustomerList,
        label: "Pelanggan",
      },
      {
        href: routeConstant.CustomerCreate,
        label: "Tambah Pelanggan",
      },
      {
        href: routeConstant.CustomerEdit,
        label: "Ubah Pelanggan",
      },
      {
        href: routeConstant.CustomerView,
        label: "Detail Pelanggan",
      },
      {
        href: routeConstant.SupplierList,
        label: "Supplier",
      },
      {
        href: routeConstant.SupplierCreate,
        label: "Tambah Supplier",
      },
      {
        href: routeConstant.SupplierEdit,
        label: "Ubah Supplier",
      },
      {
        href: routeConstant.SupplierView,
        label: "Detail Supplier",
      },
      {
        href: routeConstant.PurchaseOrderList,
        label: "Pesanan Pembelian",
      },
      {
        href: routeConstant.PurchaseOrderCreate,
        label: "Tambah Pesanan Pembelian",
      },
      {
        href: routeConstant.PurchaseOrderEdit,
        label: "Ubah Pesanan Pembelian",
      },
      {
        href: routeConstant.PurchaseOrderView,
        label: "Detail Pesanan Pembelian",
      },
      {
        href: routeConstant.PurchaseList,
        label: "Pembelian",
      },
      {
        href: routeConstant.PurchaseCreate,
        label: "Tambah Pembelian",
      },
      {
        href: routeConstant.PurchaseEdit,
        label: "Ubah Pembelian",
      },
      {
        href: routeConstant.PurchaseEditOrderItemEdit,
        label: "Detail Barang Pembelian",
      },
      {
        href: routeConstant.PurchaseView,
        label: "Detail Pembelian",
      },
      {
        href: routeConstant.SaleOrderList,
        label: "Pesanan Penjualan",
      },
      {
        href: routeConstant.SaleOrderCreate,
        label: "Tambah Pesanan Penjualan",
      },
      {
        href: routeConstant.SaleOrderEdit,
        label: "Ubah Pesanan Penjualan",
      },
      {
        href: routeConstant.SaleOrderView,
        label: "Detail Pesanan Penjualan",
      },
      {
        href: routeConstant.SaleList,
        label: "Penjualan",
      },
      {
        href: routeConstant.SaleCreate,
        label: "Tambah Penjualan",
      },
      {
        href: routeConstant.SaleEdit,
        label: "Ubah Penjualan",
      },
      {
        href: routeConstant.SaleView,
        label: "Detail Penjualan",
      },
      {
        href: routeConstant.SaleReturnList,
        label: "Retur Penjualan",
      },
      {
        href: routeConstant.SaleReturnCreate,
        label: "Tambah Retur Penjualan",
      },
      {
        href: routeConstant.SaleReturnEdit,
        label: "Ubah Retur Penjualan",
      },
      {
        href: routeConstant.SaleReturnView,
        label: "Detail Retur Penjualan",
      },
      {
        href: routeConstant.AdjustmentItemList,
        label: "Penyesuaian Barang",
      },
      {
        href: routeConstant.AdjustmentItemCreate,
        label: "Tambah Penyesuaian Barang",
      },
      {
        href: routeConstant.AdjustmentItemView,
        label: "Detail Penyesuaian Barang",
      },
      {
        href: routeConstant.AuditList,
        label: "Data Logging",
      },
      {
        href: routeConstant.AuditView,
        label: "Detail Data Logging",
      },
    ];
  }, [navigations]);

  const headerMapper = React.useCallback(
    (path: string) => {
      const res = mappings.filter((mapping) => mapping.href === path);
      if (res.length) return res[0].label;
      return "Halaman Tidak Ditemukan";
    },
    [mappings]
  );

  return (
    <StyledHeader>
      <Container>
        <Text variant="h5">
          {headerMapper(router.pathname) +
            (!!router?.query?.additionalData
              ? ` - ${router?.query?.additionalData}`
              : "")}
        </Text>
      </Container>
      <LogoutContainer onClick={logout}>
        <LogoutSVG
          color={theme.colors.errorMain.value}
          width={24}
          height={24}
        />
        <Separator mr={12} />
        <Text variant="h6" color="$errorMain">
          Logout
        </Text>
      </LogoutContainer>
    </StyledHeader>
  );
}

const styles = {
  logoutText: css({}),
};

const LogoutContainer = styled("div", {
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  "& > *": {},
});
const StyledHeader = styled("header", {
  position: "fixed",
  background: "#FFFFFF",
  height: sizeConstant.headerHeight,
  width: "calc(100% - 260px)",
  zIndex: "$header",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingRight: 32,
  "&::after": {
    position: "absolute",
    content: "",
    width: "100%",
    height: 0.1,
    bottom: 0,
    boxShadow: "$inputElevation",
  },
});

const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  height: "100%",
  marginLeft: 40,
});

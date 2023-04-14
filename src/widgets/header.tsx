import sizeConstant from "@/constants/size.constant";
import { useSideNavigation } from "@/hooks/use-side-navigation";
import { useRouter } from "next/router";
import { Text } from "@/components/elements";
import * as React from "react";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";

export default function Header() {
  const { navigations } = useSideNavigation();
  const router = useRouter();

  const mappings = React.useMemo(() => {
    return [
      ...navigations,
      {
        href: "/",
        label: "Beranda",
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
        href: routeConstant.PurchaseView,
        label: "Detail Pembelian",
      },
    ];
  }, [navigations]);

  const headerMapper = React.useCallback(
    (path: string) => {
      const res = mappings.filter((mapping) => mapping.href === path);
      if (res.length) return res[0].label;
      return "";
    },
    [mappings]
  );

  return (
    <StyledHeader>
      <Container>
        <Text variant="h5">{headerMapper(router.pathname)}</Text>
      </Container>
    </StyledHeader>
  );
}

const StyledHeader = styled("header", {
  position: "fixed",
  background: "#FFFFFF",
  height: sizeConstant.headerHeight,
  width: "100%",
  zIndex: "$header",
  "&::after": {
    position: "absolute",
    content: "",
    width: "100%",
    height: 0.1,
    boxShadow: "$inputElevation",
  },
});

const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  height: "100%",
  marginLeft: 40,
});

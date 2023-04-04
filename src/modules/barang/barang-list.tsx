import { PlusSVG } from "@/common/assets";
import Separator from "@/components/common/separator";
import TableComponent, { IColumn } from "@/components/common/table";
import { Button, Text } from "@/components/elements";
import { styled, theme } from "@/config/stitches/theme.stitches";
import BarangListFilterForm from "./components/barang-list-filter-form";
import * as React from "react";
import routeConstant from "@/constants/route.constant";
import useComposedQuery from "@/hooks/use-composed-query";
import { useGetItems } from "@/api-hooks/item/item.query";
import useApplyQuerySort from "@/hooks/use-apply-query-sort";
import { string2money } from "@/utils/string";
import { useApplyQueryFilter } from "@/hooks/use-apply-query-filter";

export default function BarangList() {
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>();

  const _columns = React.useMemo<IColumn[]>(
    () => [
      {
        Header: "Kode",
        accessor: "code",
      },
      {
        Header: "Nama",
        accessor: "categoryItem.name",
      },
      {
        Header: "Merk",
        accessor: "categoryItem.brand",
      },
      {
        Header: "Ukuran",
        accessor: "size",
      },
      {
        Header: "Tebal",
        accessor: "thick",
      },
      {
        Header: "Warna",
        accessor: "color",
      },
      {
        Header: "Stok",
        accessor: "stock",
      },
      {
        Header: "Stok Minimum",
        accessor: "minimumStock",
      },
      {
        Header: "Harga Ecer",
        accessor: "retailPrice",
        Cell: ({ value }) => <>{value ? "Rp " + string2money(value) : ""}</>,
      },
      {
        Header: "Harga Grosir",
        accessor: "wholesalePrice",
        Cell: ({ value }) => <>{value ? "Rp " + string2money(value) : ""}</>,
      },
      {
        Header: "Satuan Kecil",
        accessor: "categoryItem.smallUnit",
      },
      {
        Header: "Satuan Besar",
        accessor: "categoryItem.bigUnit",
      },
      {
        Header: "Ketersediaan",
        accessor: "isAvailable",
        Cell: ({ value }) => <>{value ? "Tersedia" : "Tidak Tersedia"}</>,
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => <Text capitalize>{value}</Text>,
      },
      {
        Header: "",
        accessor: "detail",
        Cell: ({ row }) => {
          return (
            <Button
              href={{
                pathname: routeConstant.BarangBarangView,
                query: { id: row?.original?.id },
              }}
              size="small"
            >
              Detail
            </Button>
          );
        },
        stickyRight: true,
      },
    ],
    []
  );

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
    extras: [{ filters, setFilters }, { columns }],
  } = useComposedQuery(
    useGetItems,
    {
      params: {
        page,
        limit,
      },
    },
    {},
    useApplyQueryFilter((data: any) => {
      return data.filters;
    }),
    useApplyQuerySort((data: any) => {
      return data.sorts;
    }, _columns)
  );

  return (
    <Container>
      <BarangListFilterForm
        filters={filters}
        loading={isLoading || isFetching}
        setFilters={setFilters}
      />
      <TopContainer>
        <Button
          size="large"
          href={routeConstant.BarangCategoryCreate}
          startEnhancer={(size) => (
            <PlusSVG
              width={size}
              height={size}
              color={theme.colors.primaryContrast.value}
            />
          )}
        >
          TAMBAH KATEGORI
        </Button>
        <Separator mr={24} />
        <Button
          size="large"
          href={routeConstant.BarangBarangCreate}
          startEnhancer={(size) => (
            <PlusSVG
              width={size}
              height={size}
              color={theme.colors.primaryContrast.value}
            />
          )}
        >
          TAMBAH BARANG
        </Button>
      </TopContainer>
      <TableComponent
        columns={columns}
        data={data?.data || []}
        loading={isLoading || isFetching}
        meta={data?.meta}
        error={error}
        onRetry={refetch}
        page={page}
        setLimit={setLimit}
        setPage={setPage}
      />
    </Container>
  );
}

const Container = styled("div", {});

const TopContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  mb: 24,
});

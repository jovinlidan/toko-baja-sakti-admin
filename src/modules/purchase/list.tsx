import { PlusSVG } from "@/common/assets";
import TableComponent, { IColumn } from "@/components/common/table";
import { Button } from "@/components/elements";
import { styled, theme } from "@/config/stitches/theme.stitches";
import * as React from "react";
import routeConstant from "@/constants/route.constant";
import useComposedQuery from "@/hooks/use-composed-query";
import useApplyQuerySort from "@/hooks/use-apply-query-sort";
import { useApplyQueryFilter } from "@/hooks/use-apply-query-filter";
import { format } from "date-fns";
import PurchaseListFilterForm from "./components/purchase-list-filter-form";
import { useGetPurchases } from "@/api-hooks/purchase/purchase.query";
import { string2money } from "@/utils/string";

export default function PurchaseList() {
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>();

  const _columns = React.useMemo<IColumn[]>(
    () => [
      {
        Header: "Kode",
        accessor: "code",
      },
      {
        Header: "Nama Supplier",
        accessor: "purchaseOrder.supplier.name",
      },
      {
        Header: "Tanggal",
        accessor: "receivedDate",
        Cell: ({ value }) => <>{value ? format(value, "dd MMM yyyy") : "-"}</>,
      },
      {
        Header: "Total",
        accessor: "grandTotal",
        Cell: ({ value }) => <>Rp {string2money(value)}</>,
      },
      {
        Header: "",
        accessor: "detail",
        Cell: ({ row }) => {
          return (
            <Button
              href={{
                pathname: routeConstant.PurchaseView,
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
    useGetPurchases,
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
      <PurchaseListFilterForm
        filters={filters}
        loading={isLoading || isFetching}
        setFilters={setFilters}
      />
      <TopContainer>
        <Button
          size="large"
          href={routeConstant.PurchaseCreate}
          startEnhancer={(size) => (
            <PlusSVG
              width={size}
              height={size}
              color={theme.colors.primaryContrast.value}
            />
          )}
        >
          TAMBAH
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

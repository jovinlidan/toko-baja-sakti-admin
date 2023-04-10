import { PlusSVG } from "@/common/assets";
import TableComponent, { IColumn } from "@/components/common/table";
import { Button } from "@/components/elements";
import { styled, theme } from "@/config/stitches/theme.stitches";
import * as React from "react";
import routeConstant from "@/constants/route.constant";
import useComposedQuery from "@/hooks/use-composed-query";
import useApplyQuerySort from "@/hooks/use-apply-query-sort";
import { useApplyQueryFilter } from "@/hooks/use-apply-query-filter";
import { useGetSuppliers } from "@/api-hooks/supplier/supplier.query";
import SupplierListFilterForm from "./components/supplier-list-filter-form";

export default function SupplierList() {
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
        accessor: "name",
      },
      {
        Header: "Contact Person",
        accessor: "contactPerson",
        Cell: ({ value }) => <>{value ? value : "-"}</>,
      },
      {
        Header: "Alamat",
        accessor: "address.addressDetail",
        Cell: ({ value }) => <>{value ? value : "-"}</>,
        maxWidth: 200,
      },
      {
        Header: "No Handphone",
        accessor: "phone",
        Cell: ({ value }) => <>{value ? value : "-"}</>,
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({ value }) => <>{value ? value : "-"}</>,
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "",
        accessor: "detail",
        Cell: ({ row }) => {
          return (
            <Button
              href={{
                pathname: routeConstant.SupplierView,
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
    useGetSuppliers,
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
      <SupplierListFilterForm
        filters={filters}
        loading={isLoading || isFetching}
        setFilters={setFilters}
      />
      <TopContainer>
        <Button
          size="large"
          href={routeConstant.SupplierCreate}
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
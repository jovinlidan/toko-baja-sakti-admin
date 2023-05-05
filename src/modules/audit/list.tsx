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
import { useGetAdjustmentItems } from "@/api-hooks/adjustment-item/adjustment-item.query";
import AuditListFilterForm from "./components/audit-list-filter-form";
import { useGetAudits } from "@/api-hooks/audit/audit.query";

export default function ListAdjusmentItem() {
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>();

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
    extras: [{ filters, setFilters }, { columns: _columns }],
  } = useComposedQuery(
    useGetAudits,
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
    }, [])
  );
  const columns = React.useMemo<IColumn[]>(
    () => [
      {
        Header: "No",
        accessor: "id",
        Cell(value) {
          return (
            (value?.row?.index || 0) +
            ((data?.meta?.currentPage || 1) - 1) * (data?.meta?.perPage || 1) +
            1
          );
        },
      },
      {
        Header: "Menu",
        accessor: "menu",
      },
      {
        Header: "Event",
        accessor: "event",
      },
      {
        Header: "Waktu",
        accessor: "createdAt",
        Cell: ({ value }) => (
          <>{value ? format(value, "dd MMM yyyy HH:mm:ss") : "-"}</>
        ),
      },
      {
        Header: "",
        accessor: "detail",
        Cell: ({ row }) => {
          return (
            <Button
              href={{
                pathname: routeConstant.AuditView,
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
    [data?.meta?.currentPage, data?.meta?.perPage]
  );

  return (
    <Container>
      <AuditListFilterForm
        filters={filters}
        loading={isLoading || isFetching}
        setFilters={setFilters}
      />

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

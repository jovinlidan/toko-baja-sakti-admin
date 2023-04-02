import { useGetCategoryItems } from "@/api-hooks/category-item/category-item.query";
import TableComponent, { IColumn } from "@/components/common/table";
import { Button } from "@/components/elements";
import useApplyQuerySort from "@/hooks/use-apply-query-sort";
import useComposedQuery from "@/hooks/use-composed-query";
import * as React from "react";

export default function CategoryCreateTable() {
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
        Header: "Merk",
        accessor: "brand",
      },
      {
        Header: "Satuan Kecil",
        accessor: "smallUnit",
      },
      {
        Header: "Satuan Besar",
        accessor: "bigUnit",
      },
      {
        Header: "Konversi Satuan",
        accessor: "conversionUnit",
      },
      {
        Header: "",
        accessor: "detail",
        Cell: () => <Button size="small">Detail</Button>,
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
    extras: [
      // { filters, setFilters },
      { columns },
    ],
  } = useComposedQuery(
    useGetCategoryItems,
    {
      params: {
        page,
        limit,
      },
    },
    {},
    // useApplyQueryFilter((data) => {
    //   return data.filters;
    // }),
    useApplyQuerySort((data: any) => {
      return data.sorts;
    }, _columns)
  );

  return (
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
  );
}

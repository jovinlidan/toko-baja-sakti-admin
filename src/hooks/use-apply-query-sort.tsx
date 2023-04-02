import { Exact } from "@/common/repositories";
import { PaginationMeta, Sort } from "@/common/repositories/common.model";
import { IColumn } from "@/components/common/table";
import { useCallback, useMemo, useState } from "react";

function useApplyQuerySort<
  QueryData,
  QueryInput extends Exact<{ params: Exact<{ sort?: string | null }> }>
>(
  getSorterMeta: (data: QueryData) => Sort,
  columns: IColumn[],
  meta?: PaginationMeta
) {
  const [sort, setSort] = useState<Sort>();

  const currentSortValue = sort?.value || sort?.default;
  const key = currentSortValue?.replace(/^-(.*)$/g, "$1");

  const onColumnClick = useCallback(
    (column: any) => {
      if (sort && column?.sortName && sort.options.includes(column?.sortName)) {
        const modifier =
          key === column?.sortName && !currentSortValue?.startsWith("-", 0)
            ? "-"
            : "";
        setSort({
          ...sort,
          value: modifier + column?.sortName,
        });
      }
    },
    [currentSortValue, key, sort]
  );

  const sortedColumns = useMemo<IColumn[] | undefined>(
    () =>
      columns &&
      columns.map((column) => ({
        ...column,
        onSort: onColumnClick,
        isSorted: column?.sortName === key,
        isSortedDesc: currentSortValue?.startsWith("-", 0),
      })),
    [columns, onColumnClick, key, currentSortValue]
  );

  return {
    input: {
      params: {
        sort: sort?.value || undefined,
      },
    } as QueryInput,
    onSuccess(data: QueryData) {
      setSort(getSorterMeta(data));
    },
    extra: {
      columns: sortedColumns,
      meta,
    },
  };
}

export default useApplyQuerySort;

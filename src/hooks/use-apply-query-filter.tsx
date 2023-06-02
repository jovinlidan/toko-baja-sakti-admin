import { Exact } from "@/common/repositories";
import { Filter } from "@/common/repositories/common.model";
import { useState } from "react";
import qs from "qs";

export function useApplyQueryFilter<
  QueryData,
  QueryInput extends Exact<{ params: Exact<{ filter?: string | null }> }>
>(getFilterMeta: (data: QueryData) => Filter[] | undefined) {
  const [filters, setFilters] = useState<Filter[] | undefined>();
  const filter =
    filters &&
    filters.reduce((prev, next) => {
      if (
        (next.value !== undefined && next.value !== null) ||
        (next.default !== undefined && next.default !== null)
      ) {
        return {
          ...prev,
          [next.name]: next.value || next.default,
        };
      }
      return prev;
    }, {});

  return {
    input: {
      params: {
        filter: (filter as string) || {},
      },
    } as unknown as QueryInput,
    onSuccess(data: QueryData) {
      setFilters(getFilterMeta(data));
    },
    extra: {
      filters,
      setFilters,
    },
  };
}

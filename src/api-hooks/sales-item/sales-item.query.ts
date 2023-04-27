import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import { ApiError, ApiResult } from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { SalesItemLite, getSalesItemsInput } from "./sales-item.model";

export function useGetSalesItems(
  input?: getSalesItemsInput,
  options?: UseQueryOptions<ApiResult<SalesItemLite[]>, ApiError>
): UseQueryResult<ApiResult<SalesItemLite[]>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<SalesItemLite[]>, ApiError>(
      getSalesItemsKey(input),
      () =>
        QueryFetchFunction({
          url: `sales/${input?.id}/sales-items`,
        }),
      options
    ),
    SalesItemLite
  );
}

export function getSalesItemsKey(input?: getSalesItemsInput) {
  const keys: any[] = ["getSalesItems", input?.id];
  return keys;
}

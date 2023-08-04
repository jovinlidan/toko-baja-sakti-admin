import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import { ApiError, ApiResult } from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { StockMinimumNotification } from "./notification.model";

export function useGetStockMinimumNotification(
  options?: UseQueryOptions<ApiResult<StockMinimumNotification[]>, ApiError>
): UseQueryResult<ApiResult<StockMinimumNotification[]>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<StockMinimumNotification[]>, ApiError>(
      getStockMinimumNotification(),
      () =>
        QueryFetchFunction({
          url: `stock-minimum-notification`,
        }),
      options
    ),
    StockMinimumNotification
  );
}

export function getStockMinimumNotification() {
  const keys: any[] = ["getStockMinimumNotification"];
  return keys;
}

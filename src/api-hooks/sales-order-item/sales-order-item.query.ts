import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import { ApiError, ApiResult } from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import {
  getSalesOrderItemsInput,
  SalesOrderItemLite,
} from "./sales-order-item.model";

export function useGetSalesOrderItems(
  input?: getSalesOrderItemsInput,
  options?: UseQueryOptions<ApiResult<SalesOrderItemLite[]>, ApiError>
): UseQueryResult<ApiResult<SalesOrderItemLite[]>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<SalesOrderItemLite[]>, ApiError>(
      getSaleOrderItemsKey(input),
      () =>
        QueryFetchFunction({
          url: `sales-orders/${input?.id}/sales-order-items`,
        }),
      options
    ),
    SalesOrderItemLite
  );
}

export function getSaleOrderItemsKey(input?: getSalesOrderItemsInput) {
  const keys: any[] = ["getSalesOrderItems", input?.id];
  return keys;
}

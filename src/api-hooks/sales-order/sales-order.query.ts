import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  ExtendedApiResult,
} from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import {
  SalesOrder,
  SalesOrderLite,
  getSalesOrderInput,
  getSalesOrdersInput,
} from "./sales-order.model";

export function useGetSalesOrders(
  input?: getSalesOrdersInput,
  options?: UseQueryOptions<ExtendedApiResult<SalesOrderLite[]>, ApiError>
): UseQueryResult<ExtendedApiResult<SalesOrderLite[]>, ApiError> {
  return QueryTransformer(
    useQuery<ExtendedApiResult<SalesOrderLite[]>, ApiError>(
      getSalesOrdersKey(input),
      () =>
        QueryFetchFunction({
          url: `sales-orders`,
          params: input?.params,
        }),
      options
    ),
    SalesOrderLite
  );
}

export function getSalesOrdersKey(input?: getSalesOrdersInput) {
  const keys: any[] = ["getSalesOrders"];
  if (input) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetSalesOrder(
  input?: getSalesOrderInput,
  options?: UseQueryOptions<ApiResult<SalesOrder>, ApiError>
): UseQueryResult<ApiResult<SalesOrder>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<SalesOrder>, ApiError>(
      getSalesOrderKey(input),
      () =>
        QueryFetchFunction({
          url: `sales-orders/${input?.id}`,
        }),
      options
    ),
    SalesOrder
  );
}

export function getSalesOrderKey(input?: getSalesOrderInput) {
  const keys: any[] = ["getSalesOrder", input?.id];
  return keys;
}

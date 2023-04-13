import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  ExtendedApiResult,
} from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import {
  PurchaseOrder,
  PurchaseOrderLite,
  getPurchaseOrderInput,
  getPurchaseOrdersInput,
} from "./purchase-order.model";

export function useGetPurchaseOrders(
  input?: getPurchaseOrdersInput,
  options?: UseQueryOptions<ExtendedApiResult<PurchaseOrderLite[]>, ApiError>
): UseQueryResult<ExtendedApiResult<PurchaseOrderLite[]>, ApiError> {
  return QueryTransformer(
    useQuery<ExtendedApiResult<PurchaseOrderLite[]>, ApiError>(
      getPurchaseOrdersKey(input),
      () =>
        QueryFetchFunction({
          url: `purchase-orders`,
          params: input?.params,
        }),
      options
    ),
    PurchaseOrderLite
  );
}

export function getPurchaseOrdersKey(input?: getPurchaseOrdersInput) {
  const keys: any[] = ["getPurchaseOrders"];
  if (input) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetPurchaseOrder(
  input?: getPurchaseOrderInput,
  options?: UseQueryOptions<ApiResult<PurchaseOrder>, ApiError>
): UseQueryResult<ApiResult<PurchaseOrder>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<PurchaseOrder>, ApiError>(
      getPurchaseOrderKey(input),
      () =>
        QueryFetchFunction({
          url: `purchase-orders/${input?.id}`,
        }),
      options
    ),
    PurchaseOrder
  );
}

export function getPurchaseOrderKey(input?: getPurchaseOrderInput) {
  const keys: any[] = ["getPurchaseOrder", input?.id];
  return keys;
}

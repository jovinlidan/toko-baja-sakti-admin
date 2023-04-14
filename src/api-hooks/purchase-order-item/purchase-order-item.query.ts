import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import { ApiError, ApiResult } from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import {
  getPurchaseOrderItemsInput,
  PurchaseOrderItemLite,
} from "./purchase-order-item.model";

export function useGetPurchaseOrderItems(
  input?: getPurchaseOrderItemsInput,
  options?: UseQueryOptions<ApiResult<PurchaseOrderItemLite[]>, ApiError>
): UseQueryResult<ApiResult<PurchaseOrderItemLite[]>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<PurchaseOrderItemLite[]>, ApiError>(
      getPurchaseOrderItemsKey(input),
      () =>
        QueryFetchFunction({
          url: `purchase-orders/${input?.id}/purchase-order-items`,
        }),
      options
    ),
    PurchaseOrderItemLite
  );
}

export function getPurchaseOrderItemsKey(input?: getPurchaseOrderItemsInput) {
  const keys: any[] = ["getPurchaseOrders", input?.id];
  return keys;
}

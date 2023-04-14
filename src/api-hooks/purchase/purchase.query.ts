import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  ExtendedApiResult,
} from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import {
  Purchase,
  PurchaseLite,
  getPurchaseInput,
  getPurchasesInput,
} from "./purchase.model";

export function useGetPurchases(
  input?: getPurchasesInput,
  options?: UseQueryOptions<ExtendedApiResult<PurchaseLite[]>, ApiError>
): UseQueryResult<ExtendedApiResult<PurchaseLite[]>, ApiError> {
  return QueryTransformer(
    useQuery<ExtendedApiResult<PurchaseLite[]>, ApiError>(
      getPurchasesKey(input),
      () =>
        QueryFetchFunction({
          url: `purchase`,
          params: input?.params,
        }),
      options
    ),
    PurchaseLite
  );
}

export function getPurchasesKey(input?: getPurchasesInput) {
  const keys: any[] = ["getPurchases"];
  if (input) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetPurchase(
  input?: getPurchaseInput,
  options?: UseQueryOptions<ApiResult<Purchase>, ApiError>
): UseQueryResult<ApiResult<Purchase>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<Purchase>, ApiError>(
      getPurchaseKey(input),
      () =>
        QueryFetchFunction({
          url: `purchase/${input?.id}`,
        }),
      options
    ),
    Purchase
  );
}

export function getPurchaseKey(input?: getPurchaseInput) {
  const keys: any[] = ["getPurchase", input?.id];
  return keys;
}

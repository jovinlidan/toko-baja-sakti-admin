import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  ExtendedApiResult,
} from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { Sale, SaleLite, getSaleInput, getSalesInput } from "./sales.model";

export function useGetSales(
  input?: getSalesInput,
  options?: UseQueryOptions<ExtendedApiResult<SaleLite[]>, ApiError>
): UseQueryResult<ExtendedApiResult<SaleLite[]>, ApiError> {
  return QueryTransformer(
    useQuery<ExtendedApiResult<SaleLite[]>, ApiError>(
      getSalesKey(input),
      () =>
        QueryFetchFunction({
          url: `sales`,
          params: input?.params,
        }),
      options
    ),
    SaleLite
  );
}

export function getSalesKey(input?: getSalesInput) {
  const keys: any[] = ["getSales"];
  if (input) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetSale(
  input?: getSaleInput,
  options?: UseQueryOptions<ApiResult<Sale>, ApiError>
): UseQueryResult<ApiResult<Sale>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<Sale>, ApiError>(
      getSaleKey(input),
      () =>
        QueryFetchFunction({
          url: `sales/${input?.id}`,
        }),
      options
    ),
    Sale
  );
}

export function getSaleKey(input?: getSaleInput) {
  const keys: any[] = ["getSale", input?.id];
  return keys;
}

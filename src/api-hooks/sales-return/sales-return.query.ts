import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  ExtendedApiResult,
} from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import {
  SaleReturn,
  SaleReturnLite,
  getSaleReturnInput,
  getSaleReturnsInput,
} from "./sales-return.model";

export function useGetSaleReturns(
  input?: getSaleReturnsInput,
  options?: UseQueryOptions<ExtendedApiResult<SaleReturnLite[]>, ApiError>
): UseQueryResult<ExtendedApiResult<SaleReturnLite[]>, ApiError> {
  return QueryTransformer(
    useQuery<ExtendedApiResult<SaleReturnLite[]>, ApiError>(
      getSaleReturnsKey(input),
      () =>
        QueryFetchFunction({
          url: `sales-returns`,
          params: input?.params,
        }),
      options
    ),
    SaleReturnLite
  );
}

export function getSaleReturnsKey(input?: getSaleReturnsInput) {
  const keys: any[] = ["getSaleReturns"];
  if (input) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetSaleReturn(
  input?: getSaleReturnInput,
  options?: UseQueryOptions<ApiResult<SaleReturn>, ApiError>
): UseQueryResult<ApiResult<SaleReturn>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<SaleReturn>, ApiError>(
      getSaleReturnKey(input),
      () =>
        QueryFetchFunction({
          url: `sales-returns/${input?.id}`,
        }),
      options
    ),
    SaleReturn
  );
}

export function getSaleReturnKey(input?: getSaleReturnInput) {
  const keys: any[] = ["getSaleReturn", input?.id];
  return keys;
}

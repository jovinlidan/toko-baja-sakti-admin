import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  ExtendedApiResult,
} from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import {
  Supplier,
  SupplierLite,
  getSupplierInput,
  getSuppliersInput,
} from "./supplier.model";

export function useGetSuppliers(
  input?: getSuppliersInput,
  options?: UseQueryOptions<ExtendedApiResult<SupplierLite[]>, ApiError>
): UseQueryResult<ExtendedApiResult<SupplierLite[]>, ApiError> {
  return QueryTransformer(
    useQuery<ExtendedApiResult<SupplierLite[]>, ApiError>(
      getSuppliersKey(input),
      () =>
        QueryFetchFunction({
          url: `suppliers`,
          params: input?.params,
        }),
      options
    ),
    SupplierLite
  );
}

export function getSuppliersKey(input?: getSuppliersInput) {
  const keys: any[] = ["getSuppliers"];
  if (input) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetSupplier(
  input?: getSupplierInput,
  options?: UseQueryOptions<ApiResult<Supplier>, ApiError>
): UseQueryResult<ApiResult<Supplier>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<Supplier>, ApiError>(
      getSupplierKey(input),
      () =>
        QueryFetchFunction({
          url: `suppliers/${input?.id}`,
        }),
      options
    ),
    Supplier
  );
}

export function getSupplierKey(input?: getSupplierInput) {
  const keys: any[] = ["getSupplier", input?.id];
  return keys;
}

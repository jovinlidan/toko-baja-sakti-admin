import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  ExtendedApiResult,
} from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { Brand, BrandLite, getBrandInput, getBrandsInput } from "./brand.model";

export function useGetBrands(
  input?: getBrandsInput,
  options?: UseQueryOptions<ExtendedApiResult<BrandLite[]>, ApiError>
): UseQueryResult<ExtendedApiResult<BrandLite[]>, ApiError> {
  return QueryTransformer(
    useQuery<ExtendedApiResult<BrandLite[]>, ApiError>(
      getBrandsKey(input),
      () =>
        QueryFetchFunction({
          url: `brands`,
          params: input?.params,
        }),
      options
    ),
    BrandLite
  );
}

export function getBrandsKey(input?: getBrandsInput) {
  const keys: any[] = ["getBrands"];
  if (input) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetBrand(
  input?: getBrandInput,
  options?: UseQueryOptions<ApiResult<Brand>, ApiError>
): UseQueryResult<ApiResult<Brand>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<Brand>, ApiError>(
      getBrandKey(input),
      () =>
        QueryFetchFunction({
          url: `brands/${input?.id}`,
        }),
      options
    ),
    Brand
  );
}

export function getBrandKey(input?: getBrandInput) {
  const keys: any[] = ["getBrand", input?.id];
  return keys;
}

import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  ExtendedApiResult,
} from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import {
  CategoryItem,
  CategoryItemLite,
  getCategoryItemInput,
  getCategoryItemsInput,
} from "./category-item.model";

export function useGetCategoryItems(
  input?: getCategoryItemsInput,
  options?: UseQueryOptions<ExtendedApiResult<CategoryItemLite[]>, ApiError>
): UseQueryResult<ExtendedApiResult<CategoryItemLite[]>, ApiError> {
  return QueryTransformer(
    useQuery<ExtendedApiResult<CategoryItemLite[]>, ApiError>(
      getCategoryItemsKey(input),
      () =>
        QueryFetchFunction({
          url: `category-items`,
          params: input?.params,
        }),
      options
    ),
    CategoryItemLite
  );
}

export function getCategoryItemsKey(input?: getCategoryItemsInput) {
  const keys: any[] = ["getCategoryItems"];
  if (input) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetCategoryItem(
  input?: getCategoryItemInput,
  options?: UseQueryOptions<ApiResult<CategoryItem>, ApiError>
): UseQueryResult<ApiResult<CategoryItem>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<CategoryItem>, ApiError>(
      getCategoryItemKey(input),
      () =>
        QueryFetchFunction({
          url: `category-items/${input?.categoryId}`,
        }),
      options
    ),
    CategoryItem
  );
}

export function getCategoryItemKey(input?: getCategoryItemInput) {
  const keys: any[] = ["getCategoryItem", input?.categoryId];
  return keys;
}

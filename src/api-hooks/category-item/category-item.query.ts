import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import {
  ApiError,
  ExtendedApiResult,
} from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { CategoryItemLite, getCategoryItemsInput } from "./category-item.model";

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

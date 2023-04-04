import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  ExtendedApiResult,
} from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { Item, ItemLite, getItemInput, getItemsInput } from "./item.model";

export function useGetItems(
  input?: getItemsInput,
  options?: UseQueryOptions<ExtendedApiResult<ItemLite[]>, ApiError>
): UseQueryResult<ExtendedApiResult<ItemLite[]>, ApiError> {
  return QueryTransformer(
    useQuery<ExtendedApiResult<ItemLite[]>, ApiError>(
      getItemsKey(input),
      () =>
        QueryFetchFunction({
          url: `items`,
          params: input?.params,
        }),
      options
    ),
    ItemLite
  );
}

export function getItemsKey(input?: getItemsInput) {
  const keys: any[] = ["getItems"];
  if (input) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetItem(
  input?: getItemInput,
  options?: UseQueryOptions<ApiResult<Item>, ApiError>
): UseQueryResult<ApiResult<Item>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<Item>, ApiError>(
      getItemKey(input),
      () =>
        QueryFetchFunction({
          url: `items/${input?.itemId}`,
        }),
      options
    ),
    Item
  );
}

export function getItemKey(input?: getItemInput) {
  const keys: any[] = ["getItem", input?.itemId];
  return keys;
}

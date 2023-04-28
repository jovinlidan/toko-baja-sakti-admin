import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  ExtendedApiResult,
} from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import {
  getAdjustmentItemsInput,
  getAdjustmentItemInput,
  AdjustmentItemLite,
  AdjustmentItem,
} from "./adjustment-item.model";

export function useGetAdjustmentItems(
  input?: getAdjustmentItemsInput,
  options?: UseQueryOptions<ExtendedApiResult<AdjustmentItemLite[]>, ApiError>
): UseQueryResult<ExtendedApiResult<AdjustmentItemLite[]>, ApiError> {
  return QueryTransformer(
    useQuery<ExtendedApiResult<AdjustmentItemLite[]>, ApiError>(
      getAdjustmentItemsKey(input),
      () =>
        QueryFetchFunction({
          url: `adjustment-items`,
          params: input?.params,
        }),
      options
    ),
    AdjustmentItemLite
  );
}

export function getAdjustmentItemsKey(input?: getAdjustmentItemsInput) {
  const keys: any[] = ["getAdjustmentItems"];
  if (input) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetAdjustmentItem(
  input?: getAdjustmentItemInput,
  options?: UseQueryOptions<ApiResult<AdjustmentItem>, ApiError>
): UseQueryResult<ApiResult<AdjustmentItem>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<AdjustmentItem>, ApiError>(
      getAdjustmentItemKey(input),
      () =>
        QueryFetchFunction({
          url: `adjustment-items/${input?.id}`,
        }),
      options
    ),
    AdjustmentItem
  );
}

export function getAdjustmentItemKey(input?: getAdjustmentItemInput) {
  const keys: any[] = ["getAdjustmentItem", input?.id];
  return keys;
}

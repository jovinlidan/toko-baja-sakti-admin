import { MutationFetchFunction } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  MessageResult,
} from "@/common/repositories/common.model";
import { useMutation, UseMutationOptions } from "react-query";
import {
  Item,
  ItemLite,
  CreateItemInput,
  DeleteItemInput,
  UpdateItemInput,
} from "./item.model";

export function useCreateItem(
  options?: UseMutationOptions<ApiResult<Item>, ApiError, CreateItemInput>
) {
  return useMutation<ApiResult<Item>, ApiError, CreateItemInput>(
    async function ({ body }) {
      return await MutationFetchFunction({
        url: "items",
        method: "POST",
        classType: Item,
        body,
      });
    },
    options
  );
}

export function useDeleteItem(
  options?: UseMutationOptions<MessageResult, ApiError, DeleteItemInput>
) {
  return useMutation<MessageResult, ApiError, DeleteItemInput>(async function ({
    id,
  }) {
    return await MutationFetchFunction({
      url: `items/${id}`,
      method: "DELETE",
    });
  },
  options);
}

export function useUpdateItem(
  options?: UseMutationOptions<ApiResult<Item>, ApiError, UpdateItemInput>
) {
  return useMutation<ApiResult<Item>, ApiError, UpdateItemInput>(
    async function ({ body, id }) {
      return await MutationFetchFunction({
        url: `items/${id}`,
        method: "PUT",
        classType: Item,
        body,
      });
    },
    options
  );
}

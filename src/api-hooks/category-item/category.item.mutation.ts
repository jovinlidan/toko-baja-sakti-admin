import { MutationFetchFunction } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  MessageResult,
} from "@/common/repositories/common.model";
import { useMutation, UseMutationOptions } from "react-query";
import {
  CategoryItemLite,
  CreateCategoryItemInput,
  DeleteCategoryItemInput,
} from "./category-item.model";

export function useCreateCategoryItem(
  options?: UseMutationOptions<
    ApiResult<CategoryItemLite>,
    ApiError,
    CreateCategoryItemInput
  >
) {
  return useMutation<
    ApiResult<CategoryItemLite>,
    ApiError,
    CreateCategoryItemInput
  >(async function ({ body }) {
    return await MutationFetchFunction({
      url: "category-items",
      method: "POST",
      classType: CategoryItemLite,
      body,
    });
  }, options);
}

export function useDeleteCategoryItem(
  options?: UseMutationOptions<MessageResult, ApiError, DeleteCategoryItemInput>
) {
  return useMutation<MessageResult, ApiError, DeleteCategoryItemInput>(
    async function ({ categoryId }) {
      return await MutationFetchFunction({
        url: `category-items/${categoryId}`,
        method: "DELETE",
      });
    },
    options
  );
}

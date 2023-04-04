import { MutationFetchFunction } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  MessageResult,
} from "@/common/repositories/common.model";
import { useMutation, UseMutationOptions } from "react-query";
import {
  CategoryItem,
  CategoryItemLite,
  CreateCategoryItemInput,
  DeleteCategoryItemInput,
  UpdateCategoryItemInput,
} from "./category-item.model";

export function useCreateCategoryItem(
  options?: UseMutationOptions<
    ApiResult<CategoryItem>,
    ApiError,
    CreateCategoryItemInput
  >
) {
  return useMutation<
    ApiResult<CategoryItem>,
    ApiError,
    CreateCategoryItemInput
  >(async function ({ body }) {
    return await MutationFetchFunction({
      url: "category-items",
      method: "POST",
      classType: CategoryItem,
      body,
    });
  }, options);
}

export function useDeleteCategoryItem(
  options?: UseMutationOptions<MessageResult, ApiError, DeleteCategoryItemInput>
) {
  return useMutation<MessageResult, ApiError, DeleteCategoryItemInput>(
    async function ({ id }) {
      return await MutationFetchFunction({
        url: `category-items/${id}`,
        method: "DELETE",
      });
    },
    options
  );
}

export function useUpdateCategoryItem(
  options?: UseMutationOptions<
    ApiResult<CategoryItem>,
    ApiError,
    UpdateCategoryItemInput
  >
) {
  return useMutation<
    ApiResult<CategoryItem>,
    ApiError,
    UpdateCategoryItemInput
  >(async function ({ body, id }) {
    return await MutationFetchFunction({
      url: `category-items/${id}`,
      method: "PUT",
      classType: CategoryItem,
      body,
    });
  }, options);
}

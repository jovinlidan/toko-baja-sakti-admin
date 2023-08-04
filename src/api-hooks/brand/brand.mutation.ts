import { MutationFetchFunction } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  MessageResult,
} from "@/common/repositories/common.model";
import { useMutation, UseMutationOptions } from "react-query";
import {
  Brand,
  CreateBrandInput,
  DeleteBrandInput,
  UpdateBrandInput,
} from "./brand.model";

export function useCreateBrand(
  options?: UseMutationOptions<ApiResult<Brand>, ApiError, CreateBrandInput>
) {
  return useMutation<ApiResult<Brand>, ApiError, CreateBrandInput>(
    async function ({ body }) {
      return await MutationFetchFunction({
        url: "brands",
        method: "POST",
        classType: Brand,
        body,
      });
    },
    options
  );
}

export function useDeleteBrand(
  options?: UseMutationOptions<MessageResult, ApiError, DeleteBrandInput>
) {
  return useMutation<MessageResult, ApiError, DeleteBrandInput>(
    async function ({ params }) {
      return await MutationFetchFunction({
        url: `brands/${params?.id}`,
        method: "DELETE",
      });
    },
    options
  );
}

export function useUpdateBrand(
  options?: UseMutationOptions<ApiResult<Brand>, ApiError, UpdateBrandInput>
) {
  return useMutation<ApiResult<Brand>, ApiError, UpdateBrandInput>(
    async function ({ body, params }) {
      return await MutationFetchFunction({
        url: `brands/${params?.id}`,
        method: "PUT",
        classType: Brand,
        body,
      });
    },
    options
  );
}

import { MutationFetchFunction } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  MessageResult,
} from "@/common/repositories/common.model";
import { useMutation, UseMutationOptions } from "react-query";
import {
  Sale,
  CreateSaleInput,
  DeleteSaleInput,
  UpdateSaleInput,
} from "./sales.model";

export function useCreateSale(
  options?: UseMutationOptions<ApiResult<Sale>, ApiError, CreateSaleInput>
) {
  return useMutation<ApiResult<Sale>, ApiError, CreateSaleInput>(
    async function ({ body }) {
      return await MutationFetchFunction({
        url: "sales",
        method: "POST",
        classType: Sale,
        body,
      });
    },
    options
  );
}

export function useDeleteSale(
  options?: UseMutationOptions<MessageResult, ApiError, DeleteSaleInput>
) {
  return useMutation<MessageResult, ApiError, DeleteSaleInput>(async function ({
    id,
  }) {
    return await MutationFetchFunction({
      url: `sales/${id}`,
      method: "DELETE",
    });
  },
  options);
}

export function useUpdateSale(
  options?: UseMutationOptions<ApiResult<Sale>, ApiError, UpdateSaleInput>
) {
  return useMutation<ApiResult<Sale>, ApiError, UpdateSaleInput>(
    async function ({ body, id }) {
      return await MutationFetchFunction({
        url: `sales/${id}`,
        method: "PUT",
        classType: Sale,
        body,
      });
    },
    options
  );
}

import { MutationFetchFunction } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  MessageResult,
} from "@/common/repositories/common.model";
import { useMutation, UseMutationOptions } from "react-query";
import {
  Purchase,
  CreatePurchaseInput,
  DeletePurchaseInput,
  UpdatePurchaseInput,
} from "./purchase.model";

export function useCreatePurchase(
  options?: UseMutationOptions<
    ApiResult<Purchase>,
    ApiError,
    CreatePurchaseInput
  >
) {
  return useMutation<ApiResult<Purchase>, ApiError, CreatePurchaseInput>(
    async function ({ body }) {
      return await MutationFetchFunction({
        url: "purchase",
        method: "POST",
        classType: Purchase,
        body,
      });
    },
    options
  );
}

export function useDeletePurchase(
  options?: UseMutationOptions<MessageResult, ApiError, DeletePurchaseInput>
) {
  return useMutation<MessageResult, ApiError, DeletePurchaseInput>(
    async function ({ id }) {
      return await MutationFetchFunction({
        url: `purchase/${id}`,
        method: "DELETE",
      });
    },
    options
  );
}

export function useUpdatePurchase(
  options?: UseMutationOptions<
    ApiResult<Purchase>,
    ApiError,
    UpdatePurchaseInput
  >
) {
  return useMutation<ApiResult<Purchase>, ApiError, UpdatePurchaseInput>(
    async function ({ body, id }) {
      return await MutationFetchFunction({
        url: `purchase/${id}`,
        method: "PUT",
        classType: Purchase,
        body,
      });
    },
    options
  );
}

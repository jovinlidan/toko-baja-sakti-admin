import { MutationFetchFunction } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  MessageResult,
} from "@/common/repositories/common.model";
import { useMutation, UseMutationOptions } from "react-query";
import {
  PurchaseOrder,
  CreatePurchaseOrderInput,
  DeletePurchaseOrderInput,
  UpdatePurchaseOrderInput,
} from "./purchase-order.model";

export function useCreatePurchaseOrder(
  options?: UseMutationOptions<
    ApiResult<PurchaseOrder>,
    ApiError,
    CreatePurchaseOrderInput
  >
) {
  return useMutation<
    ApiResult<PurchaseOrder>,
    ApiError,
    CreatePurchaseOrderInput
  >(async function ({ body }) {
    return await MutationFetchFunction({
      url: "purchase-orders",
      method: "POST",
      classType: PurchaseOrder,
      body,
    });
  }, options);
}

export function useDeletePurchaseOrder(
  options?: UseMutationOptions<
    MessageResult,
    ApiError,
    DeletePurchaseOrderInput
  >
) {
  return useMutation<MessageResult, ApiError, DeletePurchaseOrderInput>(
    async function ({ id }) {
      return await MutationFetchFunction({
        url: `purchase-orders/${id}`,
        method: "DELETE",
      });
    },
    options
  );
}

export function useUpdatePurchaseOrder(
  options?: UseMutationOptions<
    ApiResult<PurchaseOrder>,
    ApiError,
    UpdatePurchaseOrderInput
  >
) {
  return useMutation<
    ApiResult<PurchaseOrder>,
    ApiError,
    UpdatePurchaseOrderInput
  >(async function ({ body, id }) {
    return await MutationFetchFunction({
      url: `purchase-orders/${id}`,
      method: "PUT",
      classType: PurchaseOrder,
      body,
    });
  }, options);
}

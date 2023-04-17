import { MutationFetchFunction } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  MessageResult,
} from "@/common/repositories/common.model";
import { useMutation, UseMutationOptions } from "react-query";
import {
  SalesOrder,
  CreateSalesOrderInput,
  DeleteSalesOrderInput,
  UpdateSalesOrderInput,
} from "./sales-order.model";

export function useCreateSalesOrder(
  options?: UseMutationOptions<
    ApiResult<SalesOrder>,
    ApiError,
    CreateSalesOrderInput
  >
) {
  return useMutation<ApiResult<SalesOrder>, ApiError, CreateSalesOrderInput>(
    async function ({ body }) {
      return await MutationFetchFunction({
        url: "sales-orders",
        method: "POST",
        classType: SalesOrder,
        body,
      });
    },
    options
  );
}

export function useDeleteSalesOrder(
  options?: UseMutationOptions<MessageResult, ApiError, DeleteSalesOrderInput>
) {
  return useMutation<MessageResult, ApiError, DeleteSalesOrderInput>(
    async function ({ id }) {
      return await MutationFetchFunction({
        url: `sales-orders/${id}`,
        method: "DELETE",
      });
    },
    options
  );
}

export function useUpdateSalesOrder(
  options?: UseMutationOptions<
    ApiResult<SalesOrder>,
    ApiError,
    UpdateSalesOrderInput
  >
) {
  return useMutation<ApiResult<SalesOrder>, ApiError, UpdateSalesOrderInput>(
    async function ({ body, id }) {
      return await MutationFetchFunction({
        url: `sales-orders/${id}`,
        method: "PUT",
        classType: SalesOrder,
        body,
      });
    },
    options
  );
}

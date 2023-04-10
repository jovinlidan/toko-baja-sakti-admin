import { MutationFetchFunction } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  MessageResult,
} from "@/common/repositories/common.model";
import { useMutation, UseMutationOptions } from "react-query";
import {
  Supplier,
  CreateSupplierInput,
  DeleteSupplierInput,
  UpdateSupplierInput,
} from "./supplier.model";

export function useCreateSupplier(
  options?: UseMutationOptions<
    ApiResult<Supplier>,
    ApiError,
    CreateSupplierInput
  >
) {
  return useMutation<ApiResult<Supplier>, ApiError, CreateSupplierInput>(
    async function ({ body }) {
      return await MutationFetchFunction({
        url: "suppliers",
        method: "POST",
        classType: Supplier,
        body,
      });
    },
    options
  );
}

export function useDeleteSupplier(
  options?: UseMutationOptions<MessageResult, ApiError, DeleteSupplierInput>
) {
  return useMutation<MessageResult, ApiError, DeleteSupplierInput>(
    async function ({ id }) {
      return await MutationFetchFunction({
        url: `suppliers/${id}`,
        method: "DELETE",
      });
    },
    options
  );
}

export function useUpdateSupplier(
  options?: UseMutationOptions<
    ApiResult<Supplier>,
    ApiError,
    UpdateSupplierInput
  >
) {
  return useMutation<ApiResult<Supplier>, ApiError, UpdateSupplierInput>(
    async function ({ body, id }) {
      return await MutationFetchFunction({
        url: `suppliers/${id}`,
        method: "PUT",
        classType: Supplier,
        body,
      });
    },
    options
  );
}

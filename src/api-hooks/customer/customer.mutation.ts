import { MutationFetchFunction } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  MessageResult,
} from "@/common/repositories/common.model";
import { useMutation, UseMutationOptions } from "react-query";
import {
  Customer,
  CustomerLite,
  CreateCustomerInput,
  DeleteCustomerInput,
  UpdateCustomerInput,
} from "./customer.model";

export function useCreateCustomer(
  options?: UseMutationOptions<
    ApiResult<Customer>,
    ApiError,
    CreateCustomerInput
  >
) {
  return useMutation<ApiResult<Customer>, ApiError, CreateCustomerInput>(
    async function ({ body }) {
      return await MutationFetchFunction({
        url: "users",
        method: "POST",
        classType: Customer,
        body,
      });
    },
    options
  );
}

export function useDeleteCustomer(
  options?: UseMutationOptions<MessageResult, ApiError, DeleteCustomerInput>
) {
  return useMutation<MessageResult, ApiError, DeleteCustomerInput>(
    async function ({ id }) {
      return await MutationFetchFunction({
        url: `users/${id}`,
        method: "DELETE",
      });
    },
    options
  );
}

export function useUpdateCustomer(
  options?: UseMutationOptions<
    ApiResult<Customer>,
    ApiError,
    UpdateCustomerInput
  >
) {
  return useMutation<ApiResult<Customer>, ApiError, UpdateCustomerInput>(
    async function ({ body, id }) {
      return await MutationFetchFunction({
        url: `users/${id}`,
        method: "PUT",
        classType: Customer,
        body,
      });
    },
    options
  );
}

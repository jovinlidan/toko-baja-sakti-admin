import { MutationFetchFunction } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  MessageResult,
} from "@/common/repositories/common.model";
import { useMutation, UseMutationOptions } from "react-query";
import {
  SaleReturn,
  CreateSaleReturnInput,
  DeleteSaleReturnInput,
  UpdateSaleReturnInput,
} from "./sales-return.model";

export function useCreateSaleReturn(
  options?: UseMutationOptions<
    ApiResult<SaleReturn>,
    ApiError,
    CreateSaleReturnInput
  >
) {
  return useMutation<ApiResult<SaleReturn>, ApiError, CreateSaleReturnInput>(
    async function ({ body }) {
      return await MutationFetchFunction({
        url: "sales-returns",
        method: "POST",
        classType: SaleReturn,
        body,
      });
    },
    options
  );
}

export function useDeleteSaleReturn(
  options?: UseMutationOptions<MessageResult, ApiError, DeleteSaleReturnInput>
) {
  return useMutation<MessageResult, ApiError, DeleteSaleReturnInput>(
    async function ({ id }) {
      return await MutationFetchFunction({
        url: `sales-returns/${id}`,
        method: "DELETE",
      });
    },
    options
  );
}

export function useUpdateSaleReturn(
  options?: UseMutationOptions<
    ApiResult<SaleReturn>,
    ApiError,
    UpdateSaleReturnInput
  >
) {
  return useMutation<ApiResult<SaleReturn>, ApiError, UpdateSaleReturnInput>(
    async function ({ body, id }) {
      return await MutationFetchFunction({
        url: `sales-returns/${id}`,
        method: "PUT",
        classType: SaleReturn,
        body,
      });
    },
    options
  );
}

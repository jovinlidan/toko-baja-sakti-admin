import { MutationFetchFunction } from "@/common/helpers/common";
import { ApiError, ApiResult } from "@/common/repositories/common.model";
import { useMutation, UseMutationOptions } from "react-query";
import {
  CreateAdjustmentItemInput,
  AdjustmentItem,
} from "./adjustment-item.model";

export function useCreateAdjustmentItem(
  options?: UseMutationOptions<
    ApiResult<AdjustmentItem>,
    ApiError,
    CreateAdjustmentItemInput
  >
) {
  return useMutation<
    ApiResult<AdjustmentItem>,
    ApiError,
    CreateAdjustmentItemInput
  >(async function ({ body }) {
    return await MutationFetchFunction({
      url: "adjustment-items",
      method: "POST",
      classType: AdjustmentItem,
      body,
    });
  }, options);
}

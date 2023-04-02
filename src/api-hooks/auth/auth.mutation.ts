import { MutationFetchFunction } from "@/common/helpers/common";
import { ApiError, ApiResult } from "@/common/repositories/common.model";
import { useMutation, UseMutationOptions } from "react-query";
import { LoginInput, TokenResult } from "./auth.model";

export function useLogin(
  options?: UseMutationOptions<ApiResult<TokenResult>, ApiError, LoginInput>
) {
  return useMutation<ApiResult<TokenResult>, ApiError, LoginInput>(
    async function ({ body }) {
      return await MutationFetchFunction({
        url: "auth/login",
        method: "POST",
        body,
        classType: TokenResult,
      });
    },
    options
  );
}

import { MutationFetchFunction } from "@/common/helpers/common";
import { ApiError, ApiResult } from "@/common/repositories/common.model";
import { useMutation, UseMutationOptions } from "react-query";
import { LoginInput, TokenResult } from "./auth.model";
import { decamelizeKeys } from "humps";
import { client } from "@/hooks/use-ky";
import toApiError from "@/common/repositories/to-api-error";

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

export function getRefreshToken(body?: any): Promise<ApiResult<TokenResult>> {
  return new Promise(async (resolve, reject) => {
    const newBody = body ? decamelizeKeys(body) : undefined;

    try {
      resolve(
        await client("auth/refresh", {
          method: "POST",
          headers: {
            "x-client-fe-retry": "1",
          },
          ...(newBody
            ? {
                json: newBody,
              }
            : {}),
        }).json()
      );
    } catch (e: any) {
      reject(await toApiError(e));
    }
  });
}

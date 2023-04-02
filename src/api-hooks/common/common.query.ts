import { QueryFetchFunction } from "@/common/helpers/common";
import {
  ApiError,
  EnumResult,
  getEnumsInput,
} from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

export function useGetEnums(
  input?: getEnumsInput,
  options?: UseQueryOptions<EnumResult[], ApiError>
): UseQueryResult<EnumResult[], ApiError> {
  return useQuery<EnumResult[], ApiError>(
    ["getEnums", input?.class],
    () =>
      QueryFetchFunction({
        url: `enums/${input?.class}`,
      }),
    options
  );
}

export function getEnumsKey(input?: getEnumsInput) {
  return ["getEnums", input?.class];
}

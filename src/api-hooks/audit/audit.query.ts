import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  ExtendedApiResult,
} from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { Audit, AuditLite, getAuditInput, getAuditsInput } from "./audit.model";

export function useGetAudits(
  input?: getAuditsInput,
  options?: UseQueryOptions<ExtendedApiResult<AuditLite[]>, ApiError>
): UseQueryResult<ExtendedApiResult<AuditLite[]>, ApiError> {
  return QueryTransformer(
    useQuery<ExtendedApiResult<AuditLite[]>, ApiError>(
      getAuditsKey(input),
      () =>
        QueryFetchFunction({
          url: `audits`,
          params: input?.params,
        }),
      options
    ),
    AuditLite
  );
}

export function getAuditsKey(input?: getAuditsInput) {
  const keys: any[] = ["getAudits"];
  if (input) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetAudit(
  input?: getAuditInput,
  options?: UseQueryOptions<ApiResult<Audit>, ApiError>
): UseQueryResult<ApiResult<Audit>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<Audit>, ApiError>(
      getAuditKey(input),
      () =>
        QueryFetchFunction({
          url: `audits/${input?.id}`,
        }),
      options
    ),
    Audit
  );
}

export function getAuditKey(input?: getAuditInput) {
  const keys: any[] = ["getAudit", input?.id];
  return keys;
}

import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import { ApiError, ApiResult } from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { Overview } from "./overview.model";

export function useGetOverview(
  options?: UseQueryOptions<Overview, ApiError>
): UseQueryResult<Overview, ApiError> {
  return QueryTransformer(
    useQuery<Overview, ApiError>(
      getOverviewKey(),
      () =>
        QueryFetchFunction({
          url: `overview`,
        }),
      options
    ),
    Overview
  );
}

export function getOverviewKey() {
  const keys: any[] = ["getOverview"];
  return keys;
}

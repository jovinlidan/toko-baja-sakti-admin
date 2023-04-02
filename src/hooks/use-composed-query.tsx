import { ApiError } from "@/common/repositories/common.model";
import { UseQueryOptions } from "react-query";
import merge from "ts-deepmerge";

type ComposedVariable<QueryData, QueryInput, Extra> = Pick<
  UseQueryOptions<QueryData, ApiError>,
  "onSuccess" | "onError"
> & { input: QueryInput } & { extra: Extra };

export default function useComposedQuery<
  QueryData,
  QueryInput extends AppliedQueryInput,
  QueryResult,
  AppliedQueryInput,
  Extra,
  ComposedQueryVariables extends ComposedVariable<
    QueryData,
    AppliedQueryInput,
    Extra
  >[]
>(
  useQuery: (
    input?: QueryInput,
    baseOptions?: UseQueryOptions<QueryData, ApiError>
  ) => QueryResult,
  input?: QueryInput,
  baseOptions?: UseQueryOptions<QueryData, ApiError>,
  ...composedVariables: ComposedQueryVariables
) {
  const params = merge(
    input || {},
    ...composedVariables.map((v) => v.input || {})
  ) as QueryInput;
  const result = useQuery(
    {
      ...params,
    },
    {
      ...baseOptions,
      onSuccess(...args) {
        composedVariables.map(({ onSuccess }) => {
          onSuccess && onSuccess(...args);
          baseOptions?.onSuccess?.(...args);
        });
      },
      onError(...args) {
        composedVariables.map(({ onError }) => {
          onError && onError(...args);
          baseOptions?.onError?.(...args);
        });
      },
    }
  );
  const extras = composedVariables.map((v) => v.extra) as {
    [Key in keyof ComposedQueryVariables]: ComposedQueryVariables[Key] extends ComposedVariable<
      QueryData,
      QueryInput,
      infer U
    >
      ? U
      : any;
  };
  return {
    ...result,
    extras,
  };
}

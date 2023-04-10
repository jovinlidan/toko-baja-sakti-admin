import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  ExtendedApiResult,
} from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { City, CityLite, getCitiesInput, getCityInput } from "./city.model";

export function useGetCities(
  input?: getCitiesInput,
  options?: UseQueryOptions<ExtendedApiResult<CityLite[]>, ApiError>
): UseQueryResult<ExtendedApiResult<CityLite[]>, ApiError> {
  return QueryTransformer(
    useQuery<ExtendedApiResult<CityLite[]>, ApiError>(
      getCitiesKey(input),
      () =>
        QueryFetchFunction({
          url: `cities`,
          params: input?.params,
        }),
      options
    ),
    CityLite
  );
}

export function getCitiesKey(input?: getCitiesInput) {
  const keys: any[] = ["getCities"];
  if (input) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetCity(
  input?: getCityInput,
  options?: UseQueryOptions<ApiResult<City>, ApiError>
): UseQueryResult<ApiResult<City>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<City>, ApiError>(
      getCityKey(input),
      () =>
        QueryFetchFunction({
          url: `cities/${input?.id}`,
        }),
      options
    ),
    City
  );
}

export function getCityKey(input?: getCityInput) {
  const keys: any[] = ["getCity", input?.id];
  return keys;
}

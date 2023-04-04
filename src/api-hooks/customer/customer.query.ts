import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import {
  ApiError,
  ApiResult,
  ExtendedApiResult,
} from "@/common/repositories/common.model";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import {
  Customer,
  CustomerLite,
  getCustomerInput,
  getCustomersInput,
} from "./customer.model";

export function useGetCustomers(
  input?: getCustomersInput,
  options?: UseQueryOptions<ExtendedApiResult<CustomerLite[]>, ApiError>
): UseQueryResult<ExtendedApiResult<CustomerLite[]>, ApiError> {
  return QueryTransformer(
    useQuery<ExtendedApiResult<CustomerLite[]>, ApiError>(
      getCustomersKey(input),
      () =>
        QueryFetchFunction({
          url: `users`,
          params: input?.params,
        }),
      options
    ),
    CustomerLite
  );
}

export function getCustomersKey(input?: getCustomersInput) {
  const keys: any[] = ["getCustomers"];
  if (input) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetCustomer(
  input?: getCustomerInput,
  options?: UseQueryOptions<ApiResult<Customer>, ApiError>
): UseQueryResult<ApiResult<Customer>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<Customer>, ApiError>(
      getCustomerKey(input),
      () =>
        QueryFetchFunction({
          url: `users/${input?.id}`,
        }),
      options
    ),
    Customer
  );
}

export function getCustomerKey(input?: getCustomerInput) {
  const keys: any[] = ["getCustomer", input?.id];
  return keys;
}

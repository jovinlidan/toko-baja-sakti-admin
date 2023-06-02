import { QueryFetchFunction, QueryTransformer } from "@/common/helpers/common";
import { ApiError } from "next/dist/server/api-utils";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { getReportInput } from "./report.model";

export function useGetCategoryItemReport(
  input?: getReportInput,
  options?: UseQueryOptions<any, ApiError>
): UseQueryResult<any, ApiError> {
  return QueryTransformer(
    useQuery<any, ApiError>(
      getCategoryItemReportKey(),
      () =>
        QueryFetchFunction({
          url: `report/category-item-report`,
        }),
      options
    )
  );
}

export function getCategoryItemReportKey() {
  const keys: any[] = ["getCategoryItemReport"];
  return keys;
}

export function useGetSupplierReport(
  input?: getReportInput,
  options?: UseQueryOptions<any, ApiError>
): UseQueryResult<any, ApiError> {
  return QueryTransformer(
    useQuery<any, ApiError>(
      getSupplierReportKey(),
      () =>
        QueryFetchFunction({
          url: `report/supplier-report`,
        }),
      options
    )
  );
}

export function getSupplierReportKey() {
  const keys: any[] = ["getSupplierReport"];
  return keys;
}

export function useGetCustomerReport(
  input?: getReportInput,
  options?: UseQueryOptions<any, ApiError>
): UseQueryResult<any, ApiError> {
  return QueryTransformer(
    useQuery<any, ApiError>(
      getCustomerReportKey(),
      () =>
        QueryFetchFunction({
          url: `report/customer-report`,
        }),
      options
    )
  );
}

export function getCustomerReportKey() {
  const keys: any[] = ["getCustomerReport"];
  return keys;
}

export function useGetCategoryItemWithoutPriceReport(
  input?: getReportInput,
  options?: UseQueryOptions<any, ApiError>
): UseQueryResult<any, ApiError> {
  return QueryTransformer(
    useQuery<any, ApiError>(
      getCategoryItemWithoutPriceReportKey(),
      () =>
        QueryFetchFunction({
          url: `report/category-item-without-price-report`,
        }),
      options
    )
  );
}

export function getCategoryItemWithoutPriceReportKey() {
  const keys: any[] = ["getCategoryItemWithoutPriceReport"];
  return keys;
}

export function useGetSupplierItemReport(
  input?: getReportInput,
  options?: UseQueryOptions<any, ApiError>
): UseQueryResult<any, ApiError> {
  return QueryTransformer(
    useQuery<any, ApiError>(
      getSupplierItemReportKey(),
      () =>
        QueryFetchFunction({
          url: `report/supplier-item-report`,
        }),
      options
    )
  );
}

export function getSupplierItemReportKey() {
  const keys: any[] = ["getSupplierItemReport"];
  return keys;
}

export function useGetSalesOrderReport(
  input?: getReportInput,
  options?: UseQueryOptions<any, ApiError>
): UseQueryResult<any, ApiError> {
  return QueryTransformer(
    useQuery<any, ApiError>(
      getSalesOrderReportKey(input),
      () =>
        QueryFetchFunction({
          url: `report/sales-order-report`,
        }),
      options
    )
  );
}

export function getSalesOrderReportKey(input?: getReportInput) {
  const keys: any[] = ["getSalesOrderReport"];
  if (input?.params) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetSalesReport(
  input?: getReportInput,
  options?: UseQueryOptions<any, ApiError>
): UseQueryResult<any, ApiError> {
  return QueryTransformer(
    useQuery<any, ApiError>(
      getSalesReportKey(input),
      () =>
        QueryFetchFunction({
          url: `report/sales-report`,
        }),
      options
    )
  );
}

export function getSalesReportKey(input?: getReportInput) {
  const keys: any[] = ["getSalesReport"];
  if (input?.params) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetReturnReport(
  input?: getReportInput,
  options?: UseQueryOptions<any, ApiError>
): UseQueryResult<any, ApiError> {
  return QueryTransformer(
    useQuery<any, ApiError>(
      getReturnReportKey(input),
      () =>
        QueryFetchFunction({
          url: `report/return-report`,
        }),
      options
    )
  );
}

export function getReturnReportKey(input?: getReportInput) {
  const keys: any[] = ["getReturnReport"];
  if (input?.params) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetPurchaseOrderReport(
  input?: getReportInput,
  options?: UseQueryOptions<any, ApiError>
): UseQueryResult<any, ApiError> {
  return QueryTransformer(
    useQuery<any, ApiError>(
      getPurchaseOrderReportKey(input),
      () =>
        QueryFetchFunction({
          url: `report/purchase-order-report`,
        }),
      options
    )
  );
}

export function getPurchaseOrderReportKey(input?: getReportInput) {
  const keys: any[] = ["getPurchaseOrderReport"];
  if (input?.params) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetPurchaseReport(
  input?: getReportInput,
  options?: UseQueryOptions<any, ApiError>
): UseQueryResult<any, ApiError> {
  return QueryTransformer(
    useQuery<any, ApiError>(
      getPurchaseReportKey(input),
      () =>
        QueryFetchFunction({
          url: `report/purchase-report`,
        }),
      options
    )
  );
}

export function getPurchaseReportKey(input?: getReportInput) {
  const keys: any[] = ["getPurchaseReport"];
  if (input?.params) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetAdjustmentItemReport(
  input?: getReportInput,
  options?: UseQueryOptions<any, ApiError>
): UseQueryResult<any, ApiError> {
  return QueryTransformer(
    useQuery<any, ApiError>(
      getAdjustmentItemReportKey(input),
      () =>
        QueryFetchFunction({
          url: `report/adjustment-item-report`,
        }),
      options
    )
  );
}

export function getAdjustmentItemReportKey(input?: getReportInput) {
  const keys: any[] = ["getAdjustmentItemReport"];
  if (input?.params) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetStockItemReport(
  input?: getReportInput,
  options?: UseQueryOptions<any, ApiError>
): UseQueryResult<any, ApiError> {
  return QueryTransformer(
    useQuery<any, ApiError>(
      getStockItemReportKey(input),
      () =>
        QueryFetchFunction({
          url: `report/stock-item-report`,
        }),
      options
    )
  );
}

export function getStockItemReportKey(input?: getReportInput) {
  const keys: any[] = ["getStockItemReport"];
  if (input?.params) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetStockItemTransactionReport(
  input?: getReportInput,
  options?: UseQueryOptions<any, ApiError>
): UseQueryResult<any, ApiError> {
  return QueryTransformer(
    useQuery<any, ApiError>(
      getStockItemTransactionReportKey(input),
      () =>
        QueryFetchFunction({
          url: `report/stock-item-transaction-report`,
        }),
      options
    )
  );
}

export function getStockItemTransactionReportKey(input?: getReportInput) {
  const keys: any[] = ["getStockItemTransactionReport"];
  if (input?.params) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetGraphSalesReport(
  input?: getReportInput,
  options?: UseQueryOptions<any, ApiError>
): UseQueryResult<any, ApiError> {
  return QueryTransformer(
    useQuery<any, ApiError>(
      getGraphSalesReportKey(input),
      () =>
        QueryFetchFunction({
          url: `report/graph-sales-report`,
        }),
      options
    )
  );
}

export function getGraphSalesReportKey(input?: getReportInput) {
  const keys: any[] = ["getGraphSalesReport"];
  if (input?.params) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetNotificationStockMinimumReport(
  input?: getReportInput,
  options?: UseQueryOptions<any, ApiError>
): UseQueryResult<any, ApiError> {
  return QueryTransformer(
    useQuery<any, ApiError>(
      getNotificationStockMinimumReportKey(input),
      () =>
        QueryFetchFunction({
          url: `report/notification-stock-minimum-report`,
        }),
      options
    )
  );
}

export function getNotificationStockMinimumReportKey(input?: getReportInput) {
  const keys: any[] = ["getNotificationStockMinimumReport"];
  if (input?.params) {
    keys.push(input?.params);
  }
  return keys;
}

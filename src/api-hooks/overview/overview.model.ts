import { Expose, Type } from "class-transformer";
import { Item } from "../item/item.model";

export class OverviewSalesOrders {
  @Expose({ name: "in_process_sales_order" })
  @Type(() => Number)
  inProcessSalesOrder: number;

  @Expose({ name: "not_in_process_sales_order" })
  @Type(() => Number)
  notInProcessSalesOrder: number;
}

export class OverviewPurchaseOrders {
  @Expose({ name: "in_process_purchase_order" })
  @Type(() => Number)
  inProcessPurchaseOrder: number;

  @Expose({ name: "not_in_process_purchase_order" })
  @Type(() => Number)
  notInProcessPurchaseOrder: number;
}

export class Overview {
  @Expose({ name: "sales_orders" })
  @Type(() => OverviewSalesOrders)
  salesOrders: OverviewSalesOrders;

  @Expose({ name: "purchase_orders" })
  @Type(() => OverviewPurchaseOrders)
  purchaseOrders: OverviewPurchaseOrders;

  @Expose({ name: "notification_stock_minimum" })
  @Type(() => Item)
  notificationStockMinimum: Item[];

  @Expose({ name: "grand_total_sales" })
  @Type(() => Number)
  grandTotalSales: number;
}

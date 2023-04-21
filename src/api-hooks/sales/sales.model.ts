import { Expose, Type } from "class-transformer";
import { PurchaseOrderLite } from "@/api-hooks/purchase-order/purchase-order.model";
import { Item } from "@/api-hooks/item/item.model";
import { SalesOrderLite } from "@/api-hooks/sales-order/sales-order.model";

export class SaleLite {
  id: string;
  code: string;

  @Expose({ name: "transaction_date" })
  @Type(() => Date)
  transactionDate: Date;

  @Expose({ name: "grand_total" })
  @Type(() => Number)
  grandTotal: number;

  @Expose({ name: "sales_order" })
  salesOrder: SalesOrderLite;
}

class SaleItem {
  id: string;

  @Type(() => Number)
  quantity: number;

  @Type(() => Number)
  price: number;
}
export class Sale {
  id: string;
  code: string;

  @Expose({ name: "transaction_date" })
  @Type(() => Date)
  transactionDate: Date;

  @Expose({ name: "grand_total" })
  @Type(() => Number)
  grandTotal: number;

  @Expose({ name: "sales_order" })
  salesOrder: SalesOrderLite;

  @Expose({ name: "sales_items" })
  @Type(() => SaleItem)
  salesItems: SaleItem[];
}

export class getSalesInput {
  params: {
    page?: number;
    limit?: number;
    filter?: string;
  };
}

export class getSaleInput {
  id: string;
}

export class DeleteSaleInput {
  id: string;
}

export class CreateSaleInput {
  body: CreateSaleInputForm;
}
export class CreateSaleInputForm {
  transactionDate: Date;
  salesOrderId: string;
  salesItems: {
    salesOrderItemId: string;
    quantity: number;
  }[];
}

export class UpdateSaleInput {
  id: string;
  body: UpdateSaleInputForm;
}
export class UpdateSaleInputForm {
  transactionDate: Date;
  salesOrderId: string;
  salesItems: {
    id: string;
    salesOrderItemId: string;
    quantity: number;
  }[];
}

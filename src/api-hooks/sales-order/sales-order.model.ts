import { Expose, Type } from "class-transformer";
import { CustomerLite } from "@/api-hooks/customer/customer.model";
import { SalesOrderItemLite } from "@/api-hooks/sales-order-item/sales-order-item.model";
import { ItemUnitEnum } from "@/api-hooks/item/item.model";

export class SalesOrderLite {
  id: string;
  code: string;

  @Expose({ name: "transaction_date" })
  @Type(() => Date)
  transactionDate: Date;

  status: string;
  @Type(() => CustomerLite)
  user: CustomerLite;

  @Expose({ name: "total_item" })
  @Type(() => Number)
  totalItem: number;

  @Expose({ name: "created_at" })
  @Type(() => Date)
  createdAt: Date;

  @Expose({ name: "updated_at" })
  @Type(() => Date)
  updatedAt: Date;
}

export class SalesOrder {
  id: string;
  code: string;

  @Expose({ name: "transaction_date" })
  @Type(() => Date)
  transactionDate: Date;

  status: string;

  @Expose({ name: "sales_order_items" })
  @Type(() => SalesOrderItemLite)
  salesOrderItems: SalesOrderItemLite[];

  @Expose({ name: "created_at" })
  @Type(() => Date)
  createdAt: Date;

  @Expose({ name: "updated_at" })
  @Type(() => Date)
  updatedAt: Date;
}

export class getSalesOrdersInput {
  params: {
    page?: number;
    limit?: number;
    filter?: string;
  };
}

export class getSalesOrderInput {
  id: string;
}

export class DeleteSalesOrderInput {
  id: string;
}

export class CreateSalesOrderInput {
  body: CreateSalesOrderInputForm;
}
export class CreateSalesOrderInputForm {
  transactionDate: Date;
  salesOrderItems: {
    itemId: string;
    quantity: number;
    unit: ItemUnitEnum;
  }[];
  userId: string;
}

export class UpdateSalesOrderInput {
  id: string;
  body: UpdateSalesOrderInputForm;
}
export class UpdateSalesOrderInputForm {
  transactionDate: Date;
  salesOrderItems: {
    id: string;
    itemId: string;
    quantity: number;
    unit: ItemUnitEnum;
  }[];
  userId: string;
}

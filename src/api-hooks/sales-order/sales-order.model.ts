import { Expose, Type } from "class-transformer";
import { CustomerLite } from "@/api-hooks/customer/customer.model";
import { SalesOrderItemLite } from "@/api-hooks/sales-order-item/sales-order-item.model";
import { ItemUnitEnum } from "@/api-hooks/item/item.model";
import { Address } from "../common/common.model";

export class TransactionLite {
  id: string;
  @Expose({ name: "transaction_at" })
  @Type(() => Date)
  transactionAt: Date;

  @Expose({ name: "sub_total" })
  @Type(() => Number)
  subTotal: number;

  @Expose({ name: "shipping_cost" })
  @Type(() => Number)
  shippingCost: number;

  @Expose({ name: "grand_total" })
  @Type(() => Number)
  grandTotal: number;

  status: string;

  @Expose({ name: "no_receipt" })
  noReceipt?: string;

  @Type(() => Address)
  address: Address;
}

export class SalePaymentMethod {
  id: string;
  type: string;
  name: string;
  provider: string;
}
export class SalesOrderLite {
  id: string;
  code: string;

  @Expose({ name: "transaction_date" })
  @Type(() => Date)
  transactionDate: Date;

  status: string;
  @Type(() => CustomerLite)
  user: CustomerLite;

  @Expose({ name: "payment_method" })
  @Type(() => SalePaymentMethod)
  paymentMethod?: SalePaymentMethod;

  @Type(() => TransactionLite)
  transaction: TransactionLite;

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

  @Expose({ name: "payment_method" })
  @Type(() => SalePaymentMethod)
  paymentMethod: SalePaymentMethod;

  status: string;

  @Type(() => CustomerLite)
  user: CustomerLite;

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

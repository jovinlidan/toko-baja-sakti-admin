import { Exclude, Expose, Transform, Type } from "class-transformer";
import { Sale, SaleItem, SaleLite } from "@/api-hooks/sales/sales.model";

class SaleReturnItemLite {
  id: string;

  @Type(() => Number)
  quantity: number;

  @Type(() => Number)
  price: number;

  reason: string;
}
export class SaleReturnLite {
  id: string;
  code: string;

  @Expose({ name: "transaction_date" })
  @Type(() => Date)
  transactionDate: Date;

  @Expose({ name: "grand_total" })
  @Type(() => Number)
  grandTotal: number;

  @Type(() => SaleLite)
  sales: SaleLite;

  @Expose({ name: "sales_return_items" })
  @Type(() => SaleReturnItemLite)
  salesReturnItems: SaleReturnItemLite[];
}

export class SaleReturnItem {
  id: string;

  @Type(() => Number)
  quantity: number;

  @Type(() => Number)
  price: number;

  reason: string;

  @Expose({ name: "sales_items" })
  @Type(() => SaleItem)
  salesItems: SaleItem;

  @Expose({ name: "grand_total" })
  @Type(() => Number)
  grandTotal: number;
}

export class SaleReturn {
  id: string;
  code: string;

  @Expose({ name: "transaction_date" })
  @Type(() => Date)
  transactionDate: Date;

  @Expose({ name: "grand_total" })
  @Type(() => Number)
  grandTotal: number;

  @Type(() => Sale)
  sales: Sale;

  @Expose({ name: "sales_return_items" })
  @Type(() => SaleReturnItem)
  salesReturnItems: SaleReturnItem[];
}

export class getSaleReturnsInput {
  params: {
    page?: number;
    limit?: number;
    filter?: string;
  };
}

export class getSaleReturnInput {
  id: string;
}

export class DeleteSaleReturnInput {
  id: string;
}

export class CreateSaleReturnInput {
  body: CreateSaleReturnInputForm;
}
export class CreateSaleReturnInputForm {
  transactionDate: Date;
  salesId: string;
  salesReturnItems: {
    salesItemId: string;
    quantity: number;
    reason: string;
  }[];
}

export class UpdateSaleReturnInput {
  id: string;
  body: UpdateSaleReturnInputForm;
}
export class UpdateSaleReturnInputForm {
  transactionDate: Date;
  salesId: string;
  salesReturnItems: {
    id: string;
    salesItemId: string;
    quantity: number;
    reason: string;
  }[];
}

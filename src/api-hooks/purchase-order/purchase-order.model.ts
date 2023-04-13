import { Expose, Type } from "class-transformer";
import { SupplierLite } from "@/api-hooks/supplier/supplier.model";
import { Item } from "@/api-hooks/item/item.model";

export class PurchaseOrderPOI {
  id: string;

  @Type(() => Number)
  quantity: number;
  unit: string;
  @Type(() => Item)
  item: Item;
}

export class PurchaseOrderLite {
  id: string;
  code: string;

  @Expose({ name: "transaction_date" })
  @Type(() => Date)
  transactionDate: Date;

  status: string;

  @Type(() => SupplierLite)
  supplier: SupplierLite;

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

export class PurchaseOrder {
  id: string;
  code: string;

  @Expose({ name: "transaction_date" })
  @Type(() => Date)
  transactionDate: Date;

  status: string;

  @Type(() => SupplierLite)
  supplier: SupplierLite;

  @Expose({ name: "purchase_order_items" })
  @Type(() => PurchaseOrderPOI)
  purchaseOrderItems: PurchaseOrderPOI[];

  @Expose({ name: "created_at" })
  @Type(() => Date)
  createdAt: Date;

  @Expose({ name: "updated_at" })
  @Type(() => Date)
  updatedAt: Date;
}

export class getPurchaseOrdersInput {
  params: {
    page?: number;
    limit?: number;
    filter?: string;
  };
}

export class getPurchaseOrderInput {
  id: string;
}

export class DeletePurchaseOrderInput {
  id: string;
}

export class CreatePurchaseOrderInput {
  body: CreatePurchaseOrderInputForm;
}
export class CreatePurchaseOrderInputForm {
  transactionDate: string;
  purchaseOrderItems: {
    itemId: string;
    quantity: number;
    unit: string;
  }[];
  supplierId: string;
}

export class UpdatePurchaseOrderInput {
  id: string;
  body: UpdatePurchaseOrderInputForm;
}
export class UpdatePurchaseOrderInputForm {
  transactionDate: string;
  purchaseOrderItems: {
    id: string;
    itemId: string;
    quantity: number;
    unit: string;
  }[];
  supplierId: string;
}

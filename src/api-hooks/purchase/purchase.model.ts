import { Expose, Type } from "class-transformer";
import { PurchaseOrderLite } from "@/api-hooks/purchase-order/purchase-order.model";

export class PurchaseLite {
  id: string;
  code: string;

  @Expose({ name: "received_date" })
  @Type(() => Date)
  receivedDate: Date;

  @Expose({ name: "grand_total" })
  @Type(() => Number)
  grandTotal: number;

  @Expose({ name: "purchase_order" })
  purchaseOrder: PurchaseOrderLite;
}

class PurchaseItem {
  id: string;
  @Type(() => Number)
  quantity: number;

  @Type(() => Number)
  price: number;
  // sad-dad;;
}
export class Purchase {
  id: string;
  code: string;

  @Expose({ name: "received_date" })
  @Type(() => Date)
  receivedDate: Date;

  @Expose({ name: "grand_total" })
  @Type(() => Number)
  grandTotal: number;

  @Expose({ name: "purchase_order" })
  purchaseOrder: PurchaseOrderLite;

  @Expose({ name: "purchase_items" })
  @Type(() => PurchaseItem)
  purchaseItems: PurchaseItem[];
}

export class getPurchasesInput {
  params: {
    page?: number;
    limit?: number;
    filter?: string;
  };
}

export class getPurchaseInput {
  id: string;
}

export class DeletePurchaseInput {
  id: string;
}

export class CreatePurchaseInput {
  body: CreatePurchaseInputForm;
}
export class CreatePurchaseInputForm {
  receivedDate: Date;
  purchaseOrderId: string;
  purchaseItems: {
    purchaseOrderItemId: string;
    quantity: number;
    price: number;
  }[];
}

export class UpdatePurchaseInput {
  id: string;
  body: UpdatePurchaseInputForm;
}
export class UpdatePurchaseInputForm {
  receivedDate: Date;
  purchaseOrderId: string;
  purchaseItems: {
    purchaseOrderItemId: string;
    quantity: number;
    price: number;
    id: string;
  }[];
}
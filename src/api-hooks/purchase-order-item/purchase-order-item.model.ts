import { Expose, Type } from "class-transformer";
import { Item } from "@/api-hooks/item/item.model";

export class PurchaseOrderItemLite {
  id: string;
  unit: string;

  @Expose({ name: "amount_not_received" })
  @Type(() => Number)
  amountNotReceived: number;

  @Type(() => Number)
  quantity: number;

  @Type(() => Item)
  item: Item;

  @Expose({ name: "negotiation_price" })
  @Type(() => Number)
  negotiationPrice?: number;
}

export class getPurchaseOrderItemsInput {
  id: string;
}

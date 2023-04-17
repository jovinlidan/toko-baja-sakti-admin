import { Expose, Type } from "class-transformer";
import { Item } from "@/api-hooks/item/item.model";

export class SalesOrderItemLite {
  id: string;
  unit: string;

  @Expose({ name: "price_unit" })
  priceUnit?: string;

  @Expose({ name: "amount_not_received" })
  @Type(() => Number)
  amountNotReceived: number;

  @Type(() => Number)
  quantity: number;

  @Type(() => Item)
  item: Item;
}

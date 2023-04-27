import { Expose, Type } from "class-transformer";
import { Item } from "@/api-hooks/item/item.model";

export class SalesItemLite {
  id: string;
  unit: string;

  @Expose({ name: "price_unit" })
  @Type(() => Number)
  priceUnit: number;

  @Expose({ name: "rest_amount" })
  @Type(() => Number)
  saleQuantity: number;

  @Type(() => Number)
  quantity: number;

  @Type(() => Item)
  item: Item;
}
export class getSalesItemsInput {
  id: string;
}

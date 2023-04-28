import { Expose, Type } from "class-transformer";
import { Item } from "@/api-hooks/item/item.model";

export class AdjustmentItemLite {
  id: string;
  code: string;

  @Expose({ name: "transaction_date" })
  @Type(() => Date)
  transactionDate: Date;

  @Expose({ name: "old_stock" })
  @Type(() => Number)
  oldStock: number;

  @Expose({ name: "new_stock" })
  @Type(() => Number)
  newStock: number;

  description: string;

  @Type(() => Item)
  item: Item;
}

export class AdjustmentItem {
  id: string;
  code: string;

  @Expose({ name: "transaction_date" })
  @Type(() => Date)
  transactionDate: Date;

  @Expose({ name: "old_stock" })
  @Type(() => Number)
  oldStock: number;

  @Expose({ name: "new_stock" })
  @Type(() => Number)
  newStock: number;

  description: string;

  @Type(() => Item)
  item: Item;
}

export class getAdjustmentItemsInput {
  params: {
    page?: number;
    limit?: number;
    filter?: string;
  };
}

export class getAdjustmentItemInput {
  id: string;
}

export class CreateAdjustmentItemInput {
  body: CreateAdjustmentItemInputForm;
}
export class CreateAdjustmentItemInputForm {
  itemId: string;
  transactionDate: Date;
  newStock: number;
  description: string;
}

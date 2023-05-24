import { Expose, Type } from "class-transformer";
import { CategoryItem } from "@/api-hooks/category-item/category-item.model";

export enum ItemUnitEnum {
  Wholesale = "wholesale",
  Retail = "retail",
}

export class ItemLite {
  id: string;
  code: string;
  size: string;

  @Type(() => Number)
  thick?: number;

  color?: string;

  @Expose({ name: "minimum_stock" })
  @Type(() => Number)
  minimumStock?: number;

  @Type(() => Number)
  stock: number;

  @Expose({ name: "wholesale_price" })
  @Type(() => Number)
  wholesalePrice?: number;

  @Expose({ name: "retail_price" })
  @Type(() => Number)
  retailPrice?: number;

  status: string;

  @Expose({ name: "is_available" })
  @Type(() => Boolean)
  isAvailable: boolean;

  @Expose({ name: "category_item" })
  @Type(() => CategoryItem)
  categoryItem: CategoryItem;
}

export class Item {
  id: string;
  code: string;
  size: string;

  @Type(() => Number)
  thick?: number;

  color?: string;

  @Expose({ name: "minimum_stock" })
  @Type(() => Number)
  minimumStock?: number;

  @Type(() => Number)
  stock: number;

  @Expose({ name: "wholesale_price" })
  @Type(() => Number)
  wholesalePrice?: number;

  @Expose({ name: "retail_price" })
  @Type(() => Number)
  retailPrice?: number;

  status: string;

  @Expose({ name: "is_available" })
  @Type(() => Boolean)
  isAvailable: boolean;

  @Expose({ name: "category_item" })
  @Type(() => CategoryItem)
  categoryItem: CategoryItem;

  weight : number;
}

export class getItemsInput {
  params: {
    page?: number;
    limit?: number;
    filter?: string;
  };
}

export class getItemInput {
  id: string;
}

export class DeleteItemInput {
  id: string;
}

export class CreateItemInput {
  body: CreateItemInputForm;
}
export class CreateItemInputForm {
  categoryItemId: string;
  size: string;
  thick: string;
  color: string;
  minimumStock: number;
  stock: number;
  wholesalePrice: number;
  retailPrice: number;
  status: string;
  isAvailable: boolean;
}

export class UpdateItemInput {
  id: string;
  body: UpdateItemInputForm;
}
export class UpdateItemInputForm {
  categoryItemId: string;
  size: string;
  thick: number;
  color: string;
  minimumStock: number;
  stock: number;
  wholesalePrice: number;
  retailPrice: number;
  status: string;
  isAvailable: boolean;
}

export const ItemAvailableOptions = [
  { label: "Tersedia", value: "true" },
  { label: "Tidak Tersedia", value: "false" },
];

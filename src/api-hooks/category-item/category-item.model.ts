import { Expose, Type } from "class-transformer";

export class CategoryItemLite {
  id: string;
  code: string;
  name: string;
  brand: string;

  @Expose({ name: "conversion_unit" })
  @Type(() => Number)
  conversionUnit: number;

  @Expose({ name: "big_unit" })
  bigUnit: string;

  @Expose({ name: "small_unit" })
  smallUnit: string;

  @Expose({ name: "created_at" })
  @Type(() => Date)
  createdAt: Date;

  @Expose({ name: "updated_at" })
  @Type(() => Date)
  updatedAt: Date;
}

export class getCategoryItemsInput {
  params: {
    page?: number;
    limit?: number;
    filter?: string;
  };
}
export class CreateCategoryItemInput {
  body: CreateCategoryItemInputForm;
}

export class CreateCategoryItemInputForm {
  name: string;
  brand: string;
  conversionUnit: number;
  bigUnit: string;
  smallUnit: string;
}

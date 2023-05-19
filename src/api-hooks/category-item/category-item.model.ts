import { Expose, Type } from "class-transformer";
import { File } from "@/api-hooks/upload/upload.model";

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

export class CategoryItem {
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

  @Type(() => File)
  file: File;

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

export class getCategoryItemInput {
  id: string;
}

export class DeleteCategoryItemInput {
  id: string;
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
  image: string;
}

export class UpdateCategoryItemInput {
  id: string;
  body: UpdateCategoryItemInputForm;
}
export class UpdateCategoryItemInputForm {
  name: string;
  brand: string;
  conversionUnit: number;
  bigUnit: string;
  smallUnit: string;
  image: string;
}

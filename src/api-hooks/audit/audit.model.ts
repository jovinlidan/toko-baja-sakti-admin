import { Exclude, Expose, Transform, Type } from "class-transformer";

export enum AuditableTypeEnum {
  Item = "Item",
  CategoryItem = "CategoryItem",
  User = "User",
  Supplier = "Supplier",
  PurchaseOrder = "PurchaseOrder",
  Purchase = "Purchase",
  SalesOrder = "SalesOrder",
  Sales = "Sales",
  SalesReturn = "SalesReturn",
  AdjustmentItem = "AdjustmentItem",
}
export class AuditLite {
  id: string;
  menu: string;
  event: string;

  @Expose({ name: "auditable_type" })
  auditableType: string;

  @Expose({ name: "auditable_id" })
  auditableId: string;

  @Expose({ name: "created_at" })
  @Type(() => Date)
  createdAt: Date;

  @Expose({ name: "updated_at" })
  @Type(() => Date)
  updatedAt: Date;
}

export class Audit {
  id: string;
  menu: string;
  event: string;

  @Expose({ name: "auditable_type" })
  @Transform(({ value }) => {
    const splittedAuditableType = value.split("\\");
    return splittedAuditableType[2];
  })
  auditableType: AuditableTypeEnum;

  @Expose({ name: "auditable_id" })
  auditableId: string;

  @Expose({ name: "old_values" })
  oldValues: Object;

  @Expose({ name: "new_values" })
  newValues: Object;
}

export class getAuditsInput {
  params: {
    page?: number;
    limit?: number;
    filter?: string;
  };
}

export class getAuditInput {
  id: string;
}

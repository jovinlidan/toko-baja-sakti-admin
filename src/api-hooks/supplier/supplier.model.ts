import { Expose, Type } from "class-transformer";
import { Address } from "@/api-hooks/common/common.model";

export class SupplierLite {
  id: string;
  code: string;
  name: string;

  @Expose({ name: "contact_person" })
  contactPerson: string;

  email?: string;
  phone?: string;
  status?: string;

  @Type(() => Address)
  address?: Address;

  @Expose({ name: "created_at" })
  @Type(() => Date)
  createdAt: Date;

  @Expose({ name: "updated_at" })
  @Type(() => Date)
  updatedAt: Date;
}

export class Supplier {
  id: string;
  code: string;
  name: string;

  @Expose({ name: "contact_person" })
  contactPerson: string;

  email?: string;
  phone?: string;
  status?: string;

  @Type(() => Address)
  address?: Address;

  @Expose({ name: "created_at" })
  @Type(() => Date)
  createdAt: Date;

  @Expose({ name: "updated_at" })
  @Type(() => Date)
  updatedAt: Date;
}

export class getSuppliersInput {
  params: {
    page?: number;
    limit?: number;
    filter?: string;
  };
}

export class getSupplierInput {
  id: string;
}

export class DeleteSupplierInput {
  id: string;
}

export class CreateSupplierInput {
  body: CreateSupplierInputForm;
}
export class CreateSupplierInputForm {
  name: string;
  email: string;
  phone: string;
  status: string;
  contactPerson: string;
  address: {
    cityId: string;
    addressDetail: string;
  };
}

export class UpdateSupplierInput {
  id: string;
  body: UpdateSupplierInputForm;
}
export class UpdateSupplierInputForm {
  name: string;
  email: string;
  phone: string;
  status: string;
  contactPerson: string;
  address: {
    id: string;
    cityId: string;
    addressDetail: string;
  };
}

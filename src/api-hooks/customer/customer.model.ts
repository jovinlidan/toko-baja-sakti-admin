import { Expose, Type } from "class-transformer";
import { Address } from "@/api-hooks/common/common.model";
export class CustomerLite {
  id: string;
  code: string;
  name: string;
  type: string;

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

export class Customer {
  id: string;
  code: string;
  name: string;
  type: string;

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

export class getCustomersInput {
  params: {
    page?: number;
    limit?: number;
    filter?: string;
  };
}

export class getCustomerInput {
  id: string;
}

export class DeleteCustomerInput {
  id: string;
}

export class CreateCustomerInput {
  body: CreateCustomerInputForm;
}
export class CreateCustomerInputForm {
  name: string;
  email: string;
  phone: string;
  status: string;
  address: {
    cityId: string;
    addressDetail: string;
  };
}

export class UpdateCustomerInput {
  id: string;
  body: UpdateCustomerInputForm;
}
export class UpdateCustomerInputForm {
  name: string;
  email: string;
  phone: string;
  status: string;
  address: {
    id: string;
    cityId: string;
    addressDetail: string;
  };
}

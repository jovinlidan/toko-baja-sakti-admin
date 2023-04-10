import { Expose, Type } from "class-transformer";

export class AddressCity {
  id: string;
  name: string;

  @Expose({ name: "created_at" })
  @Type(() => Date)
  createdAt: Date;

  @Expose({ name: "updated_at" })
  @Type(() => Date)
  updatedAt: Date;
}

export class Address {
  id: string;
  tag?: string;

  @Expose({ name: "address_detail" })
  addressDetail: string;

  @Expose({ name: "recipient_name" })
  recipientName?: string;

  @Expose({ name: "recipient_number" })
  recipientNumber?: string;

  @Expose({ name: "is_main" })
  isMain: boolean;

  @Type(() => AddressCity)
  city: AddressCity;
}

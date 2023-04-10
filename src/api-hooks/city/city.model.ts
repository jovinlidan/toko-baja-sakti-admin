import { Expose, Type } from "class-transformer";

export class CityLite {
  id: string;
  name: string;

  @Expose({ name: "created_at" })
  @Type(() => Date)
  createdAt: Date;

  @Expose({ name: "updated_at" })
  @Type(() => Date)
  updatedAt: Date;
}

export class City {
  id: string;
  name: string;

  @Expose({ name: "created_at" })
  @Type(() => Date)
  createdAt: Date;

  @Expose({ name: "updated_at" })
  @Type(() => Date)
  updatedAt: Date;
}

export class getCitiesInput {
  params?: {
    q?: string;
    page?: number;
  };
}

export class getCityInput {
  id: string;
}

import { Expose, Type } from "class-transformer";

export class BrandLite {
  id: string;
  name: string;
}

export class Brand {
  id: string;
  name: string;
}

export class getBrandsInput {
  params?: {};
}

export class getBrandInput {
  id: string;
}

export class CreateBrandInput {
  body: CreateBrandFormInput;
}

export class CreateBrandFormInput {
  name: string;
}

export class DeleteBrandInput {
  params: DeleteBrandParamInput;
}

export class DeleteBrandParamInput {
  id: string;
}

export class UpdateBrandInput {
  params: UpdateBrandParamInput;
  body: UpdateBrandFormInput;
}

export class UpdateBrandParamInput {
  id: string;
}

export class UpdateBrandFormInput {
  name: string;
}

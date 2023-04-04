import { Type, Expose } from "class-transformer";

export class ApiError {
  message: string;
  status?: number;
  statusCode?: number;
  errors?: { [key: string]: string };
}

export class ApiResult<T> {
  data: T;
  message?: string;
}

export class MessageResult {
  message: string;
}

export class ExtendedApiResult<T> extends ApiResult<T> {
  @Type(() => PaginationMeta)
  meta: PaginationMeta;
  filters: Filter[];
  sorts: Sort;
}

export enum FilterType {
  Text = "text",
  Number = "number",
  Option = "option",
  Date = "date",
}

export enum FilterBehaviour {
  Exact = "exact",
  Partial = "partial",
  Range = "range",
  Single = "single",
  Multiple = "multiple",
  Before = "before",
  After = "after",
}

export class Option {
  name: string;
  value: string;
}

export class Filter {
  name: string;
  label: string;
  type: string;

  @Type(() => Option)
  options?: Option[];

  behaviour: FilterBehaviour;
  value?: string;
  default?: string;
}
export class Sort {
  options: string[];
  default: string;
  value?: string;
}

export class PaginationMeta {
  @Expose({ name: "current_page" })
  currentPage: number;

  from: number;

  @Expose({ name: "last_page" })
  lastPage: number;

  path: string;

  @Expose({ name: "per_page" })
  perPage: number;

  to: number;
  total: number;
}

export class getEnumsInput {
  class: string;
}

export class EnumResult {
  label: string;
  value: string;
}

export class ImageClass {
  @Expose({ name: "created_at" })
  createdAt: string;

  @Expose({ name: "updated_at" })
  updatedAt: string;

  id: string;
  name: string;
  url: string;
}

export class BaseOption {
  label?: string;
  value?: string;
}

export class BaseOptionPaginate extends BaseOption {
  id: string;
}

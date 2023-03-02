import { plainToClass, ClassConstructor } from "class-transformer";
import { client } from "@/common/repositories";
import {
  PaginationMeta,
  Filter,
  Sort,
} from "@/common/repositories/common.model";
import toApiError from "@/common/repositories/to-api-error";
import { decamelizeKeys } from "humps";
import qs from "qs";

type MutationMethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchMutationOptions<T> {
  url: string;
  method: MutationMethodType;
  body?: any;
  classType?: ClassConstructor<T>;
  headers?: any;
}

export function MutationFetchFunction<T>({
  url,
  method,
  body,
  classType,
  headers,
}: FetchMutationOptions<T>): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const newBody = body ? decamelizeKeys(body) : undefined;

    try {
      const json = (await client(url, {
        method,

        ...(newBody
          ? {
              json: newBody,
            }
          : {}),
        headers,
      }).json()) as any;

      const transformedJson = {
        ...json,
        ...(json?.data
          ? {
              data: classType ? plainToClass(classType, json.data) : json.data,
            }
          : {}),
      };

      resolve(transformedJson);
    } catch (e) {
      reject(await toApiError(e as Error));
    }
  });
}

interface QueryFetchOptions {
  url: string;
  params?: any;
}

export function QueryFetchFunction({
  url,
  params,
}: QueryFetchOptions): Promise<any> {
  return new Promise(async (resolve, reject) => {
    let _params = "";
    _params = params ? qs.stringify(decamelizeKeys(params)) : "";

    try {
      const json: any = await client
        .get(url, {
          ...(_params
            ? {
                searchParams: _params,
              }
            : {}),
        })
        .json();

      resolve(json);
    } catch (e: any) {
      reject(await toApiError(e));
    }
  });
}

export function QueryTransformer(res: any, dataType?: any) {
  const { data: json } = res;

  let newJson = {};
  switch (true) {
    case !!json?.data:
      newJson = {
        ...json,
        ...(json?.data
          ? {
              data: dataType ? plainToClass(dataType, json?.data) : json?.data,
            }
          : {}),
        ...(json?.filters
          ? {
              filters: plainToClass(Filter, json.filters),
            }
          : {}),
        ...(json?.sorts
          ? {
              sorts: plainToClass(Sort, json.sorts),
            }
          : {}),
        ...(json?.meta
          ? {
              meta: plainToClass(PaginationMeta, json.meta),
            }
          : {}),
      };
      break;
    case !!json?.pages:
      newJson = {
        ...json,
        ...(json.pages
          ? {
              pages:
                dataType && !!json?.pages.length
                  ? json.pages.map((page) => {
                      return {
                        data: plainToClass(dataType, page.data),
                        meta: plainToClass(PaginationMeta, page.meta),
                        ...(page.sorts
                          ? {
                              sorts: plainToClass(Sort, json.sorts),
                            }
                          : {}),
                        ...(page.filters
                          ? { filters: plainToClass(Filter, page.filters) }
                          : {}),
                      };
                    })
                  : json.pages,
            }
          : {}),
      };

      break;
    default:
      if (Array.isArray(json)) {
        newJson = [...(dataType ? plainToClass(dataType, json) : json)];
      } else {
        newJson = {
          ...(dataType ? plainToClass(dataType, json) : json),
        };
      }
  }
  return {
    ...res,
    data: newJson,
  };
}

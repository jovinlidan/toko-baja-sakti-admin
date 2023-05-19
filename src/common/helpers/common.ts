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
  decamelize?: boolean;
  asBody?: boolean;
}

export function MutationFetchFunction<T>({
  url,
  method,
  body,
  classType,
  headers,
  decamelize = true,
  asBody = false,
}: FetchMutationOptions<T>): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const newBody = body
      ? decamelize
        ? decamelizeKeys(body)
        : body
      : undefined;

    const data = asBody ? { body: newBody } : { json: newBody };

    try {
      const json = (await client(url, {
        method,

        ...(newBody ? data : {}),
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

export function getCookies(name) {
  const pairs = document.cookie.split(";");
  const cookies = {};
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split("=");
    cookies[(pair[0] + "").trim()] = unescape(pair.slice(1).join("="));
  }
  return cookies[name];
}

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function get_cookie(name) {
  return document.cookie.split(";")?.some((c) => {
    return c.trim().startsWith(name + "=");
  });
}

export function deleteCookie(name, path?: any, domain?: any) {
  path = path || "/";
  if (get_cookie(name)) {
    document.cookie =
      name +
      "=" +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

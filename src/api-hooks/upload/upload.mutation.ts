import { MutationFetchFunction } from "@/common/helpers/common";
import { ApiError } from "@/common/repositories/common.model";
import { useMutation, UseMutationOptions } from "react-query";

import { UploadFileResult, UploadInput } from "./upload.model";

export function useGetUploadFileParam(
  options?: UseMutationOptions<any, ApiError, UploadInput>
) {
  return useMutation<any, ApiError, UploadInput>(async function (body) {
    return await MutationFetchFunction({
      url: `upload-file-data`,
      method: "POST",
      body: body.body,
      decamelize: false,
      headers: {
        "no-default-content-type": true,
      },
      asBody: true,
      classType: UploadFileResult,
    });
  }, options);
}

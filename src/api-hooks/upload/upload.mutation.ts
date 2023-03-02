import { MutationFetchFunction } from "@/common/helpers/common";
import { ApiError } from "@/common/repositories/common.model";
import { useMutation, UseMutationOptions } from "react-query";

import { UploadFileParam, UploadInput } from "./upload.model";

export function useGetUploadFileParam(
  options?: UseMutationOptions<UploadFileParam, ApiError, UploadInput>
) {
  return useMutation<UploadFileParam, ApiError, UploadInput>(async function (
    body
  ) {
    return await MutationFetchFunction({
      url: `upload-file-data?contentType=${body.contentType}`,
      method: "GET",
    });
  },
  options);
}

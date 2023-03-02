import { UploadFileParam, UploadInput } from "@/api-hooks/upload/upload.model";
import { ApiError } from "@/common/repositories/common.model";
import { camelizeKeys } from "humps";
import { MutateOptions } from "react-query";

interface Props {
  acceptedFiles: File[];
  setIsUploading?: (value: React.SetStateAction<boolean>) => void;
  uploadFileParam: (
    variables: UploadInput,
    options?:
      | MutateOptions<UploadFileParam, ApiError, UploadInput, unknown>
      | undefined
  ) => Promise<any>;
  onPicked: (filename: string, fullUrl: string) => void;
  resizeImage?: boolean;
  ResizeImageFunc?: (
    file: any,
    onImageResized: any,
    type: any
  ) => Promise<void>;
}

export function getFileUploadContentType(type: string) {
  switch (type) {
    case "image/svg+xml":
      return "image/svg%2Bxml";
    default:
      return type;
  }
}

export async function onDrop(props: Props) {
  const {
    acceptedFiles,
    setIsUploading,
    uploadFileParam,
    onPicked,
    resizeImage,
    ResizeImageFunc,
  } = props;
  const method = "PUT";
  const headers = {
    "Content-Type": acceptedFiles[0].type,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  };
  try {
    const fileToUpload = acceptedFiles[0];
    setIsUploading?.(true);
    let result: any = await uploadFileParam({
      contentType: getFileUploadContentType(fileToUpload.type),
    });
    result = await camelizeKeys(result);
    if (!result) {
      throw new Error("Data is undefined");
    }

    const fileBlob = Object.assign(fileToUpload, {
      preview: URL.createObjectURL(fileToUpload),
    });

    if (resizeImage) {
      await ResizeImageFunc?.(
        fileBlob,
        async (uri: File) => {
          const { fileName, url } = result;
          const uploadResponse = await fetch(url, {
            method,
            body: await uri.arrayBuffer(),
            headers,
          });
          const uploadResponseBody = await uploadResponse.text();
          if (!uploadResponse.ok) {
            throw new Error(uploadResponseBody);
          }

          onPicked(fileName, url.split("?")[0]);
          setIsUploading?.(false);
        },
        fileToUpload.type
      );
    } else {
      const { fileName, url } = result;

      const uploadResponse = await fetch(url, {
        method,
        body: await fileToUpload.arrayBuffer(),
        headers,
      });
      const uploadResponseBody = await uploadResponse.text();
      if (!uploadResponse.ok) {
        throw new Error(uploadResponseBody);
      }

      onPicked(fileName, url.split("?")[0]);
    }
  } catch (e) {
  } finally {
    setIsUploading?.(false);
  }
}

import { UploadInput } from "@/api-hooks/upload/upload.model";
import { ApiError } from "@/common/repositories/common.model";
import { camelizeKeys } from "humps";
import { MutateOptions } from "react-query";
import { decamelizeKeys } from "humps";
import { client } from "@/hooks/use-ky";
import { toast } from "react-hot-toast";
interface Props {
  acceptedFiles: File[];
  setIsUploading: (value: React.SetStateAction<boolean>) => void;
  uploadFileParam: (
    variables: UploadInput,
    options?: MutateOptions<any, ApiError, UploadInput, unknown> | undefined
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

  const fileToUpload = acceptedFiles[0];
  const fileBlob = Object.assign(fileToUpload);
  await ResizeImageFunc?.(
    fileBlob,
    async (uri: File) => {
      try {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", uri);
        formData.append(
          "contentType",
          getFileUploadContentType(fileToUpload.type)
        );
        const previewUrl = URL.createObjectURL(uri);

        const result: any = await uploadFileParam({
          body: formData,
        });

        onPicked(result?.file_name, previewUrl);
        setIsUploading(false);
      } catch (e: any) {
        setIsUploading(false);
        e?.message && toast.error(e?.message);
      }
    },
    fileToUpload.type
  );
}

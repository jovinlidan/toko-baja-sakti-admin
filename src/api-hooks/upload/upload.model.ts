import { Expose } from "class-transformer";

export interface UploadInput {
  body: FormData;
}

export interface UploadInputForm {
  contentType: string;
  file: ArrayBuffer;
}

export class File {
  id: string;
  name: string;
  @Expose({ name: "file_url" })
  fileUrl: string;
  @Expose({ name: "file_tags" })
  fileTags?: any;
  order?: number;
}

export class UploadFileResult {
  @Expose({ name: "file_name" })
  fileName: string;
  inputs: {
    bucket: string;
    key: string;
  };
}

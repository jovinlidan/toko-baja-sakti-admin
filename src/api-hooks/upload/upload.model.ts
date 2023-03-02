export interface UploadFileParam {
  id: string;
  fileName: string;
  attributes: {
    action: string;
    method: string;
    enctype: string;
  };
  inputs: string;
}

export interface UploadInput {
  contentType: string;
}

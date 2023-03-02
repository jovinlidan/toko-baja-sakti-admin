import { useGetUploadFileParam } from "@/api-hooks/upload/upload.mutation";
import { ResizeImage } from "@/common/helpers/image";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { Oval } from "react-loader-spinner";
import Text from "../../text";

import { getFileUploadContentType } from "./config";
import { ACCEPTED_FILE } from "./main-file-picker";
import {
  PreviewContainer,
  ImagePreviewContainer,
  ImagePreview,
  RemoveImage,
  EditComponent,
  LoadingContainer,
  FilePreview,
} from "./styles";
import { onDrop } from "./utils";

export interface PreviewOptions {
  id?: string;
  name?: string;
  disabled?: boolean;
  preview: string;
  readOnly?: boolean;
  onPicked: (filename: string, fullUrl: string) => void;
  onDelete?: () => void;
  accept?: string;
  isError?: boolean;
  resizeImage?: boolean;
  resizeWidth?: number;
  resizeHeight?: number;
}

export function PreviewContent({ url }) {
  const splits = url?.split("?")[0].split(".");
  const extension = splits[splits?.length - 1]?.toLowerCase();

  const currentUrl = url.startsWith("blob:") ? splits[0] : url;

  if (["jpeg", "jpg", "png", "svg", "gif"].includes(extension)) {
    return <ImagePreview src={currentUrl} alt={extension} />;
  }

  if (["pdf", "xlsx", "docx", "doc", "xls"].includes(extension)) {
    const Icon = (extension) => {
      return <FilePreview src="/assets/global-file.png" alt={extension} />;
    };
    return (
      <PreviewContainer>
        <Icon extension={extension} />
      </PreviewContainer>
    );
  }

  return <FilePreview src="/assets/global-file.png" alt={extension} />;
}

export default function PreviewPicker(props: PreviewOptions) {
  const {
    onPicked,
    onDelete,
    preview,
    disabled,
    resizeImage,
    resizeWidth,
    resizeHeight,
    readOnly = false,
  } = props;
  const [isUploading, setIsUploading] = React.useState(false);
  const { mutateAsync: uploadFileParam } = useGetUploadFileParam();

  const ResizeImageFunc = React.useCallback(
    async (file, onImageResized, type) => {
      await ResizeImage({
        imageToResize: file,
        width: resizeWidth!,
        height: resizeHeight!,
        onImageResized,
        type,
      });
    },
    [resizeHeight, resizeWidth]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) =>
      onDrop({
        acceptedFiles: files,
        onPicked,
        ResizeImageFunc,
        setIsUploading,
        uploadFileParam,
        resizeImage,
      }),
    disabled,
  });

  //@ts-ignore
  const { onClick: openFilePicker, ...rootProps } = getRootProps({
    refKey: "innerRef",
  });

  const onRootClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (!isUploading) {
        const splits = preview?.split("?")[0].split(".");
        const currentUrl = preview.startsWith("blob:") ? splits[0] : preview;
        window.open(currentUrl);
      }
    },
    [isUploading, preview]
  );

  return (
    <PreviewContainer onClick={onRootClick} {...rootProps}>
      <ImagePreviewContainer>
        {isUploading ? (
          <LoadingContainer>
            <Oval
              strokeWidth={4}
              strokeWidthSecondary={4}
              height={40}
              width={40}
              color="#9590bb"
              secondaryColor="#fffff"
            />
          </LoadingContainer>
        ) : (
          <>
            <PreviewContent url={preview} />
            {!disabled && !readOnly && (
              <>
                <RemoveImage
                  onClick={(e) => {
                    !!onDelete && onDelete();
                    e.stopPropagation();
                  }}
                >
                  X
                </RemoveImage>
                <EditComponent
                  onClick={(e) => {
                    openFilePicker && openFilePicker(e);
                    e.stopPropagation();
                  }}
                >
                  <Text variant="body2" color="white">
                    Ubah
                  </Text>
                </EditComponent>
              </>
            )}
            <input
              {...getInputProps()}
              id={props.id}
              name={props.name}
              accept={props.accept || ACCEPTED_FILE}
              disabled={disabled}
            />
          </>
        )}
      </ImagePreviewContainer>
    </PreviewContainer>
  );
}

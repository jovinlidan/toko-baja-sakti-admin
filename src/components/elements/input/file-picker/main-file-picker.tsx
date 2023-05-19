// import { useGetUploadFileParam } from "api-hooks/upload/upload.mutation";

import { useGetUploadFileParam } from "@/api-hooks/upload/upload.mutation";
import { PlusSVG } from "@/common/assets";
import { ResizeImage } from "@/common/helpers/image";
import ColorConstant from "@/config/stitches/color.stitches";
import { theme } from "@/config/stitches/theme.stitches";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { Oval } from "react-loader-spinner";
import Text from "../../text";

import {
  MainDropzoneContainer,
  ContentContainer,
  BrowseFilesPill,
} from "./styles";
import { onDrop } from "./utils";

export interface FilePickerOptions {
  id?: string;
  name?: string;
  disabled?: boolean;
  onPicked: (filename: string, fullUrl: string) => void;
  accept?: string;
  isError?: boolean;
  resizeImage?: boolean;
  resizeWidth?: number;
  resizeHeight?: number;
  readOnly?: boolean;
  browseFileText?: string;
}

export const ACCEPTED_FILE =
  "application/pdf,image/*,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessing";

export default function MainFilePicker(props: FilePickerOptions) {
  const {
    onPicked,
    disabled,
    isError,
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

  const rootProps = getRootProps({
    refKey: "innerRef",
  });

  return (
    <MainDropzoneContainer
      error={isError}
      disabled={disabled || readOnly}
      {...(!disabled && !readOnly ? rootProps : {})}
    >
      {isUploading ? (
        <>
          <Oval
            strokeWidth={4}
            strokeWidthSecondary={4}
            height={48}
            width={48}
            color={ColorConstant.primaryDark}
            secondaryColor="#fffff"
          />
        </>
      ) : (
        <>
          <PlusSVG
            color={
              disabled
                ? theme.colors.textDisabled.value
                : theme.colors.textPrimary.value
            }
            width={24}
            height={24}
          />
          <input
            {...getInputProps()}
            id={props.id}
            name={props.name}
            accept={props.accept || ACCEPTED_FILE}
            disabled={disabled || readOnly}
          />
        </>
      )}
    </MainDropzoneContainer>
  );
}

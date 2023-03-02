import * as React from "react";

import { BaseElementInputProps } from "..";
import MainFilePicker from "./main-file-picker";
import PreviewPicker from "./preview-picker";
import { MainPreviewContainer, PickerContainer } from "./styles";
import { useFormContext, useController } from "react-hook-form";
import CustomFormControl from "../../custom-form-control";
import { FormContext } from "../../form";

export interface SingleFilePickerProps extends BaseElementInputProps {
  type: "file";
  label?: string;
  required?: boolean;
  previewName: string;
  disabled?: boolean;
  resizeImage?: boolean;
  resizeWidth?: number;
  resizeHeight?: number;
  accept?: string;
}

export default function SingleFilePicker(props: SingleFilePickerProps) {
  const { resizeHeight, resizeWidth, resizeImage, required } = props;
  const context = React.useContext(FormContext);
  const disabled = props.disabled || !context.editable;
  const { control } = useFormContext();
  const { field, fieldState, formState } = useController({
    name: props.name,
    control,
  });

  const {
    field: previewField,
    fieldState: previewFieldState,
    formState: previewFormState,
  } = useController({
    name: props.previewName,
    control,
  });

  const _onPicked = React.useCallback(
    (file: string, fileUrl: string) => {
      field.onChange(file);
      previewField.onChange(fileUrl);
    },
    [field, previewField]
  );

  const _onRemove = React.useCallback(() => {
    field.onChange("");
    previewField.onChange("");
  }, [field, previewField]);

  const hasValue = !!field?.value && !!previewField?.value;

  const _error = fieldState?.error?.message;

  return (
    <CustomFormControl
      required={required}
      label={props.label}
      error={(!disabled && _error) || undefined}
    >
      <PickerContainer>
        {hasValue && (
          <MainPreviewContainer>
            <PreviewPicker
              disabled={disabled}
              onDelete={_onRemove}
              preview={previewField.value}
              onPicked={_onPicked}
              resizeHeight={resizeHeight}
              resizeImage={resizeImage}
              resizeWidth={resizeWidth}
              {...props}
            />
          </MainPreviewContainer>
        )}
        {!hasValue && (
          <MainFilePicker
            isError={!!(!disabled && _error)}
            disabled={disabled}
            onPicked={_onPicked}
            resizeHeight={resizeHeight}
            resizeImage={resizeImage}
            resizeWidth={resizeWidth}
            {...props}
          />
        )}
      </PickerContainer>
    </CustomFormControl>
  );
}

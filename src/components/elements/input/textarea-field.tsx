import Separator from "@/components/common/separator";
import { styled } from "@/config/stitches/theme.stitches";
import TypographyConstant from "@/config/stitches/typography.stitches";
import { VariantProps } from "@stitches/react";
import * as React from "react";
import { useFormContext, useController } from "react-hook-form";

import { BaseElementInputProps } from ".";
import CustomFormControl, {
  CustomFormControlProps,
} from "../custom-form-control";
import { FormContext } from "../form";

type BaseInputType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export interface TextareaFieldProps
  extends BaseElementInputProps,
    Omit<CustomFormControlProps, "name" | "error" | "children">,
    Omit<BaseInputType, "name" | "ref" | "size"> {
  type: "textarea";
  startEnhancer?: React.ReactNode;
  endEnhancer?: React.ReactNode;
  size?: VariantProps<typeof InputContainer>["size"];
}

function TextareaField(props: TextareaFieldProps, ref: any) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: props.name,
    control,
  });

  const context = React.useContext(FormContext);

  const {
    readOnly,
    label,
    type,
    required,
    startEnhancer,
    endEnhancer,
    size = "small",
    ...restProps
  } = props;

  const _onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      field.onChange(e.target.value);
    },
    [field]
  );

  const _disabled = !context.editable || readOnly || props.disabled;

  const _error = fieldState?.error?.message;

  return (
    <CustomFormControl
      {...restProps}
      label={label}
      error={_error}
      required={required}
    >
      <InputContainer size={size} disabled={_disabled}>
        {!!startEnhancer && (
          <StartEnhancerContainer>
            {startEnhancer}
            <Separator mr={8} />
          </StartEnhancerContainer>
        )}
        <StyledInput
          {...field}
          {...restProps}
          ref={ref}
          value={field.value || ""}
          disabled={_disabled}
          onChange={_onChange}
        />
        {!!endEnhancer && (
          <EndEnhancerContainer>
            <Separator mr={8} />
            {endEnhancer}
          </EndEnhancerContainer>
        )}
      </InputContainer>
    </CustomFormControl>
  );
}
export default React.forwardRef(TextareaField);

const StyledInput = styled("textarea", {
  border: "none",
  outline: "none",
  minHeight: 128,
  minWidth: "100%",
  color: "$textPrimary",
  ...TypographyConstant.body1,
  "&::placeholder": {
    color: "$textDisabled",
  },
  "&:disabled": {
    background: "$disabledInput",
    color: "$disabledInputTextColor",
  },
});

const InputContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  background: "$backgroundPaper",
  borderRadius: 8,
  boxShadow: "$elevation2",
  width: "100%",
  variants: {
    size: {
      large: {
        padding: "20px 22px",
      },
      small: {
        padding: "8px 15px",
      },
    },
    disabled: {
      true: {
        boxShadow: "$inputElevation",
        background: "$disabledInput",
      },
    },
  },
});
const StartEnhancerContainer = styled("div", {
  display: "flex",
});

const EndEnhancerContainer = styled("div", {
  display: "flex",
});

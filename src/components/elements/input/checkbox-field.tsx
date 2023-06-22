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
import Text from "../text";

type BaseInputType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export interface CheckboxFieldProps
  extends BaseElementInputProps,
    Omit<CustomFormControlProps, "name" | "error" | "children">,
    Omit<BaseInputType, "name" | "ref" | "size"> {
  type: "checkbox";
  startEnhancer?: React.ReactNode;
  endEnhancer?: React.ReactNode;
  size?: VariantProps<typeof InputContainer>["size"];
  onAfterChange?: (e: any) => void;
}

function CheckboxField(props: CheckboxFieldProps, ref: any) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: props.name,
    control,
  });
  const id = React.useId();

  const context = React.useContext(FormContext);
  const {
    readOnly,
    label,
    type,
    required,
    startEnhancer,
    endEnhancer,
    size = "small",
    onAfterChange,
    ...restProps
  } = props;

  const _onChange = React.useCallback(
    (e: any) => {
      field.onChange(e?.target?.checked);
      onAfterChange?.(e);
    },
    [field, onAfterChange]
  );

  const _disabled = !context.editable || readOnly || props.disabled;

  const _error = fieldState?.error?.message;

  return (
    <CustomFormControl {...restProps} error={_error} required={required}>
      <InputContainer size={size}>
        {!!startEnhancer && (
          <StartEnhancerContainer>
            {startEnhancer}
            <Separator mr={8} />
          </StartEnhancerContainer>
        )}

        <StyledInput
          {...field}
          {...restProps}
          id={id}
          ref={ref}
          type={type}
          checked={field.value || false}
          disabled={_disabled}
          onChange={_onChange as any}
        />
        <Separator mr={12} />
        <label htmlFor={id}>
          <Text variant="body1" style={{ letterSpacing: "0.15px" }}>
            {label}
          </Text>
        </label>
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
export default React.forwardRef(CheckboxField);

const StyledInput = styled("input", {
  border: "none",
  color: "$textPrimary",
  width: 20,
  height: 20,
  ...TypographyConstant.body1,
  // boxShadow: "$elevation2",
  "&::placeholder": {
    color: "$textDisabled",
  },
  outline: "none",
  "&:disabled": {
    background: "$disabledInput",
    color: "$disabledInputTextColor",
  },
  // disabled: {
  //   true: {
  //     boxShadow: "$inputElevation",
  //     background: "$disabledInput",
  //   },
  // },
});

const InputContainer = styled("div", {
  display: "flex",
  borderRadius: 8,
  userSelect: "none",
  alignItems: "center",
  variants: {
    size: {
      large: {
        padding: "8px 0px",
      },
      small: {
        padding: "0px 0px",
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

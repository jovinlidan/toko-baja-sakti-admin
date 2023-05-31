import Separator from "@/components/common/separator";
import { css, styled } from "@/config/stitches/theme.stitches";
import TypographyConstant from "@/config/stitches/typography.stitches";
import { VariantProps } from "@stitches/react";
import * as React from "react";
import { useFormContext, useController } from "react-hook-form";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

import { BaseElementInputProps } from ".";
import CustomFormControl, {
  CustomFormControlProps,
} from "../custom-form-control";
import { FormContext } from "../form";
import { CalendarSVG } from "@/common/assets";
import { addDays, isDate, setHours, setMinutes } from "date-fns";

export interface DatePickerFieldProps
  extends BaseElementInputProps,
    Omit<CustomFormControlProps, "name" | "error" | "children">,
    Omit<
      ReactDatePickerProps,
      "name" | "ref" | "placeholderText" | "onChange"
    > {
  type: "date";
  startEnhancer?: React.ReactNode;
  endEnhancer?: React.ReactNode;
  placeholder?: string;
  size?: VariantProps<typeof InputContainer>["size"];
}

function TextField(props: DatePickerFieldProps, ref: any) {
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
    startEnhancer = <CalendarSVG />,
    endEnhancer,
    size = "small",
    placeholder,
    ...restProps
  } = props;

  const _onChange = React.useCallback(
    (e: Date | null) => {
      if (e) {
        e = addDays(e, 1);
      }
      field.onChange(e);
    },
    [field]
  );
  const onContainerClick = React.useCallback(() => {
    if (!ref?.current?.isCalendarOpen()) {
      ref?.current?.setFocus?.();
    }
  }, [ref]);

  const _disabled = !context.editable || readOnly || props.disabled;

  const _error = fieldState?.error?.message;

  return (
    <CustomFormControl
      {...restProps}
      label={label}
      error={_error}
      required={required}
    >
      <InputContainer
        size={size}
        disabled={_disabled}
        onClick={onContainerClick}
      >
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
          className={styles.fullWidth()}
          wrapperClassName={styles.fullWidth()}
          placeholderText={placeholder}
          selected={isDate(field.value) ? addDays(field.value, -1) : null}
          disabled={_disabled}
          onChange={_onChange}
          onSelect={_onChange}
          dateFormat="d MMM yyyy"
          isClearable={!!field.value && !_disabled}
          clearButtonClassName={styles.clearButton()}
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
export default React.forwardRef(TextField);

const styles = {
  clearButton: css({
    padding: 0,
    "&::after": {
      background: "transparent",
      color: "$primaryDark",
      fontSize: 24,
    },
  }),
  fullWidth: css({
    width: "100%",
    "& > div": {
      display: "flex",
    },
  }),
};

const StyledInput = styled(DatePicker, {
  border: "none",
  width: "100%",
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

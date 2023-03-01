import { useFormContext, useController } from "react-hook-form";
import Select, { GroupBase, Props } from "react-select";
import * as React from "react";

import { BaseElementInputProps } from ".";
import CustomFormControl from "../custom-form-control";
import { FormContext } from "../form";

export type SelectFieldProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Omit<Props<Option, IsMulti, Group>, "onChange"> &
  BaseElementInputProps & {
    type: "select";
    label?: string;
    required?: boolean;
    onSelect?: (data: any | null) => void;
  };

function SelectField<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: SelectFieldProps<Option, IsMulti, Group>, ref?: any) {
  const { control } = useFormContext();
  const { field, fieldState, formState } = useController({
    name: props.name,
    control,
  });

  const { label, readOnly, onSelect, required, ...restProps } = props;
  const context = React.useContext(FormContext);

  const _onChange = React.useCallback(
    (value) => {
      if (onSelect) {
        onSelect(value);
      } else {
        field.onChange(value);
      }
    },
    [onSelect, field]
  );

  const _disabled = !context.editable || readOnly || props.isDisabled;

  const _error = fieldState?.error?.message;

  return (
    <CustomFormControl
      label={label}
      {...restProps}
      error={_error}
      required={required}
    >
      <Select
        {...field}
        {...restProps}
        isDisabled={_disabled}
        value={field.value || ""}
        ref={ref}
        onChange={_onChange}
      />
    </CustomFormControl>
  );
}

export default React.forwardRef(SelectField);

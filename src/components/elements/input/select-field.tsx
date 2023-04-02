import { useFormContext, useController } from "react-hook-form";
import Select, { GroupBase, Props, StylesConfig } from "react-select";
import * as React from "react";

import { BaseElementInputProps } from ".";
import CustomFormControl from "../custom-form-control";
import { FormContext } from "../form";
import { theme } from "@/config/stitches/theme.stitches";
import TypographyConstant from "@/config/stitches/typography.stitches";

interface CustomOption {
  label: string;
  value: string;
}
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
    options: CustomOption[];
  };

function SelectField<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: SelectFieldProps<Option, IsMulti, Group>, ref?: any) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: props.name,
    control,
  });

  const { label, readOnly, onSelect, required, ...restProps } = props;
  const context = React.useContext(FormContext);

  const _onChange = React.useCallback(
    (selected) => {
      if (onSelect) {
        onSelect(selected.value);
      } else {
        field.onChange(selected.value);
      }
    },
    [onSelect, field]
  );

  const _disabled = !context.editable || readOnly || props.isDisabled;

  const _error = fieldState?.error?.message;

  const styles = React.useMemo<StylesConfig<CustomOption>>(
    () => ({
      control: (styles, { isDisabled }) => ({
        ...styles,
        border: "none",
        minHeight: 42,
        boxShadow: theme.shadows.inputElevation.value,
        background: isDisabled ? theme.colors.disabledInput.value : undefined,
      }),
      indicatorSeparator: () => ({}),
      indicatorsContainer: (styles) => ({
        ...styles,
        paddingRight: 13 - 8,
      }),
      dropdownIndicator: (styles) => ({
        ...styles,
        color: theme.colors.textPrimary.value,
      }),
      option: (styles) => ({
        ...styles,
        background: "white",
        cursor: "pointer",
        color: theme.colors.textPrimary.value,
        "&:active": {
          background: "white",
        },
        "&:hover": {
          background: theme.colors.textPrimary.value,
          color: "white",
        },
      }),
      menuList: (styles) => ({
        ...styles,
        padding: 0,
        borderRadius: 4,
      }),
      menu: (styles) => ({
        ...styles,
        borderRadius: 4,
      }),
      valueContainer: (styles) => ({
        ...styles,
        paddingLeft: 15,
        paddingRight: 15,
        ...TypographyConstant.body1,
      }),

      placeholder: (styles) => ({
        ...styles,
        ...TypographyConstant.body1,
      }),
    }),
    []
  );
  const value = React.useMemo(() => {
    return (
      (restProps.options?.find(
        (item: any) => item?.value === field.value
      ) as any) || null
    );
  }, [field.value, restProps.options]);

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
        value={value}
        ref={ref}
        onChange={_onChange}
        styles={styles as any}
        noOptionsMessage={() => "Tidak ada Data"}
      />
    </CustomFormControl>
  );
}

export default React.forwardRef(SelectField);

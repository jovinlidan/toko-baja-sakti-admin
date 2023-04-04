import { useFormContext, useController } from "react-hook-form";
import Select, { GroupBase, Props, StylesConfig } from "react-select";
import * as React from "react";

import { BaseElementInputProps } from ".";
import CustomFormControl from "../custom-form-control";
import { FormContext } from "../form";
import { theme } from "@/config/stitches/theme.stitches";
import TypographyConstant from "@/config/stitches/typography.stitches";
import { BaseOption } from "@/common/repositories/common.model";

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
    options: BaseOption[];
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

  const {
    label,
    readOnly,
    onSelect,
    required,
    placeholder = "",
    ...restProps
  } = props;
  const context = React.useContext(FormContext);

  const _onChange = React.useCallback(
    (selected) => {
      if (onSelect) {
        onSelect(selected || null);
      } else {
        field.onChange(selected.value);
      }
    },
    [onSelect, field]
  );

  const _disabled = !context.editable || readOnly || props.isDisabled;

  const _error = fieldState?.error?.message;

  const styles = React.useMemo<StylesConfig<BaseOption>>(
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
      option: (styles, { isSelected }) => ({
        ...styles,
        background: isSelected ? theme.colors.textPrimary.value : "white",
        cursor: "pointer",
        color: isSelected ? "white" : theme.colors.textPrimary.value,

        "&:active, &:hover": {
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
      singleValue: (styles, { isDisabled }) => ({
        ...styles,
        color: isDisabled
          ? theme.colors.disabledInputTextColor.value
          : theme.colors.textPrimary.value,
      }),
      placeholder: (styles) => ({
        ...styles,
        ...TypographyConstant.body1,
      }),
      clearIndicator: (styles) => ({
        ...styles,
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
        placeholder={placeholder}
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

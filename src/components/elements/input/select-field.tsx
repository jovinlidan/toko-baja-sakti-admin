import { useFormContext, useController } from "react-hook-form";
import Select, { GroupBase, Props, StylesConfig } from "react-select";
import * as React from "react";

import { BaseElementInputProps } from ".";
import CustomFormControl from "../custom-form-control";
import { FormContext } from "../form";
import { css, styled, theme } from "@/config/stitches/theme.stitches";
import TypographyConstant from "@/config/stitches/typography.stitches";
import { BaseOption } from "@/common/repositories/common.model";
import Separator from "@/components/common/separator";

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
    startEnhancer?: React.ReactNode;
    endEnhancer?: React.ReactNode;
    options: BaseOption[];
    size?: "large" | "small";
    disabled?: boolean;
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
    size = "small",
    startEnhancer,
    endEnhancer,
    ...restProps
  } = props;
  const context = React.useContext(FormContext);

  const _onChange = React.useCallback(
    (selected) => {
      if (onSelect) {
        onSelect(selected || null);
      } else {
        field.onChange(selected?.value || null);
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
        background: isDisabled
          ? theme.colors.disabledInput.value
          : theme.colors.backgroundPaper.value,
        padding: size === "large" ? "15px 22px" : "0px 9px",
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
      input: (styles) => ({
        ...styles,
      }),
      menuList: (styles) => ({
        ...styles,
        padding: 0,
        borderRadius: 8,
      }),
      menu: (styles) => ({
        ...styles,
        borderRadius: 8,
      }),
      valueContainer: (styles) => ({
        ...styles,
        ...TypographyConstant.body1,
        paddingLeft: !!startEnhancer ? "32px" : undefined,
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
        color: theme.colors.textDisabled.value,
      }),

      clearIndicator: (styles) => ({
        ...styles,
      }),
    }),
    [size, startEnhancer]
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
      {!!startEnhancer && (
        <StartEnhancerContainer>
          {startEnhancer}
          <Separator mr={8} />
        </StartEnhancerContainer>
      )}
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
        components={{
          ...(endEnhancer
            ? {
                DropdownIndicator: () => <>{endEnhancer}</>,
              }
            : {}),
        }}
      />
    </CustomFormControl>
  );
}

export default React.forwardRef(SelectField);

const StartEnhancerContainer = styled("div", {
  display: "flex",
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  alignItems: "center",
  paddingLeft: 20,
  zIndex: 100000,
});

import { useFormContext, useController } from "react-hook-form";
import Select, { GroupBase, Props, StylesConfig } from "react-select";
import * as React from "react";

import { BaseElementInputProps } from ".";
import CustomFormControl from "../custom-form-control";
import { FormContext } from "../form";
import { theme } from "@/config/stitches/theme.stitches";
import TypographyConstant from "@/config/stitches/typography.stitches";
import SelectField, { SelectFieldProps } from "./select-field";
import { useGetEnums } from "@/api-hooks/common/common.query";

export interface SelectEnumFieldProps
  extends Omit<SelectFieldProps, "type" | "options" | "isLoading"> {
  type: "enum";
  enumClass: string;
}

function SelectEnumField(props: SelectEnumFieldProps, ref?: any) {
  const { type, enumClass, ...restProps } = props;
  const { data, isLoading, error, refetch } = useGetEnums(
    {
      class: enumClass,
    },
    { cacheTime: 3600 * 24 * 1000 }
  );

  const onMenuOpen = React.useCallback(() => {
    if (error) refetch();
  }, [error, refetch]);

  return (
    <SelectField
      {...restProps}
      type="select"
      ref={ref}
      options={data || []}
      onMenuOpen={onMenuOpen}
      isLoading={isLoading}
    />
  );
}

export default React.forwardRef(SelectEnumField);

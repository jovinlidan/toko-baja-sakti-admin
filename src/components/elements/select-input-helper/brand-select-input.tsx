import { Brand, BrandLite } from "@/api-hooks/brand/brand.model";
import { useGetBrand, useGetBrands } from "@/api-hooks/brand/brand.query";
import {
  BaseOption,
  BaseOptionPaginate,
} from "@/common/repositories/common.model";
import useSelectInputHelper from "@/hooks/use-select-input-helper";
import { useRouter } from "next/router";
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import Input from "../input";

function transformer(item: BrandLite | Brand): BaseOptionPaginate {
  return {
    id: item.id,
    value: item.id,
    label: item.name,
  };
}

interface Props {
  name: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
  onChange?: (value?: any) => void;
}

export default function BrandSelectOption(props: Props) {
  const { control } = useFormContext();
  const { name, onChange, ...restProps } = props;
  const { field } = useController({
    name,
    control,
  });

  const selectProps = useSelectInputHelper({
    value: field.value,
    onSelectItem: (value) => {
      field.onChange(value?.value);
      onChange?.(value);
    },
    useListQueryHook: useGetBrands,
    useDetailLazyQueryHook: useGetBrand,
    getMemoizedListVariables: React.useCallback(
      (page, q) => ({
        params: {
          q,
          page,
          limit: -1,
        },
      }),
      []
    ),
    getMemoizedDetailVariables: React.useCallback(
      (value: string) => ({
        id: value,
      }),
      []
    ),
    renderCreate: true,
    onClickCreate: () => {
      field.onChange(null);
      onChange?.(null);
    },
    listTransformer(result) {
      return result.data.map((v) => transformer(v));
    },
    detailTransformer(result) {
      return transformer(result.data);
    },
    paginationTransformer(result) {
      return result.meta;
    },
  });

  return (
    <Input
      type="select"
      name={props.name}
      required={props.required}
      label={props.label}
      placeholder={props.placeholder}
      {...restProps}
      {...selectProps}
      isSearchable
      options={selectProps.options as BaseOption[]}
    />
  );
}

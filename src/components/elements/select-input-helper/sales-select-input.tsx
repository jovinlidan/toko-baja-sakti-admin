import { Sale, SaleLite } from "@/api-hooks/sales/sales.model";
import { useGetSale, useGetSales } from "@/api-hooks/sales/sales.query";
import {
  BaseOption,
  BaseOptionPaginate,
} from "@/common/repositories/common.model";
import useSelectInputHelper from "@/hooks/use-select-input-helper";
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import Input from "../input";

function transformer(item: SaleLite | Sale): BaseOptionPaginate {
  return {
    id: item.id,
    value: item.id,
    label: `${item.salesOrder.user.name} (${item.code})`,
  };
}

interface Props {
  name: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
  onChange?: (value?: any) => void;
  params: {
    [key in string]: string;
  };
  disabled?: boolean;
}

export default function SalesSelectOption(props: Props) {
  const { control } = useFormContext();
  const { name, params, ...restProps } = props;
  const { field } = useController({
    name,
    control,
  });

  const selectProps = useSelectInputHelper({
    value: field.value,
    onSelectItem: (value) => {
      field.onChange(value?.value);
    },
    useListQueryHook: useGetSales,
    useDetailLazyQueryHook: useGetSale,
    getMemoizedListVariables: React.useCallback(
      (page, q) => ({
        params: {
          q,
          page,
          limit: -1,
          ...params,
        },
      }),
      [params]
    ),
    renderCreate: false,
    getMemoizedDetailVariables: React.useCallback(
      (value: string) => ({
        id: value,
      }),
      []
    ),
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

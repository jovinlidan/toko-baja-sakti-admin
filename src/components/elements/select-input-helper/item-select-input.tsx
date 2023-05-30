import { Item, ItemLite } from "@/api-hooks/item/item.model";
import { useGetItem, useGetItems } from "@/api-hooks/item/item.query";
import {
  BaseOption,
  BaseOptionPaginate,
} from "@/common/repositories/common.model";
import useSelectInputHelper from "@/hooks/use-select-input-helper";
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import Input from "../input";

function transformer(item: ItemLite | Item): BaseOptionPaginate {
  return {
    id: item.id,
    value: item.id,
    label: `${item?.categoryItem.name} | ${item?.categoryItem.code} | ${item?.size} | ${item?.thick}mm | ${item?.color} (${item?.code})`,
  };
}

interface Props {
  name: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
  onChange?: (value?: any) => void;
}

export default function ItemSelectOption(props: Props) {
  const { control } = useFormContext();

  const { field } = useController({
    name: props.name,
    control,
  });

  const selectProps = useSelectInputHelper({
    value: field.value,
    onSelectItem: (value) => {
      field.onChange(value?.value);
    },
    useListQueryHook: useGetItems,
    useDetailLazyQueryHook: useGetItem,
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
      {...selectProps}
      isSearchable
      options={selectProps.options as BaseOption[]}
    />
  );
}

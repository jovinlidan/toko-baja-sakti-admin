import { Supplier, SupplierLite } from "@/api-hooks/supplier/supplier.model";
import {
  useGetSupplier,
  useGetSuppliers,
} from "@/api-hooks/supplier/supplier.query";
import {
  BaseOption,
  BaseOptionPaginate,
} from "@/common/repositories/common.model";
import useSelectInputHelper from "@/hooks/use-select-input-helper";
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import Input from "../input";

function transformer(item: SupplierLite | Supplier): BaseOptionPaginate {
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

export default function SupplierSelectOption(props: Props) {
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
    useListQueryHook: useGetSuppliers,
    useDetailLazyQueryHook: useGetSupplier,
    getMemoizedListVariables: React.useCallback(
      (page, q) => ({
        params: {
          q,
          page,
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

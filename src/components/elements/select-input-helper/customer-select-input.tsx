import { Customer, CustomerLite } from "@/api-hooks/customer/customer.model";
import {
  useGetCustomer,
  useGetCustomers,
} from "@/api-hooks/customer/customer.query";
import {
  BaseOption,
  BaseOptionPaginate,
} from "@/common/repositories/common.model";
import useSelectInputHelper from "@/hooks/use-select-input-helper";
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import Input from "../input";

function transformer(item: CustomerLite | Customer): BaseOptionPaginate {
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

export default function CustomerSelectOption(props: Props) {
  const { control } = useFormContext();
  const { name, ...restProps } = props;
  const { field } = useController({
    name,
    control,
  });

  const selectProps = useSelectInputHelper({
    value: field.value,
    onSelectItem: (value) => {
      field.onChange(value?.value);
    },
    useListQueryHook: useGetCustomers,
    useDetailLazyQueryHook: useGetCustomer,
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
      return result.data
        .filter((v) => v.status !== "Non Aktif")
        .map((v) => transformer(v));
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

import {
  CategoryItem,
  CategoryItemLite,
} from "@/api-hooks/category-item/category-item.model";
import {
  useGetCategoryItem,
  useGetCategoryItems,
} from "@/api-hooks/category-item/category-item.query";
import {
  BaseOption,
  BaseOptionPaginate,
} from "@/common/repositories/common.model";
import routeConstant from "@/constants/route.constant";
import useSelectInputHelper from "@/hooks/use-select-input-helper";
import { useRouter } from "next/router";
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import Input from "../input";

function transformer(
  item: CategoryItemLite | CategoryItem
): BaseOptionPaginate {
  return {
    id: item.id,
    value: item.id,
    label: `${item.name}-${item.brand} (${item.code})`,
  };
}

interface Props {
  name: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
  onChange?: (value?: any) => void;
}

export default function CategoryItemSelectOption(props: Props) {
  const { control } = useFormContext();
  const router = useRouter();

  const { field } = useController({
    name: props.name,
    control,
  });

  const selectProps = useSelectInputHelper({
    value: field.value,
    onSelectItem: (value) => {
      field.onChange(value?.value);
    },
    useListQueryHook: useGetCategoryItems,
    useDetailLazyQueryHook: useGetCategoryItem,
    getMemoizedListVariables: React.useCallback(
      (page, q) => ({
        params: {
          q,
          page,
        },
      }),
      []
    ),
    renderCreate: true,
    onClickCreate: () => {
      router.push(routeConstant.CategoryItemCreate);
    },
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
      options={selectProps.options as BaseOption[]}
    />
  );
}

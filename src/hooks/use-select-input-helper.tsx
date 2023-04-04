import { UseQueryOptions, UseQueryResult } from "react-query";
import {
  ApiError,
  BaseOptionPaginate,
  PaginationMeta,
} from "@/common/repositories/common.model";
import { SelectFieldProps } from "@/components/elements/input/select-field";
import { camelizeKeys } from "humps";
import * as React from "react";
import { useDebouncedCallback } from "use-debounce";

// const getLabel = ({ option }) => {
//   if (option.id === "actionLoad") {
//     return (
//       <ActionContainer>
//         <Separator mx={4} />
//         {option.label}
//       </ActionContainer>
//     );
//   }

//   if (option.id === "actionCreate") {
//     return (
//       <ActionContainer>
//         <PlusSVG color="#FFFFFF" />
//         <Separator mx={4} />

//         {option.label}
//       </ActionContainer>
//     );
//   }
//   return <>{option.label}</>;
// };

interface Options<
  ListQueryData,
  ListQueryVariables,
  DetailQueryData,
  DetailQueryVariables
> {
  useListQueryHook: (
    baseInputs: ListQueryVariables,
    baseOptions?: UseQueryOptions<ListQueryData, ApiError>
  ) => UseQueryResult<ListQueryData, ApiError>;
  useDetailLazyQueryHook: (
    baseInputs: DetailQueryVariables,
    baseOptions?: UseQueryOptions<DetailQueryData, ApiError>
  ) => UseQueryResult<DetailQueryData, ApiError>;
  listTransformer: (result: ListQueryData) => BaseOptionPaginate[];
  detailTransformer: (result: DetailQueryData) => BaseOptionPaginate;
  paginationTransformer: (result: ListQueryData) => PaginationMeta;
  getMemoizedListVariables: (
    page: number,
    query?: string
  ) => ListQueryVariables;
  onSelectItem: (value?: BaseOptionPaginate) => void;
  getMemoizedDetailVariables: (value: string) => DetailQueryVariables;
  resetPageWhenQueryChanged?: boolean;
  renderCreate?: boolean;
  onClickCreate?: () => void;
  createText?: string;
  value?: string;
  isMulti?: boolean;
}

interface Props extends Partial<SelectFieldProps> {
  onClickOutside: () => void;
  ref?: any;
}

export default function useSelectInputHelper<
  ListQueryData,
  ListQueryVariables,
  DetailQueryData,
  DetailQueryVariables
>(
  helperOptions: Options<
    ListQueryData,
    ListQueryVariables,
    DetailQueryData,
    DetailQueryVariables
  >
): Props {
  const {
    renderCreate = false,
    createText = "Buat Baru",
    onClickCreate = () => {},
    onSelectItem,
    useListQueryHook,
    useDetailLazyQueryHook,
    listTransformer,
    detailTransformer,
    paginationTransformer,
    getMemoizedListVariables,
    getMemoizedDetailVariables,
    value,
    resetPageWhenQueryChanged,
    isMulti = false,
  } = helperOptions;

  const selectInputRef = React.useRef<any>();
  const [options, setOptions] = React.useState<BaseOptionPaginate[]>([]);
  const [selectedOption, setSelectedOption] = React.useState<
    BaseOptionPaginate | undefined
  >(undefined);
  const [query, setQuery] = React.useState<string | undefined>();
  const [page, setPage] = React.useState(1);
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const {
    isLoading: listLoading,
    isFetching: listFetching,
    data: list,
    error,
    refetch,
  } = useListQueryHook(
    getMemoizedListVariables(page, query ? query : undefined),
    {
      onSuccess: (result) => {
        if (page === 1) {
          setOptions(listTransformer(camelizeKeys(result)));
        } else {
          setOptions((prevOptions) =>
            prevOptions.concat(listTransformer(camelizeKeys(result)))
          );
        }
      },
    }
  );
  const {
    isLoading: detailLoading,
    isFetching: detailFetching,
    error: detailError,
    refetch: detailRefetch,
  } = useDetailLazyQueryHook(getMemoizedDetailVariables(value!), {
    enabled: !!value && !isMulti,
    onSuccess: (result) => {
      setSelectedOption(detailTransformer(camelizeKeys(result)));
    },
  });

  const closeMenu = () => {
    setIsMenuOpen(false);
    selectInputRef?.current?.blur?.();
  };

  React.useEffect(() => {
    if (!value) {
      setSelectedOption(undefined);
    }
  }, [value, getMemoizedDetailVariables]);

  const loading =
    listLoading || detailLoading || listFetching || detailFetching;

  const onMenuOpen = React.useCallback(() => {
    setQuery(undefined);
    if (error) {
      refetch();
    }

    if (detailError) {
      detailRefetch();
    }
  }, [detailError, detailRefetch, error, refetch]);

  const items = React.useMemo(() => {
    const _options = [
      ...(selectedOption
        ? [selectedOption].concat([
            ...options.filter((o) => o.id !== selectedOption?.id),
          ])
        : options),
    ];

    const pagination = list && paginationTransformer(list);

    if (pagination && pagination.currentPage < pagination.lastPage) {
      _options.push({
        label: "Muat lebih...",
        id: "actionLoad",
        value: "actionLoad",
      });
    }

    if (renderCreate) {
      _options.push({
        label: createText,
        id: "actionCreate",
        value: "actionCreate",
      });
    }

    return _options;
  }, [
    createText,
    list,
    options,
    paginationTransformer,
    renderCreate,
    selectedOption,
  ]);

  const onQueryChange = useDebouncedCallback(
    (event) => {
      resetPageWhenQueryChanged && setPage(1);
      setQuery(event?.target?.value || "");
    },
    800,
    {
      trailing: true,
    }
  );

  const onFocus = React.useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const onBlur = React.useCallback((e) => {
    setIsMenuOpen(false);
  }, []);

  const _onChange = React.useCallback(
    (params: BaseOptionPaginate) => {
      const pagination = list && paginationTransformer(list);
      if (params?.id === "actionLoad" && pagination) {
        setPage(pagination.currentPage + 1);
      } else if (params?.id === "actionCreate") {
        onClickCreate();
        closeMenu();
      } else {
        onSelectItem(params || undefined);
        if (!isMulti) {
          closeMenu();
        }
      }
    },
    [isMulti, list, onClickCreate, onSelectItem, paginationTransformer]
  );

  const _value = React.useMemo(() => {
    if (value) {
      const currentSelected = items.find((find) => find.id === value);

      if (currentSelected) {
        return [currentSelected];
      } else {
        return selectedOption ? [selectedOption] : undefined;
      }
    } else {
      return undefined;
    }
  }, [items, selectedOption, value]);

  return {
    value: _value,
    options: items as any,
    isLoading: loading,
    onInputChange: onQueryChange,
    onFocus,
    onBlur,
    onMenuOpen,
    isSearchable: false,
    onClickOutside: closeMenu,
    isClearable: true,
    blurInputOnSelect: false,
    menuIsOpen: isMenuOpen,
    onSelect: _onChange as any,
    ref: selectInputRef,
  };
}

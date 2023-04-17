import Form from "@/components/elements/form";
import { styled, theme } from "@/config/stitches/theme.stitches";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Input } from "@/components/elements";
import { BxSearchSVG } from "@/common/assets";
import ClipLoader from "react-spinners/ClipLoader";
import { Filter } from "@/common/repositories/common.model";
import { produce } from "immer";

interface Props {
  loading: boolean;
  filters: Filter[];
  setFilters: (value: React.SetStateAction<Filter[] | undefined>) => void;
}

const FILTER_NAME = "search";

export default function ItemListFilterForm(props: Props) {
  const { loading, filters, setFilters } = props;
  const inputRef = React.useRef<any>();
  const YupSchema = React.useMemo(() => Yup.object().shape({}), []);
  const resolver = useYupValidationResolver(YupSchema);

  const methods = useForm<any>({
    resolver,
    resetOptions: {
      keepTouched: true,
    },
    mode: "all",
    defaultValues: {
      filter:
        filters?.find((filter) => filter.name === FILTER_NAME)?.value ||
        undefined,
    },
  });

  const onSubmit = React.useCallback(
    async (values) => {
      setFilters((prevFilters) =>
        produce(prevFilters, (draft) => {
          const matchedFilter = draft?.find((f) => f.name === FILTER_NAME);
          if (matchedFilter) {
            matchedFilter.value = values.filter;
          }
        })
      );
    },
    [setFilters]
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Container>
        <Input
          name="filter"
          type="text"
          size="large"
          placeholder="Cari Barang"
          disabled={loading}
          ref={inputRef}
          startEnhancer={<BxSearchSVG color={theme.colors.textPrimary.value} />}
          endEnhancer={loading && <ClipLoader size={24} />}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              methods.handleSubmit(onSubmit);
            }
          }}
        />
        <Input type="submit" text="CARI" size="large" loading={loading} />
      </Container>
    </Form>
  );
}

const Container = styled("div", {
  mb: 26,
});

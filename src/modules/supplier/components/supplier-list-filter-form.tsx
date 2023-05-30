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

const FILTER_SEARCH = "search";

export default function SupplierListFilterForm(props: Props) {
  const { loading, filters, setFilters } = props;
  const inputRef = React.useRef<any>();
  const YupSchema = React.useMemo(() => Yup.object().shape({}), []);
  const resolver = useYupValidationResolver(YupSchema);

  const methods = useForm<any>({
    resolver,
    mode: "all",
    defaultValues: {
      [FILTER_SEARCH]:
        filters?.find((filter) => filter.name === FILTER_SEARCH)?.value ||
        undefined,
    },
  });

  const onSubmit = React.useCallback(
    async (values) => {
      setFilters((prevFilters) =>
        produce(prevFilters, (draft) => {
          const matchedSearch = draft?.find((f) => f.name === FILTER_SEARCH);
          if (matchedSearch) {
            matchedSearch.value = values[FILTER_SEARCH];
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
          name={FILTER_SEARCH}
          type="text"
          size="large"
          placeholder="Cari Kode/Nama Supplier"
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

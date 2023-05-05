import Form from "@/components/elements/form";
import { styled, theme } from "@/config/stitches/theme.stitches";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Input } from "@/components/elements";
import { BxSearchSVG, CalendarSVG, DocumentScannerSVG } from "@/common/assets";
import ClipLoader from "react-spinners/ClipLoader";
import { Filter } from "@/common/repositories/common.model";
import { produce } from "immer";
import { HalfContainer } from "@/components/elements/styles";

interface Props {
  loading: boolean;
  filters: Filter[];
  setFilters: (value: React.SetStateAction<Filter[] | undefined>) => void;
}

const FILTER_MENU = "menu";
const FILTER_EVENT = "event";

export default function AdjustmentItemListFilterForm(props: Props) {
  const { loading, filters, setFilters } = props;
  const YupSchema = React.useMemo(() => Yup.object().shape({}), []);
  const resolver = useYupValidationResolver(YupSchema);

  const methods = useForm<any>({
    resolver,
    mode: "all",
    defaultValues: {
      [FILTER_MENU]:
        filters?.find((filter) => filter.name === FILTER_MENU)?.value ||
        undefined,
      [FILTER_EVENT]:
        filters?.find((filter) => filter.name === FILTER_EVENT)?.value ||
        undefined,
    },
  });

  const onSubmit = React.useCallback(
    async (values) => {
      setFilters((prevFilters) =>
        produce(prevFilters, (draft) => {
          const matchedSearch = draft?.find((f) => f.name === FILTER_MENU);
          const matchedDateAfter = draft?.find((f) => f.name === FILTER_EVENT);
          if (matchedSearch) matchedSearch.value = values[FILTER_MENU];
          if (matchedDateAfter) matchedDateAfter.value = values[FILTER_EVENT];
        })
      );
    },
    [setFilters]
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Container>
        <Input
          name={FILTER_MENU}
          type="select"
          size="large"
          options={
            filters?.find((filter) => filter.name === FILTER_MENU)?.options ||
            []
          }
          isClearable
          placeholder="Pilih Menu"
          isDisabled={loading}
          startEnhancer={
            <DocumentScannerSVG color={theme.colors.textPrimary.value} />
          }
          endEnhancer={loading && <ClipLoader size={24} />}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              methods.handleSubmit(onSubmit);
            }
          }}
        />
        <Input
          name={FILTER_EVENT}
          type="select"
          size="large"
          options={
            filters?.find((filter) => filter.name === FILTER_EVENT)?.options ||
            []
          }
          isClearable
          placeholder="Pilih Event"
          isDisabled={loading}
          startEnhancer={
            <DocumentScannerSVG color={theme.colors.textPrimary.value} />
          }
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

const Row = styled("div", {
  display: "flex",
  justifyContent: "space-between",
});

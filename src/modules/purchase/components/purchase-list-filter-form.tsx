import Form from "@/components/elements/form";
import { styled, theme } from "@/config/stitches/theme.stitches";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Input } from "@/components/elements";
import { BxSearchSVG, CalendarSVG } from "@/common/assets";
import ClipLoader from "react-spinners/ClipLoader";
import { Filter } from "@/common/repositories/common.model";
import { produce } from "immer";
import { HalfContainer } from "@/components/elements/styles";

interface Props {
  loading: boolean;
  filters: Filter[];
  setFilters: (value: React.SetStateAction<Filter[] | undefined>) => void;
}

const FILTER_SEARCH = "search";
const FILTER_DATE_BEFORE = "transaction_date_before";
const FILTER_DATE_AFTER = "transaction_date_after";

export default function PurchaseListFilterForm(props: Props) {
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
      [FILTER_SEARCH]:
        filters?.find((filter) => filter.name === FILTER_SEARCH)?.value ||
        undefined,
      [FILTER_DATE_BEFORE]:
        filters?.find((filter) => filter.name === FILTER_DATE_BEFORE)?.value ||
        undefined,
      [FILTER_DATE_AFTER]:
        filters?.find((filter) => filter.name === FILTER_DATE_AFTER)?.value ||
        undefined,
    },
  });

  const onSubmit = React.useCallback(
    async (values) => {
      setFilters((prevFilters) =>
        produce(prevFilters, (draft) => {
          const matchedCode = draft?.find((f) => f.name === FILTER_SEARCH);
          const matchedDateBefore = draft?.find(
            (f) => f.name === FILTER_DATE_BEFORE
          );
          const matchedDateAfter = draft?.find(
            (f) => f.name === FILTER_DATE_AFTER
          );
          if (matchedCode) matchedCode.value = values[FILTER_SEARCH];
          if (matchedDateAfter)
            matchedDateAfter.value = values[FILTER_DATE_AFTER];
          if (matchedDateBefore)
            matchedDateBefore.value = values[FILTER_DATE_BEFORE];
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
          placeholder="Cari Kode Pesanan Pembelian atau Nama Supplier"
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
        <Row>
          <HalfContainer>
            <Input
              name={FILTER_DATE_BEFORE}
              type="date"
              size="large"
              placeholder="Tanggal Awal"
              disabled={loading}
              startEnhancer={<CalendarSVG />}
              endEnhancer={loading && <ClipLoader size={24} />}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  methods.handleSubmit(onSubmit);
                }
              }}
            />
          </HalfContainer>
          <HalfContainer>
            <Input
              name={FILTER_DATE_AFTER}
              type="date"
              size="large"
              placeholder="Tanggal Akhir"
              disabled={loading}
              startEnhancer={<CalendarSVG />}
              endEnhancer={loading && <ClipLoader size={24} />}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  methods.handleSubmit(onSubmit);
                }
              }}
            />
          </HalfContainer>
        </Row>

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

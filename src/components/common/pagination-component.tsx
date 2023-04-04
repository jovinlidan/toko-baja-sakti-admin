import { BxChevronLeftSVG, BxChevronRightSVG } from "@/common/assets";
import { PaginationMeta } from "@/common/repositories/common.model";
import { css, styled, theme } from "@/config/stitches/theme.stitches";
import * as React from "react";
import Pagination from "react-paginate";
import { Text } from "../elements";
import Separator from "./separator";

interface Props {
  page: number;
  onPageChange: (page: number) => void;
  meta: PaginationMeta | undefined;
  onLimitChange: (limit: number) => void;
}

export default function PaginationComponent(props: Props) {
  const { page, onPageChange, meta, onLimitChange } = props;

  const [baseLimit, setBaseLimit] = React.useState<number>();

  React.useEffect(() => {
    if (!baseLimit && meta?.perPage) setBaseLimit(meta.perPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta?.perPage]);

  const onChangeLimit = React.useCallback(
    (e) => {
      onLimitChange(e?.nativeEvent?.target?.value);
    },
    [onLimitChange]
  );

  if (!meta) {
    return null;
  }

  const pageCount = Math.ceil(meta.total / meta.perPage);

  if (pageCount <= 0) {
    return null;
  }

  return (
    <PaginationContainer>
      <PaginationSectionContainer>
        {baseLimit && (
          <RowPerPage>
            <Text variant="body2">Baris per halaman: </Text>
            <Separator mr={4} />
            <StyledSelect value={meta.perPage} onChange={onChangeLimit}>
              <option>{baseLimit}</option>
              <option>{baseLimit * 2}</option>
              <option>{baseLimit * 3}</option>
            </StyledSelect>
          </RowPerPage>
        )}
        <Text variant="body2" color={theme.colors.textPrimary.value}>{`${
          meta?.from || 0
        }-${meta?.to || 0} of ${meta.total}`}</Text>
        <Separator mr={56} />
        <Pagination
          onPageChange={({ selected }) =>
            onPageChange(Math.min(Math.max(selected, 1), meta.lastPage))
          }
          pageCount={pageCount}
          forcePage={page}
          pageRangeDisplayed={-1}
          marginPagesDisplayed={-1}
          previousLabel={
            <BxChevronLeftSVG color={theme.colors.textPrimary.value} />
          }
          nextLabel={
            <BxChevronRightSVG color={theme.colors.textPrimary.value} />
          }
          containerClassName={styles.container()}
          previousClassName={styles.previous()}
          nextClassName={styles.next()}
          activeClassName={styles.active()}
          disabledClassName={styles.disabled()}
        />
      </PaginationSectionContainer>
    </PaginationContainer>
  );
}
const styles = {
  container: css({
    display: "flex",
    padding: 0,
  }),
  previous: css({
    marginRight: 12,
  }),
  next: css({
    marginLeft: 12,
  }),
  active: css({}),
  disabled: css({}),
};

const PaginationContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: "25px 34px 20px 0px",
});

const PaginationSectionContainer = styled("div", {
  display: "flex",
  alignItems: "center",
});

const RowPerPage = styled("div", {
  display: "flex",
  alignItems: "center",
  marginRight: 44,
});

const StyledSelect = styled("select", {
  border: "none",
  appearance: "none",
  background: "transparent",
  backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`,
  backgroundRepeat: "no-repeat",
  backgroundPositionX: "100%",
  backgroundPositionY: "5px",
  padding: "10px",
  paddingRight: "20px",
});

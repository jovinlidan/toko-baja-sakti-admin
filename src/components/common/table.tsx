import { useExpanded, useTable } from "react-table";
import * as React from "react";
import { styled, theme } from "@/config/stitches/theme.stitches";
import TypographyConstant from "@/config/stitches/typography.stitches";
import FetchWrapperComponent from "./fetch-wrapper-component";
import { ApiError, PaginationMeta } from "@/common/repositories/common.model";
import { Oval } from "react-loader-spinner";
import { Button, Text } from "../elements";
import Separator from "./separator";
import PaginationComponent from "./pagination-component";

export interface IColumn {
  Header: any;
  sortName?: string;
  onSort?: (column: any) => void;
  accessor?: string;
  maxWidth?: number;
  minWidth?: number;
  hide?: boolean;
  stickyRight?: boolean;
  prefix?: React.ReactNode;
  renderColumn?: (value: string) => any;
  columns?: IColumn[];
  isSorted?: boolean;
  isSortedDesc?: boolean;
  id?: string;
  Cell?: (value: any) => JSX.Element | null | string;
}
interface Props<T> {
  data: T;
  columns: IColumn[];
  loading?: boolean;
  error?: ApiError | null;
  onRetry?: () => void;
  meta?: PaginationMeta;
  queryKeyFn?: (input: any) => string[];

  page: number;
  setPage: (page: number) => void;
  setLimit: (imit: number) => void;
}
export default function TableComponent<T>(props: Props<T>) {
  const {
    columns,
    data,
    error,
    loading,
    onRetry,
    meta,
    page,
    setLimit,
    setPage,
  } = props;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data } as any);

  return (
    <Container>
      <TableContainer>
        <StyledTable {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps()}
                    key={column.id}
                    //@ts-ignore
                    stickyRight={column.stickyRight && !loading}
                    // css={{
                    //   maxWidth: column.maxWidth,
                    //   minWidth: column.minWidth,
                    // }}
                  >
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            <FetchWrapperComponent
              onRetry={onRetry}
              loadingComponent={
                <Tr>
                  <Td colSpan={columns.length} style={{ padding: 0 }}>
                    <LoadingContainer>
                      <Oval height={48} width={48} strokeWidth={2} />
                    </LoadingContainer>
                  </Td>
                </Tr>
              }
              isLoading={loading}
              error={error}
              errorComponent={
                <Tr>
                  <Td colSpan={columns.length} style={{ padding: 0 }}>
                    <LoadingContainer>
                      <Text
                        variant="body1"
                        color={theme.colors.errorMain.value}
                      >
                        Gagal Memuat
                      </Text>
                      <Separator mr={24} />
                      <Button
                        variant="error"
                        onClick={() => {
                          onRetry && onRetry();
                        }}
                      >
                        Coba Ulang
                      </Button>
                    </LoadingContainer>
                  </Td>
                </Tr>
              }
              component={
                !!rows.length ? (
                  <>
                    {rows.map((row) => {
                      prepareRow(row);
                      return (
                        <Tr {...row.getRowProps()} key={row.id}>
                          {row.cells.map((cell) => {
                            return (
                              <Td
                                {...cell.getCellProps()}
                                //@ts-ignore
                                stickyRight={cell.column.stickyRight}
                                key={cell.value}
                                // css={{
                                //   maxWidth: cell.column.maxWidth,
                                //   minWidth: cell.column.minWidth,
                                // }}
                              >
                                {cell.render("Cell")}
                              </Td>
                            );
                          })}
                        </Tr>
                      );
                    })}
                  </>
                ) : (
                  <Tr>
                    <Td colSpan={columns.length} style={{ padding: 0 }}>
                      <EmptyDataContainer>
                        <Text
                          variant="body1"
                          color={theme.colors.primaryDark.value}
                        >
                          Tidak ada data
                        </Text>
                      </EmptyDataContainer>
                    </Td>
                  </Tr>
                )
              }
            />
          </Tbody>
        </StyledTable>
      </TableContainer>
      <PaginationComponent
        onPageChange={(page) => setPage(page)}
        meta={meta}
        page={page}
        onLimitChange={(limit) => setLimit(limit)}
      />
    </Container>
  );
}

const Container = styled("div", {
  background: "#FFFF",
});
const TableContainer = styled("div", {
  overflowX: "auto",
});

const StyledTable = styled("table", {
  background: "#FFFF",
  borderCollapse: "collapse",
  width: "100%",
  // marginTop: 33,
  position: "sticky",
  top: 0,
});

const Tr = styled("tr", {
  width: "100%",
  borderBottom: "1px solid rgba(50, 71, 92, 0.22)",
});
const Th = styled("th", {
  paddingTop: 24,
  paddingBottom: 16,
  paddingLeft: 16,
  paddingRight: 16,

  textTransform: "uppercase",
  color: "$textPrimary",
  textAlign: "start",
  ...TypographyConstant.tableHeader,

  variants: {
    stickyRight: {
      true: {
        "&:before": {
          content: `''`,
          position: "absolute",
          width: 0.5,
          left: 0,
          top: 0,
          bottom: 0,
          background: theme.colors.textPrimary.value,
        },
        right: 0,
        position: "sticky",
        textAlign: "center",
        background: "$primaryContrast",
      },
    },
  },
});
const Td = styled("td", {
  paddingTop: 16,
  paddingBottom: 12,
  paddingLeft: 16,
  paddingRight: 16,
  whiteSpace: "nowrap",
  color: "$textPrimary",

  ...TypographyConstant.body2,

  variants: {
    stickyRight: {
      true: {
        "&:before": {
          content: `''`,
          position: "absolute",
          width: 0.5,
          left: 0,
          top: 0,
          bottom: 0,
          background: theme.colors.textPrimary.value,
        },
        right: 0,
        position: "sticky",
        background: "$primaryContrast",
      },
    },
  },
});

const Thead = styled("thead", {
  width: "100%",
});
const Tbody = styled("tbody", {
  width: "100%",
});

const LoadingContainer = styled("div", {
  background: "$actionDisabledBackground",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 100,
});

const EmptyDataContainer = styled("div", {
  background: "$backgroundPaper",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 100,
});

import { Column, useTable } from "react-table";
import * as React from "react";
import { styled, theme } from "@/config/stitches/theme.stitches";
import TypographyConstant from "@/config/stitches/typography.stitches";

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
}
export default function TableComponent<T>(props: Props<T>) {
  const { columns, data } = props;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data } as any);

  return (
    <StyledTable {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <Th
                {...column.getHeaderProps()}
                key={column.id}
                //@ts-ignore
                stickyRight={column.stickyRight}
              >
                {column.render("Header")}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
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
                  >
                    {cell.render("Cell")}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </StyledTable>
  );
}

const StyledTable = styled("table", {
  background: "#FFFF",
  borderCollapse: "collapse",
  width: "100%",
  marginTop: 33,
  display: "block",
  overflowX: "auto",
});

const Tr = styled("tr", {
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

const Thead = styled("thead", {});
const Tbody = styled("tbody", {});

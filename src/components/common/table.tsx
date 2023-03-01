import { Column, useTable } from "react-table";
import * as React from "react";
import { styled } from "@/config/stitches/theme.stitches";
import TypographyConstant from "@/config/stitches/typography.stitches";
export default function TableComponent() {
  const data = React.useMemo(
    () => [
      {
        col1: "Hello",
        col2: "World",
      },
      {
        col1: "react-table",
        col2: "rocks",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
    ],
    []
  );

  const columns: readonly Column<{}>[] = React.useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Column 2",
        accessor: "col2",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <StyledTable {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps()} key={column.id}>
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
                  <Td {...cell.getCellProps()} key={cell.value}>
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
});

const Tr = styled("tr", {
  // background: "red",
  borderBottom: "1px solid rgba(50, 71, 92, 0.22)",
  // borderBottomColor: "red",
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
});
const Td = styled("td", {
  paddingTop: 16,
  paddingBottom: 12,
  paddingLeft: 16,
  paddingRight: 16,

  color: "$textPrimary",
  ...TypographyConstant.body2,
});

const Thead = styled("thead", {});
const Tbody = styled("tbody", {});

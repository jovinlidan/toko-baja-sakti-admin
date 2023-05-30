import { SalesItemLite } from "@/api-hooks/sales-item/sales-item.model";
import TableComponent, { IColumn } from "@/components/common/table";
import { Button, Text } from "@/components/elements";
import { useFormState } from "@/components/elements/form";
import { styled } from "@/config/stitches/theme.stitches";
import { string2money } from "@/utils/string";
import * as React from "react";

export type SaleReturnItemTableDataType = {
  quantity: number;
  reason: string;
  sriId?: string;
} & SalesItemLite;

interface Props {
  data: SaleReturnItemTableDataType[];
  onDelete: (index: number) => void;
  grandTotal: number;
}

export default function SaleReturnItemTable(props: Props) {
  const { editable } = useFormState();
  const { data, onDelete, grandTotal = 0 } = props;

  const columns = React.useMemo<IColumn[]>(
    () => [
      {
        Header: "Kode",
        accessor: "item.code",
      },
      {
        Header: "Nama",
        accessor: "item.categoryItem.name",
      },
      {
        Header: "Merek",
        accessor: "item.categoryItem.brand",
      },
      {
        Header: "Ukuran",
        accessor: "item.size",
      },
      {
        Header: "Tebal",
        accessor: "item.thick",
      },
      {
        Header: "Warna",
        accessor: "item.color",
      },
      {
        Header: "Jumlah Jual",
        accessor: "saleQuantity",
      },
      {
        Header: "Jumlah Retur",
        accessor: "quantity",
      },
      {
        Header: "Satuan",
        accessor: "unit",
      },
      {
        Header: "Harga Satuan",
        accessor: "priceUnit",
        Cell: ({ value }) => {
          return <>Rp {value ? string2money(value) : "-"}</>;
        },
      },
      {
        Header: "Total Harga",
        accessor: "grandTotal",
        Cell({ row }) {
          if (row?.original?.quantity && row?.original?.price)
            return (
              <>
                Rp {string2money(row.original?.quantity * row?.original?.price)}
              </>
            );
          return <>Rp 0</>;
        },
      },
      {
        Header: "Alasan",
        accessor: "reason",
      },
      {
        Header: "",
        accessor: "detail",
        Cell: ({ row }) => {
          if (!editable) return null;
          return (
            <Button
              size="small"
              variant="error"
              onClick={() => onDelete(row.index)}
            >
              HAPUS
            </Button>
          );
        },
        stickyRight: editable,
      },
    ],
    [editable, onDelete]
  );
  return (
    <>
      <TableComponent
        columns={columns}
        data={data || []}
        name="salesReturnItems"
      />
      <TextContainer>
        <Text variant="buttonLarge">
          GRAND TOTAL : Rp {string2money(grandTotal)}
        </Text>
      </TextContainer>
    </>
  );
}

const TextContainer = styled("div", {
  display: "flex",
  flex: 1,
  justifyContent: "flex-end",
  mt: 20,
});

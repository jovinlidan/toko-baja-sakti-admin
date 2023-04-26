import { SalesOrderItemLite } from "@/api-hooks/sales-order-item/sales-order-item.model";
import TableComponent, { IColumn } from "@/components/common/table";
import { Button } from "@/components/elements";
import { useFormState } from "@/components/elements/form";
import { string2money } from "@/utils/string";
import * as React from "react";

export type SaleItemTableDataType = {
  quantity: number;
  price: number;
  siId?: string;
} & SalesOrderItemLite;

interface Props {
  data: SaleItemTableDataType[];
  onDelete: (index: number) => void;
}

export default function SaleItemTable(props: Props) {
  const { editable } = useFormState();
  const { data, onDelete } = props;

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
        Header: "Jumlah",
        accessor: "quantity",
      },
      {
        Header: "Satuan",
        accessor: "unit",
      },
      {
        Header: "Harga Satuan",
        accessor: "price",
      },
      {
        Header: "Total",
        accessor: "grandTotal",
        Cell({ row }) {
          if (row?.original?.quantity && row?.original?.price)
            return (
              <>
                Rp{string2money(row.original?.quantity * row?.original?.price)}
              </>
            );
          return <>Rp 0</>;
        },
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
    <TableComponent columns={columns} data={data || []} name="salesItems" />
  );
}

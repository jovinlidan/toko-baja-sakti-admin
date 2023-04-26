import { Item } from "@/api-hooks/item/item.model";
import TableComponent, { IColumn } from "@/components/common/table";
import { Button } from "@/components/elements";
import { useFormState } from "@/components/elements/form";
import * as React from "react";

export type ItemTableDataType = {
  quantity: number;
  unit: string;
  poiId?: string;
} & Item;

interface Props {
  data: ItemTableDataType[];
  onDelete: (index: number) => void;
}

export default function TableItem(props: Props) {
  const { editable } = useFormState();
  const { data, onDelete } = props;

  const columns = React.useMemo<IColumn[]>(
    () => [
      {
        Header: "Kode",
        accessor: "code",
      },
      {
        Header: "Nama",
        accessor: "categoryItem.name",
      },
      {
        Header: "Merek",
        accessor: "categoryItem.brand",
      },
      {
        Header: "Ukuran",
        accessor: "size",
      },
      {
        Header: "Tebal",
        accessor: "thick",
      },
      {
        Header: "Warna",
        accessor: "color",
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
    <TableComponent
      columns={columns}
      data={data || []}
      name="purchaseOrderItems"
    />
  );
}

import { Item } from "@/api-hooks/item/item.model";
import { PurchaseOrderItemLite } from "@/api-hooks/purchase-order-item/purchase-order-item.model";
import TableComponent, { IColumn } from "@/components/common/table";
import { Button } from "@/components/elements";
import { useFormState } from "@/components/elements/form";
import { string2money } from "@/utils/string";
import * as React from "react";

export type PurchaseOrderItemTableDataType = {
  quantity: number;
  price: number;
  poiId?: string;
} & PurchaseOrderItemLite;

interface Props {
  data: PurchaseOrderItemTableDataType[];
  onDelete: (index: number) => void;
}

export default function PurchaseOrderItemTable(props: Props) {
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
    <TableComponent
      columns={columns}
      data={data || []}
      name="purchaseItems.0.purchaseOrderItemId"
    />
  );
}

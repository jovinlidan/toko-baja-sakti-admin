import { Item } from "@/api-hooks/item/item.model";
import { PurchaseOrderItemLite } from "@/api-hooks/purchase-order-item/purchase-order-item.model";
import Separator from "@/components/common/separator";
import TableComponent, { IColumn } from "@/components/common/table";
import { Button, Text } from "@/components/elements";
import { useFormState } from "@/components/elements/form";
import { styled } from "@/config/stitches/theme.stitches";
import { string2money } from "@/utils/string";
import * as React from "react";

export type PurchaseOrderItemTableDataType = {
  quantity: number;
  price: number;
  piId?: string;
} & PurchaseOrderItemLite;

interface Props {
  data: PurchaseOrderItemTableDataType[];
  onDelete: (index: number) => void;
  grandTotal: number;
}

export default function PurchaseOrderItemTable(props: Props) {
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
        Header: "Jumlah",
        accessor: "quantity",
      },
      {
        Header: "Jumlah Belum Diterima",
        accessor: "amountNotReceived",
      },
      {
        Header: "Satuan",
        accessor: "unit",
      },
      {
        Header: "Harga Satuan",
        accessor: "price",
        Cell: ({ value }) => {
          return <>Rp {value ? string2money(value) : ""}</>;
        },
      },
      {
        Header: "Total",
        accessor: "total",
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
    <>
      <TableComponent
        columns={columns}
        data={data || []}
        name="purchaseItems.0.purchaseOrderItemId"
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

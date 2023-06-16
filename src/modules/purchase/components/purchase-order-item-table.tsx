import { Item } from "@/api-hooks/item/item.model";
import { PurchaseOrderItemLite } from "@/api-hooks/purchase-order-item/purchase-order-item.model";
import Separator from "@/components/common/separator";
import TableComponent, { IColumn } from "@/components/common/table";
import { Button, Text } from "@/components/elements";
import { useFormState } from "@/components/elements/form";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import { string2money } from "@/utils/string";
import { useRouter } from "next/router";
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
  showAmountNotReceived?: boolean;
  id?: string;
}

export default function PurchaseOrderItemTable(props: Props) {
  const { editable } = useFormState();
  const { data, onDelete, grandTotal = 0, showAmountNotReceived, id } = props;
  const router = useRouter();

  const onNavigateEditPurchaseOrderItem = React.useCallback(
    (itemId) => {
      router.push({
        pathname: routeConstant.PurchaseEditOrderItemEdit,
        query: {
          id,
          itemId,
        },
      });
    },
    [id, router]
  );

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
      ...(showAmountNotReceived
        ? [
            {
              Header: "Jumlah Belum Diterima",
              accessor: "amountNotReceived",
            },
          ]
        : []),

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
      ...(id && !editable
        ? [
            {
              Header: "",
              accessor: "detail",
              Cell: ({ row }) => {
                return (
                  <Button
                    size="small"
                    variant="primary"
                    onClick={() =>
                      onNavigateEditPurchaseOrderItem(row.original.id)
                    }
                  >
                    Detail
                  </Button>
                );
              },
              stickyRight: editable,
            },
          ]
        : []),
    ],
    [editable, id, onNavigateEditPurchaseOrderItem, showAmountNotReceived]
  );
  return (
    <>
      <TableComponent
        columns={columns}
        data={data || []}
        name="purchaseItems"
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

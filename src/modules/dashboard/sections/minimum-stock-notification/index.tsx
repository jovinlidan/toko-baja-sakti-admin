import Separator from "@/components/common/separator";
import TableComponent, { IColumn } from "@/components/common/table";
import { Button, Text } from "@/components/elements";
import { FullContainer } from "@/components/elements/styles";
import { styled } from "@/config/stitches/theme.stitches";
import * as React from "react";
export default function MinimumStockNotification() {
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
        Header: "Stok Minimum",
        accessor: "minimumStock",
      },
      {
        Header: "Stok",
        accessor: "stock",
      },
    ],
    []
  );
  return (
    <Container>
      <Text variant="h5">Notifikasi Stok Minimum</Text>
      <Separator mb={24} />
      <FullContainer direction="column" style={{ padding: "0px" }}>
        <TableComponent columns={columns} data={[]} />
        <CetakContainer>
          <Button onClick={() => {}} variant="info">
            CETAK
          </Button>
        </CetakContainer>
      </FullContainer>
    </Container>
  );
}
const Container = styled("div", {});

const CetakContainer = styled("div", {
  padding: "24px 32px 20px 0px",
  marginLeft: "auto",
});

import { PlusSVG } from "@/common/assets";
import Separator from "@/components/common/separator";
import TableComponent, { IColumn } from "@/components/common/table";
import { Button } from "@/components/elements";
import { styled, theme } from "@/config/stitches/theme.stitches";
import BarangListFilterForm from "./components/barang-list-filter-form";
import * as React from "react";
import { ApiError } from "@/common/repositories/common.model";

const fakeData = [
  {
    kode: "I-0001",
    nama: "Kawat",
    merk: "Enka",
    ukuran: "nk2.6",
    tebal: "1.8 mm",
    warna: "Putih",
    stok: 5,
    stokMinimum: 3,
    hargaEcer: "Rp 10.000",
    hargaGrosir: "Rp 11.000",
    satuanKecil: "Kg",
    satuanBesar: "Kotak",
    ketersediaan: "Tersedia",
    status: "Aktif",
  },
  {
    kode: "I-0002",
    nama: "Kawat",
    merk: "Enka",
    ukuran: "nk2.6",
    tebal: "1.8 mm",
    warna: "Putih",
    stok: 5,
    stokMinimum: 3,
    hargaEcer: "Rp 10.000",
    hargaGrosir: "Rp 11.000",
    satuanKecil: "Kg",
    satuanBesar: "Kotak",
    ketersediaan: "Tersedia",
    status: "Aktif",
  },
  {
    kode: "I-0003",
    nama: "Kawat",
    merk: "Enka",
    ukuran: "nk2.6",
    tebal: "1.8 mm",
    warna: "Putih",
    stok: 5,
    stokMinimum: 3,
    hargaEcer: "Rp 10.000",
    hargaGrosir: "Rp 11.000",
    satuanKecil: "Kg",
    satuanBesar: "Kotak",
    ketersediaan: "Tersedia",
    status: "Aktif",
  },
];

export default function BarangList() {
  const columns = React.useMemo<IColumn[]>(
    () => [
      {
        Header: "Kode",
        accessor: "kode",
      },
      {
        Header: "Nama",
        accessor: "nama",
      },
      {
        Header: "Merk",
        accessor: "merk",
      },
      {
        Header: "Ukuran",
        accessor: "ukuran",
      },
      {
        Header: "Tebal",
        accessor: "tebal",
      },
      {
        Header: "Warna",
        accessor: "warna",
      },
      {
        Header: "Stok",
        accessor: "stok",
      },
      {
        Header: "Stok Minimum",
        accessor: "stokMinimum",
      },
      {
        Header: "Harga Ecer",
        accessor: "hargaEcer",
      },
      {
        Header: "Harga Grosir",
        accessor: "hargaGrosir",
      },
      {
        Header: "Satuan Kecil",
        accessor: "satuanKecil",
      },
      {
        Header: "Satuan Besar",
        accessor: "satuanBesar",
      },
      {
        Header: "Ketersediaan",
        accessor: "ketersediaan",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "",
        accessor: "detail",
        Cell: () => <Button size="small">Detail</Button>,
        stickyRight: true,
      },
    ],
    []
  );
  return (
    <Container>
      <BarangListFilterForm />
      <TopContainer>
        <Button
          size="large"
          startEnhancer={(size) => (
            <PlusSVG
              width={size}
              height={size}
              color={theme.colors.primaryContrast.value}
            />
          )}
        >
          TAMBAH KATEGORI
        </Button>
        <Separator mr={24} />
        <Button
          size="large"
          startEnhancer={(size) => (
            <PlusSVG
              width={size}
              height={size}
              color={theme.colors.primaryContrast.value}
            />
          )}
        >
          TAMBAH KATEGORI
        </Button>
      </TopContainer>

      <TableComponent columns={columns} data={fakeData} />
    </Container>
  );
}

const Container = styled("div", {});

const TopContainer = styled("div", {
  display: "flex",
  alignItems: "center",
});

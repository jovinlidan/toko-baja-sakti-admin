import TableComponent, { IColumn } from "@/components/common/table";
import { Button } from "@/components/elements";
import * as React from "react";

const fakeData = [
  {
    kode: "I-0001",
    nama: "Kawat",
    merk: "Enka",
    satuanKecil: "Kg",
    satuanBesar: "Kotak",
    konversiSatuan: 3,
  },
  {
    kode: "I-0002",
    nama: "Kawat",
    merk: "Enka",
    satuanKecil: "Kg",
    satuanBesar: "Kotak",
    konversiSatuan: 3,
  },
  {
    kode: "I-0003",
    nama: "Kawat",
    merk: "Enka",
    satuanKecil: "Kg",
    satuanBesar: "Kotak",
    konversiSatuan: 3,
  },
];

export default function CategoryCreateTable() {
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
        Header: "Satuan Kecil",
        accessor: "satuanKecil",
      },
      {
        Header: "Satuan Besar",
        accessor: "satuanBesar",
      },
      {
        Header: "Konversi Satuan",
        accessor: "konversiSatuan",
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
  return <TableComponent columns={columns} data={fakeData} />;
}

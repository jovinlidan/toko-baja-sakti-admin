import { useGetCategoryItem } from "@/api-hooks/category-item/category-item.query";
import { getReportInput } from "@/api-hooks/report/report.model";
import { CalendarSVG, DocumentScannerSVG } from "@/common/assets";
import { InputType } from "@/components/elements/input";
import CustomerSelectOption from "@/components/elements/select-input-helper/customer-select-input";
import ItemSelectOption from "@/components/elements/select-input-helper/item-select-input";
import SupplierSelectOption from "@/components/elements/select-input-helper/supplier-select-input";
import { theme } from "@/config/stitches/theme.stitches";

export enum ReportType {
  CategoryItem = "category-item-report",
  Supplier = "supplier-report",
  Customer = "customer-report",
  CategoryItemWithoutPrice = "category-item-without-price-report",
  SupplierItem = "supplier-item-report",
  SalesOrder = "sales-order-report",
  Sales = "sales-report",
  Return = "return-report",
  PurchaseOrder = "purchase-order-report",
  Purchase = "purchase-report",
  AdjustmentItem = "adjustment-item-report",
  StockItem = "stock-item-report",
  StockItemTransaction = "stock-item-transaction-report",
  GraphSales = "graph-sales-report",
  NotificationStockMinimum = "notification-stock-minimum-report",
}

const LIST_MONTH = [
  { label: "Januari", value: "1" },
  { label: "Februari", value: "2" },
  { label: "Maret", value: "3" },
  { label: "April", value: "4" },
  { label: "Mei", value: "5" },
  { label: "Juni", value: "6" },
  { label: "Juli", value: "7" },
  { label: "Agustus", value: "8" },
  { label: "September", value: "9" },
  { label: "Oktober", value: "10" },
  { label: "November", value: "11" },
  { label: "Desember", value: "12" },
];

interface IReport {
  label: string;
  value: ReportType;
}

export const reportOptions: IReport[] = [
  {
    label: "Laporan Kategory Barang",
    value: ReportType.CategoryItem,
  },
  {
    label: "Laporan Supplier",
    value: ReportType.Supplier,
  },
  {
    label: "Laporan Pelanggan",
    value: ReportType.Customer,
  },
  {
    label: "Laporan Kategori Barang Tanpa Harga",
    value: ReportType.CategoryItemWithoutPrice,
  },
  {
    label: "Laporan Supplier Barang",
    value: ReportType.SupplierItem,
  },
  {
    label: "Laporan Pesanan Penjualan",
    value: ReportType.SalesOrder,
  },
  {
    label: "Laporan Penjualan",
    value: ReportType.Sales,
  },
  {
    label: "Laporan Retur",
    value: ReportType.Return,
  },
  {
    label: "Laporan Pesanan Pembelian",
    value: ReportType.PurchaseOrder,
  },
  {
    label: "Laporan Pembelian",
    value: ReportType.Purchase,
  },
  {
    label: "Laporan Penyesuaian Barang",
    value: ReportType.AdjustmentItem,
  },
  {
    label: "Laporan Stok Barang",
    value: ReportType.StockItem,
  },
  {
    label: "Laporan Transaksi Stok Barang",
    value: ReportType.StockItemTransaction,
  },
  {
    label: "Laporan Grafik Penjualan",
    value: ReportType.GraphSales,
  },
  {
    label: "Laporan Notifikasi Minimal Stok",
    value: ReportType.NotificationStockMinimum,
  },
];

export type TFilterMetadataInput =
  | {
      type: "input";
      input: "text" | "date" | "select";
      name: string;
      placeholder: string;
      required?: boolean;
      options?: any[];
      startEnhancer?: React.ReactNode;
    }
  | {
      type: "component";
      component: any;
      name: string;
      placeholder: string;
      required?: boolean;
    };

export type TFilterMetadata =
  | {
      type: "row";
      components: TFilterMetadataInput[];
    }
  | TFilterMetadataInput;

export function getReportFilterMetadata(type: ReportType): TFilterMetadata[] {
  switch (type) {
    case ReportType.SalesOrder:
      return [
        {
          type: "component",
          component: CustomerSelectOption,
          name: "filter.user_id",
          placeholder: "Pilih Pelanggan",
        },
        {
          type: "row",
          components: [
            {
              type: "input",
              input: "date",
              name: "filter.start_at",
              placeholder: "Tanggal Awal",
              required: true,
            },
            {
              type: "input",
              input: "date",
              name: "filter.end_at",
              placeholder: "Tanggal Akhir",
              required: true,
            },
          ],
        },
      ];
    case ReportType.Sales:
      return [
        {
          type: "component",
          component: CustomerSelectOption,
          name: "filter.user_id",
          placeholder: "Pilih Pelanggan",
        },
        {
          type: "row",
          components: [
            {
              type: "input",
              input: "date",
              name: "filter.start_at",
              placeholder: "Tanggal Awal",
              required: true,
            },
            {
              type: "input",
              input: "date",
              name: "filter.end_at",
              placeholder: "Tanggal Akhir",
              required: true,
            },
          ],
        },
      ];
    case ReportType.Return:
      return [
        {
          type: "component",
          component: CustomerSelectOption,
          name: "filter.user_id",
          placeholder: "Pilih Pelanggan",
        },
        {
          type: "row",
          components: [
            {
              type: "input",
              input: "date",
              name: "filter.start_at",
              placeholder: "Tanggal Awal",
              required: true,
            },
            {
              type: "input",
              input: "date",
              name: "filter.end_at",
              placeholder: "Tanggal Akhir",
              required: true,
            },
          ],
        },
      ];
    case ReportType.PurchaseOrder:
      return [
        {
          type: "component",
          component: SupplierSelectOption,
          name: "filter.supplier_id",
          placeholder: "Pilih Supplier",
        },
        {
          type: "row",
          components: [
            {
              type: "input",
              input: "date",
              name: "filter.start_at",
              placeholder: "Tanggal Awal",
              required: true,
            },
            {
              type: "input",
              input: "date",
              name: "filter.end_at",
              placeholder: "Tanggal Akhir",
              required: true,
            },
          ],
        },
      ];
    case ReportType.Purchase:
      return [
        {
          type: "component",
          component: SupplierSelectOption,
          name: "filter.supplier_id",
          placeholder: "Pilih Supplier",
        },
        {
          type: "row",
          components: [
            {
              type: "input",
              input: "date",
              name: "filter.start_at",
              placeholder: "Tanggal Awal",
              required: true,
            },
            {
              type: "input",
              input: "date",
              name: "filter.end_at",
              placeholder: "Tanggal Akhir",
              required: true,
            },
          ],
        },
      ];
    case ReportType.AdjustmentItem:
      return [
        {
          type: "row",
          components: [
            {
              type: "input",
              input: "date",
              name: "filter.start_at",
              placeholder: "Tanggal Awal",
              required: true,
            },
            {
              type: "input",
              input: "date",
              name: "filter.end_at",
              placeholder: "Tanggal Akhir",
              required: true,
            },
          ],
        },
      ];
    case ReportType.StockItemTransaction:
      return [
        {
          type: "component",
          component: ItemSelectOption,
          name: "filter.item_id",
          placeholder: "Pilih Barang",
        },
        {
          type: "row",
          components: [
            {
              type: "input",
              input: "date",
              name: "filter.start_at",
              placeholder: "Tanggal Awal",
            },
            {
              type: "input",
              input: "date",
              name: "filter.end_at",
              placeholder: "Tanggal Akhir",
            },
          ],
        },
      ];
    case ReportType.GraphSales:
      return [
        {
          type: "input",
          input: "select",
          name: "year",
          placeholder: "Pilih Tahun",
          options: [{ label: "2023", value: "2023" }],
          required: true,
          startEnhancer: (
            <DocumentScannerSVG color={theme.colors.textPrimary.value} />
          ),
        },
        {
          type: "row",
          components: [
            {
              type: "input",
              input: "select",
              name: "start_month",
              placeholder: "Pilih Bulan Awal",
              options: LIST_MONTH,
              required: true,
              startEnhancer: <CalendarSVG />,
            },
            {
              type: "input",
              input: "select",
              name: "end_month",
              placeholder: "Pilih Bulan Akhir",
              options: LIST_MONTH,
              required: true,
              startEnhancer: <CalendarSVG />,
            },
          ],
        },
      ];
    default:
      return [];
  }
}

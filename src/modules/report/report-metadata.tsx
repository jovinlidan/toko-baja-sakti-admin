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
    label: "Daftar pelanggan",
    value: ReportType.Customer,
  },
  {
    label: "Daftar supplier",
    value: ReportType.Supplier,
  },
  {
    label: "Daftar harga barang",
    value: ReportType.CategoryItem,
  },
  {
    label: "Daftar barang",
    value: ReportType.CategoryItemWithoutPrice,
  },
  {
    label: "Informasi barang per supplier",
    value: ReportType.SupplierItem,
  },
  {
    label: "Laporan pesanan penjualan",
    value: ReportType.SalesOrder,
  },
  {
    label: "Laporan penjualan",
    value: ReportType.Sales,
  },
  {
    label: "Laporan retur penjualan",
    value: ReportType.Return,
  },
  {
    label: "Laporan pesanan pembelian",
    value: ReportType.PurchaseOrder,
  },
  {
    label: "Laporan pembelian",
    value: ReportType.Purchase,
  },
  {
    label: "Laporan penyesuaian barang",
    value: ReportType.AdjustmentItem,
  },
  {
    label: "Laporan persediaan",
    value: ReportType.StockItem,
  },
  {
    label: "Kartu persediaan",
    value: ReportType.StockItemTransaction,
  },
  {
    label: "Notifikasi stok minimum",
    value: ReportType.NotificationStockMinimum,
  },
  {
    label: "Grafik penjualan",
    value: ReportType.GraphSales,
  },
];

export type TFilterMetadataInput =
  | {
      type: "input";
      input: "text" | "date" | "select";
      name: string;
      placeholder: string;
      required?: boolean | ((values: any) => boolean);
      options?: any[];
      startEnhancer?: React.ReactNode;
    }
  | {
      type: "component";
      component: any;
      name: string;
      placeholder: string;
      required?: boolean | ((values: any) => boolean);
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
    case ReportType.Sales:
    case ReportType.Return:
      return [
        {
          type: "component",
          component: CustomerSelectOption,
          name: "filter.user_id",
          placeholder: "Pilih Pelanggan",
          required: (values) => {
            if (!values?.filter?.start_at && !values?.filter?.end_at)
              return true;
            return false;
          },
        },
        {
          type: "row",
          components: [
            {
              type: "input",
              input: "date",
              name: "filter.start_at",
              placeholder: "Tanggal Awal",
              required: (values) => {
                if (values?.filter?.end_at || !values?.filter?.user_id)
                  return true;
                return false;
              },
            },
            {
              type: "input",
              input: "date",
              name: "filter.end_at",
              placeholder: "Tanggal Akhir",
              required: (values) => {
                if (values?.filter?.start_at || !values?.filter?.user_id)
                  return true;
                return false;
              },
            },
          ],
        },
      ];
    case ReportType.PurchaseOrder:
    case ReportType.Purchase:
      return [
        {
          type: "component",
          component: SupplierSelectOption,
          name: "filter.supplier_id",
          placeholder: "Pilih Supplier",
          required: (values) => {
            if (!values?.filter?.start_at && !values?.filter?.end_at)
              return true;
            return false;
          },
        },
        {
          type: "row",
          components: [
            {
              type: "input",
              input: "date",
              name: "filter.start_at",
              placeholder: "Tanggal Awal",
              required: (values) => {
                if (values?.filter?.end_at || !values?.filter?.supplier_id)
                  return true;
                return false;
              },
            },
            {
              type: "input",
              input: "date",
              name: "filter.end_at",
              placeholder: "Tanggal Akhir",
              required: (values) => {
                if (values?.filter?.start_at || !values?.filter?.supplier_id)
                  return true;
                return false;
              },
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
          required: (values) => {
            if (!values?.filter?.start_at && !values?.filter?.end_at)
              return true;
            return false;
          },
        },
        {
          type: "row",
          components: [
            {
              type: "input",
              input: "date",
              name: "filter.start_at",
              placeholder: "Tanggal Awal",
              required: (values) => {
                if (values?.filter?.end_at || !values?.filter?.item_id)
                  return true;
                return false;
              },
            },
            {
              type: "input",
              input: "date",
              name: "filter.end_at",
              placeholder: "Tanggal Akhir",
              required: (values) => {
                if (values?.filter?.start_at || !values?.filter?.item_id)
                  return true;
                return false;
              },
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

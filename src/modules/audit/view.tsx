import { BxChevronLeftSVG } from "@/common/assets";
import FetchWrapperComponent from "@/components/common/fetch-wrapper-component";
import Separator from "@/components/common/separator";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import useDialog from "@/hooks/use-dialog";
import { useRouter } from "next/router";
import { useGetAudit } from "@/api-hooks/audit/audit.query";
import { useMemo } from "react";
import { AuditableTypeEnum } from "@/api-hooks/audit/audit.model";

import FormCategoryItem from "@/modules/category-item/components/form";
import FormItem from "@/modules/item/components/form";
import FormCustomer from "@/modules/customer/components/form";
import FormSupplier from "@/modules/supplier/components/form";
import FormPurchaseOrder from "@/modules/purchase-order/components/form";
import FormPurchase from "@/modules/purchase/components/form";
import FormSalesOrder from "@/modules/sale-order/components/form";
import FormSales from "@/modules/sale/components/form";
import FormSalesReturn from "@/modules/sale-return/components/form";
import FormAdjustmentItem from "@/modules/adjustment-item/components/form";

import { plainToClass } from "class-transformer";
import { Text } from "@/components/elements";

import { CategoryItem } from "@/api-hooks/category-item/category-item.model";
import { Item } from "@/api-hooks/item/item.model";
import { Customer } from "@/api-hooks/customer/customer.model";
import { PurchaseOrder } from "@/api-hooks/purchase-order/purchase-order.model";
import { Purchase } from "@/api-hooks/purchase/purchase.model";
import { SalesOrder } from "@/api-hooks/sales-order/sales-order.model";
import { Sale } from "@/api-hooks/sales/sales.model";
import { SaleReturn } from "@/api-hooks/sales-return/sales-return.model";
import { AdjustmentItem } from "@/api-hooks/adjustment-item/adjustment-item.model";
import { Supplier } from "@/api-hooks/supplier/supplier.model";

export default function ViewAdjustmentItem() {
  const router = useRouter();

  const { data, isLoading, isFetching, error, refetch } = useGetAudit(
    {
      id: router?.query?.id as string,
    },
    { enabled: !!router?.query?.id }
  );

  const FormComponent: any = useMemo(() => {
    if (!data?.data?.auditableType) return <></>;
    switch (data?.data.auditableType) {
      case AuditableTypeEnum.CategoryItem:
        return FormCategoryItem;
      case AuditableTypeEnum.Item:
        return FormItem;
      case AuditableTypeEnum.User:
        return FormCustomer;
      case AuditableTypeEnum.Supplier:
        return FormSupplier;
      case AuditableTypeEnum.PurchaseOrder:
        return FormPurchaseOrder;
      case AuditableTypeEnum.Purchase:
        return FormPurchase;
      case AuditableTypeEnum.SalesOrder:
        return FormSalesOrder;
      case AuditableTypeEnum.Sales:
        return FormSales;
      case AuditableTypeEnum.SalesReturn:
        return FormSalesReturn;
      case AuditableTypeEnum.AdjustmentItem:
        return FormAdjustmentItem;
    }
    return <></>;
  }, [data?.data?.auditableType]);

  const valuesClass = useMemo(() => {
    if (!data?.data?.auditableType) return class {};
    switch (data?.data?.auditableType) {
      case AuditableTypeEnum.CategoryItem:
        return CategoryItem;
      case AuditableTypeEnum.Item:
        return Item;
      case AuditableTypeEnum.User:
        return Customer;
      case AuditableTypeEnum.Supplier:
        return Supplier;
      case AuditableTypeEnum.PurchaseOrder:
        return PurchaseOrder;
      case AuditableTypeEnum.Purchase:
        return Purchase;
      case AuditableTypeEnum.SalesOrder:
        return SalesOrder;
      case AuditableTypeEnum.Sales:
        return Sale;
      case AuditableTypeEnum.SalesReturn:
        return SaleReturn;
      case AuditableTypeEnum.AdjustmentItem:
        return AdjustmentItem;
    }
    return class {};
  }, [data?.data?.auditableType]);

  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.AuditList}
        startEnhancer={(color) => <BxChevronLeftSVG color={color} />}
      />
      <Separator mb={24} />
      <FetchWrapperComponent
        isLoading={isLoading || isFetching}
        error={error}
        onRetry={refetch}
        component={
          <>
            {!!data?.data?.oldValues && (
              <Column>
                <Text variant="h6">Data Lama</Text>
                <Separator mb={20} />
                <FormComponent
                  data={plainToClass(valuesClass, data?.data?.oldValues)}
                  onSubmit={() => {}}
                  defaultEditable={false}
                />
              </Column>
            )}
            {!!data?.data?.newValues && (
              <Column>
                <Text variant="h6">Data Baru</Text>
                <Separator mb={20} />
                <FormComponent
                  data={plainToClass(valuesClass, data?.data?.newValues)}
                  onSubmit={() => {}}
                  defaultEditable={false}
                />
              </Column>
            )}
          </>
        }
      />
    </Container>
  );
}
const Container = styled("div", {});
const Row = styled("div", {
  display: "flex",
});

const Column = styled("div", {
  display: "flex",
  flexDirection: "column",
});

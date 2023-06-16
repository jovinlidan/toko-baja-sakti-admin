import Form from "@/components/elements/form";
import { styled } from "@/config/stitches/theme.stitches";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";
import { Input } from "@/components/elements";
import { Item } from "@/api-hooks/item/item.model";
import { toast } from "react-hot-toast";
import { formSetErrors } from "@/common/helpers/form";
import { AdjustmentItem } from "@/api-hooks/adjustment-item/adjustment-item.model";
import ItemSelectOption from "@/components/elements/select-input-helper/item-select-input";
import { FullContainer, HalfContainer } from "@/components/elements/styles";
import { useGetItem } from "@/api-hooks/item/item.query";
import { camelizeKeys } from "humps";
import { ApiResult } from "@/common/repositories/common.model";

type FormType = {
  code?: string;
  itemId?: string;
  transactionDate?: Date;
  newStock?: number | string;
  description?: string;
};

interface Props {
  data?: AdjustmentItem;
  onSubmit: (values: FormType) => void;
  defaultEditable?: boolean;
}
export default function AdjustmentItemForm(props: Props) {
  const { defaultEditable = true, data } = props;
  const YupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        code: Yup.string().strip(true),
        itemId: Yup.string().required(),
        transactionDate: Yup.date()
          .transform((_, val) => (val ? new Date(val) : null))
          .required(),
        newStock: Yup.string().nullable().required(),
        description: Yup.string().required(),
      }),
    []
  );
  const resolver = useYupValidationResolver(YupSchema);

  const methods = useForm<any>({
    resolver,
    mode: "all",
    defaultValues: {
      ...(data
        ? {
            ...data,
            transactionDate: data.transactionDate,
            itemId: data?.item?.id,
          }
        : {
            transactionDate: new Date(Date.now()),
          }),
    },
  });

  const onSubmit = React.useCallback(
    async (values) => {
      try {
        const input = YupSchema.cast(values) as FormType;
        await props.onSubmit(input);
      } catch (e: any) {
        if (e?.errors) {
          formSetErrors(e?.errors, methods.setError);
        }
        e?.message && toast.error(e?.message);
      }
    },
    [YupSchema, methods, props]
  );

  const itemId = useWatch({
    name: "itemId",
    control: methods.control,
  });

  React.useEffect(() => {
    if (!itemId) {
      return methods.setValue("oldStock", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  useGetItem(
    { id: itemId },
    {
      enabled: !!itemId,
      onSettled: (itemData) => {
        if (!itemData?.data || !!data?.id) return;
        const camelData: ApiResult<Item> = camelizeKeys(itemData);
        methods.setValue("oldStock", camelData?.data.stock);
      },
    }
  );

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      defaultEditable={defaultEditable}
    >
      <FullContainer direction="column">
        <Row>
          <HalfContainer>
            {data?.code && (
              <Input name="code" type="text" label="Kode" disabled />
            )}

            {!data?.code && (
              <Input
                name="transactionDate"
                type="date"
                label="Tanggal Penyesuaian Pembelian"
              />
            )}
          </HalfContainer>
          <HalfContainer>
            {data?.code && (
              <Input
                name="transactionDate"
                type="date"
                label="Tanggal Penyesuaian Pembelian"
              />
            )}
          </HalfContainer>
        </Row>
        <ItemSelectOption
          name="itemId"
          label="Tambah Barang"
          placeholder="Pilih Barang"
          onChange={(e) => {
            alert(e);
          }}
        />
        <Row>
          <HalfContainer>
            <Input name="oldStock" type="number" label="Stok Lama" disabled />
            <Input name="newStock" type="number" label="Stok Baru" />
          </HalfContainer>
          <HalfContainer>
            <Input name="description" type="textarea" label="Keterangan" />
          </HalfContainer>
        </Row>
      </FullContainer>
      <Input type="submit" text="SIMPAN" size="large" />
    </Form>
  );
}

const Row = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

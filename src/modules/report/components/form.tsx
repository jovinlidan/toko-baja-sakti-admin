import Form from "@/components/elements/form";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";
import { Input } from "@/components/elements";
import { toast } from "react-hot-toast";
import { formSetErrors } from "@/common/helpers/form";
import { FullContainer, HalfContainer } from "@/components/elements/styles";
import {
  getReportFilterMetadata,
  reportOptions,
  ReportType,
} from "../report-metadata";
import toApiError from "@/common/repositories/to-api-error";
import { useRouter } from "next/router";
import routeConstant from "@/constants/route.constant";
import { FormValueState } from "@/components/elements/input";
import { styled, theme } from "@/config/stitches/theme.stitches";
import { DocumentScannerSVG } from "@/common/assets";
import qs from "qs";

type FormType = {
  reportType: ReportType;
  filter?: string;
};

interface Props {}
export default function ReportForm(props: Props) {
  const YupSchema = React.useMemo(() => Yup.object().shape({}), []);
  const resolver = useYupValidationResolver(YupSchema);
  const methods = useForm<any>({
    resolver,
    mode: "all",
    defaultValues: {},
  });

  const values = useWatch({ control: methods.control });

  const onSubmit = React.useCallback(
    async (values: FormType) => {
      if (!values.reportType) return;
      const filterValue = { ...values, reportType: undefined };
      try {
        const params = qs.stringify(filterValue);
        const reportView =
          routeConstant.ReportView.replace(
            "[id]",
            encodeURIComponent("report/" + values.reportType)
          ) + (params ? `?${params}` : "");
        window.open(reportView, "_blank");
      } catch (e: any) {
        const err = await toApiError(e);
        if (err?.errors) {
          formSetErrors(err?.errors, methods.setError);
        }
        err?.message && toast.error(err?.message);
      }
    },
    [methods]
  );

  const getFilterContent = React.useCallback(
    (type: ReportType) => {
      return getReportFilterMetadata(type).map((item) => {
        if (item.type === "row") {
          return (
            <Row key={item.type}>
              {item.components.map((comp) =>
                comp.type === "component" ? (
                  <HalfContainer key={comp.type}>
                    <comp.component
                      key={comp.type}
                      name={comp.name}
                      placeholder={comp.placeholder}
                      size="large"
                      required={
                        typeof comp.required === "function"
                          ? comp.required(values)
                          : comp.required
                      }
                      startEnhancer={
                        <DocumentScannerSVG
                          color={theme.colors.textPrimary.value}
                        />
                      }
                    />
                  </HalfContainer>
                ) : (
                  <HalfContainer key={comp.name}>
                    <Input
                      {...comp}
                      type={comp.input}
                      options={comp.options ? comp.options : []}
                      size="large"
                      required={
                        typeof comp.required === "function"
                          ? comp.required(values)
                          : comp.required
                      }
                    />
                  </HalfContainer>
                )
              )}
            </Row>
          );
        } else if (item.type === "component") {
          return (
            <item.component
              key={item.name}
              name={item.name}
              placeholder={item.placeholder}
              size="large"
              startEnhancer={
                <DocumentScannerSVG color={theme.colors.textPrimary.value} />
              }
              required={
                typeof item.required === "function"
                  ? item.required(values)
                  : item.required
              }
            />
          );
        }
        return (
          <Input
            key={item.name}
            {...item}
            type={item.input}
            options={item.options ? item.options : []}
            size="large"
            required={
              typeof item.required === "function"
                ? item.required(values)
                : item.required
            }
          />
        );
      });
    },
    [values]
  );

  const onSelectReportType = React.useCallback(
    (e) => {
      if (e.value) {
        methods.reset();
        methods.setValue("reportType", e.value);
        return;
      }
      methods.setValue("reportType", undefined);
    },
    [methods]
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <FullContainer>
        <HalfContainer>
          <Input
            name="reportType"
            type="select"
            options={reportOptions}
            label="Jenis Laporan"
            placeholder="Pilih Jenis Laporan"
            onSelect={onSelectReportType}
          />
        </HalfContainer>
      </FullContainer>

      <FormValueState keys={["reportType"]}>
        {({ reportType }) => {
          return (
            <>
              {getFilterContent(reportType)}

              <Input
                type="submit"
                text="CETAK"
                size="large"
                variant="info"
                disabled={!reportType}
              />
            </>
          );
        }}
      </FormValueState>
    </Form>
  );
}

const Row = styled("div", {
  display: "flex",
  justifyContent: "space-between",
});

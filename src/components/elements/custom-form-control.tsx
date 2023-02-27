import { styled } from "@/config/stitches/theme.stitches";
import * as React from "react";

import {
  CustomFormControlWrapper,
  LabelContainer,
  RequiredText,
  RightEnhancerContainer,
} from "./styles";
import Text from "./text";

export interface CustomFormControlProps {
  label?: string;
  hideLabel?: boolean;
  required?: boolean;
  noMargin?: boolean;
  error?: string;
  children: React.ReactNode;
}

export function CustomLabel(props: any) {
  const { label, labelPlacement, hideLabel, ...restProps } = props;
  return (
    <LabelContainer>
      <Text
        style={{
          display: "block",
          opacity: hideLabel ? 0 : 1,
        }}
        variant="body1"
        {...restProps}
      >
        {label}
      </Text>
      {props.required && !hideLabel && <RequiredText>*</RequiredText>}
    </LabelContainer>
  );
}

export default function CustomFormControl(props: CustomFormControlProps) {
  const {
    hideLabel = false,
    noMargin = false,
    required = false,
    children,
    label,
    error,
    ...restProps
  } = props;

  const ref = React.useRef<HTMLDivElement | null>();

  return (
    <CustomFormControlWrapper
      noMargin={noMargin}
      ref={(el) => (ref.current = el)}
    >
      <FormContainer>
        {label && (
          <CustomLabelContainer>
            <CustomLabel
              required={required}
              {...restProps}
              label={label}
              hideLabel={hideLabel}
            />
          </CustomLabelContainer>
        )}
        <ContentContainer>{children}</ContentContainer>
        {!!error && (
          <ErrorContainer>
            <Text variant="body2" capitalize>
              {error}
            </Text>
          </ErrorContainer>
        )}
      </FormContainer>
    </CustomFormControlWrapper>
  );
}

const CustomLabelContainer = styled("div", {
  mb: 10,
});

const ContentContainer = styled("div", {
  width: "100%",
});

const FormContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const ErrorContainer = styled("div", {
  border: "1px solid",
  borderColor: "$errorDark",
  background: "$errorLight",
  padding: "4px 8px",
  borderRadius: 4,
  marginTop: 4,
  "& span": {
    color: "#FFFFFF",
  },
});

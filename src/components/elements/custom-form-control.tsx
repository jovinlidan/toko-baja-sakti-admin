import { styled } from "@/config/stitches/theme.stitches";
import * as React from "react";

import {
  CustomFormControlWrapper,
  LabelContainer,
  RequiredText,
  RightEnhancerContainer,
} from "./styles";
import Text from "./text";

export enum TextLabelPlacementEnum {
  Default = "default",
  Left = "left",
  TopLeft = "top-left",
}

export interface CustomFormControlProps {
  label?: string;
  hideLabel?: boolean;
  required?: boolean;
  noMargin?: boolean;
  error?: string;
  children: React.ReactNode;
  labelRightEnhancer?: React.ReactNode;
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
        textVariant="body3Semibold"
        {...restProps}
      >
        {label}
      </Text>
      {props.required && !hideLabel && <RequiredText>*</RequiredText>}
      {props.$labelRightEnhancer && (
        <RightEnhancerContainer>
          {props.$labelRightEnhancer}
        </RightEnhancerContainer>
      )}
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
    labelRightEnhancer,
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
              $labelRightEnhancer={labelRightEnhancer}
              hideLabel={hideLabel}
            />
          </CustomLabelContainer>
        )}
        <ContentContainer>{children}</ContentContainer>
      </FormContainer>
    </CustomFormControlWrapper>
  );
}

const CustomLabelContainer = styled("div", {});

const ContentContainer = styled("div", {
  width: "100%",
});

const FormContainer = styled("div", {
  display: "flex",
  alignItems: "center",
});

const ErrorDivider = styled("div", {
  marginTop: 4,
});

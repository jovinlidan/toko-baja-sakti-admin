import isEmpty from "lodash/isEmpty";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import Button, { ButtonProps } from "../button";

import { FormContext } from "../form";

export interface SubmitProps extends ButtonProps {
  text?: string;
  hideIcon?: boolean;
  type: "submit";
  rightIcon?: React.ReactNode;
}

export default function SubmitField(props: SubmitProps) {
  const context = React.useContext(FormContext);
  const { formState } = useFormContext();
  const {
    disabled,
    text = "SIMPAN",
    hideIcon,
    rightIcon,
    loading,
    ...restProps
  } = props;

  if (!context.editable && !formState.isSubmitting) {
    return null;
  }
  const isValid = isEmpty(formState.errors);

  return (
    <Button
      {...restProps}
      disabled={disabled || !isValid}
      loading={formState.isSubmitting || loading}
      type="submit"
    >
      {text}
      {rightIcon}
    </Button>
  );
}

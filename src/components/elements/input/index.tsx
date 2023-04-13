import invariant from "invariant";
import * as React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import DatePickerField, { DatePickerFieldProps } from "./date-picker-field";
import { SingleFilePicker, SingleFilePickerProps } from "./file-picker";
import SelectEnumField, { SelectEnumFieldProps } from "./select-enum-field";
import SelectField, { SelectFieldProps } from "./select-field";
import SubmitField, { SubmitProps } from "./submit-field";
import TextField, { TextFieldProps } from "./text-field";
import TextNumberField, { TextNumberFieldProps } from "./text-number-field";
import TextareaField, { TextareaFieldProps } from "./textarea-field";

type InputType =
  | "text"
  | "password"
  | "textarea"
  | "number"
  | "select"
  | "date"
  | "submit"
  | "file"
  | "enum";

export interface BaseElementInputProps {
  type: InputType;
  name: string;
  readOnly?: boolean;
}

function RawInput(
  props:
    | TextFieldProps
    | TextareaFieldProps
    | TextNumberFieldProps
    | DatePickerFieldProps
    | SelectFieldProps
    | SelectEnumFieldProps
    | SingleFilePickerProps
    | SubmitProps,
  propsRef: any
) {
  // const hookRef = React.useRef();
  const ref = propsRef || React.createRef();
  switch (props.type) {
    case "text":
    case "password":
      return <TextField {...props} ref={ref} />;
    case "textarea":
      return <TextareaField {...props} ref={ref} />;
    case "number":
      return <TextNumberField {...props} />;
    case "date":
      return <DatePickerField {...props} ref={ref} />;
    case "select":
      return <SelectField {...props} ref={ref} />;
    case "enum":
      return <SelectEnumField {...props} ref={ref} />;
    case "file":
      return <SingleFilePicker {...props} />;
    case "submit":
      return <SubmitField {...props} />;
  }
}
export default React.forwardRef(RawInput);

interface FormValueState {
  keys: string[];
  children: React.ReactNode | ((values: any) => React.ReactNode);
}

interface FormValueContextState {
  values: { [key in string]: string };
}

export const FormContext = React.createContext<FormValueContextState>({
  values: {},
});

export function FormValueState(props: FormValueState) {
  const { keys, children } = props;
  const { control } = useFormContext();
  const values = useWatch({ name: keys, control });

  const transformedValues = values.reduce((prev, next, idx) => {
    return {
      ...prev,
      [keys[idx]]: next,
    };
  }, {});

  const value = React.useMemo<FormValueContextState>(
    () => ({
      values: transformedValues,
    }),
    [transformedValues]
  );

  return (
    <FormContext.Provider value={value}>
      {typeof children === "function" ? children(transformedValues) : children}
    </FormContext.Provider>
  );
}

export function useFormValueState(): FormValueContextState {
  const context = React.useContext(FormContext);
  invariant(
    context !== undefined,
    "useFormValueState must be used inside Form Container"
  );
  return context;
}

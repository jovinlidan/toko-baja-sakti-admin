import { UseFormSetError } from "react-hook-form";

type Options =
  | Partial<{
      shouldValidate: boolean;
      shouldDirty: boolean;
      shouldTouch: boolean;
    }>
  | undefined;

export async function UpdateBatchHelper(values, form, options?: Options) {
  await Object.keys(values)?.forEach(async (key) => {
    if (options) {
      await form.setValue(key, values[key], options);
    } else {
      await form.setValue(key, values[key]);
    }
  });
}

export const formSetErrors = (
  errors: { [key: string]: any },
  setError: UseFormSetError<any>,
  parentKey?: string
) => {
  Object.entries(errors).map((error) => {
    if (typeof error[1] === "object") {
      formSetErrors(
        error[1],
        setError,
        `${parentKey ? parentKey + "." : ""}${error[0]}`
      );
    } else {
      if (parentKey) {
        setError(`${parentKey}.${error[0]}`, {
          type: "manual",
          message: error[1],
        });
      } else {
        setError(error[0], {
          type: "manual",
          message: error[1],
        });
      }
    }
  });
};

import invariant from "invariant";

function required(name: string, value?: string): string {
  invariant(value !== undefined, `${name} is required on env vars`);
  return value!;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  apiEndpoint: required(
    "NEXT_PUBLIC_API_ENDPOINT",
    process.env.NEXT_PUBLIC_API_ENDPOINT
  ),
};

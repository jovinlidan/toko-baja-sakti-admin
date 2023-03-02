export * from "@/hooks/use-ky";

export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

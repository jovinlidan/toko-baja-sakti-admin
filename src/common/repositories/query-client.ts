import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      cacheTime: 3600 * 24 * 1000,
    },
    mutations: {
      retry: false,
    },
  },
});

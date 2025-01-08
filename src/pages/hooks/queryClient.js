import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Number of retries before failing
      refetchOnWindowFocus: false, // Avoid unnecessary refetches
    },
  },
});

export default queryClient;

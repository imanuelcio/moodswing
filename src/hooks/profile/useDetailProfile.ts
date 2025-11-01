import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./api";

export function useDetailProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await getProfile();
      return response;
    },
  });
}

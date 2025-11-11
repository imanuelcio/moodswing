import { useQuery } from "@tanstack/react-query";
import { getListNFT } from "./api";

export function useGetListNFT() {
  return useQuery({
    queryKey: ["listNFT"],
    queryFn: async () => {
      const response = await getListNFT();
      return response;
    },
  });
}

import { useQuery } from "react-query";
import { axiosInstance } from "@/lib/axios";

export default function useFetchAllBoards() {
  return useQuery({
    queryKey: "fetchAllBoards",
    queryFn: async () => {
        const response = await axiosInstance.get("/boards");
        return response?.data?.data;
    },
    onError: (error) => {
        console.log(error);
    }
});
}

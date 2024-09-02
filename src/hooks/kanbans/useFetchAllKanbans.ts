import { useQuery } from "react-query";
import { axiosInstance } from "@/lib/axios";

export default function useFetchAllKanbans() {
  return useQuery({
    queryKey: "fetchAllKanbans",
    queryFn: async () => {
        const response = await axiosInstance.get("/kanbans");
        return response?.data?.data;
    },
    onError: (error) => {
        console.log(error);
    }
});
}

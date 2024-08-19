import { useQuery } from "react-query";
import { axiosInstance } from "@/lib/axios";

export default function useFetchAllTodos() {
  return useQuery({
    queryKey: "fetchAllTodos",
    queryFn: async () => {
        const response = await axiosInstance.get("/todos");
        return response?.data?.data;
    },
    onError: (error) => {
        console.log(error);
    }
});
}

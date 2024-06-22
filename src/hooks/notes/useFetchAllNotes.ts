import { useQuery } from "react-query";
import { axiosInstance } from "@/lib/axios";

export default function useFetchAllNotes() {
  return useQuery({
    queryKey: "fetchAllNotes",
    queryFn: async () => {
        const response = await axiosInstance.get("/notes");
        return response?.data?.data;
    },
    onError: (error) => {
        console.log(error);
    }
});
}

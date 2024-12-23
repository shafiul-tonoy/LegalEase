import { useMemo } from "react";
import axios from "axios";

const useAxios = () => {
  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: "https://a11-server-side-steel.vercel.app",
      withCredentials: true,
    });
  }, []);

  return axiosInstance;
};

export default useAxios;

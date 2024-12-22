import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";

export default function Services() {
  const axiosRequest = useAxios();

  const fetchData = async () => {
    const { data } = await axiosRequest.get("/services");
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["services"],
    queryFn: fetchData,
  });

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        <h2>Error Loading Services</h2>
        <p>
          We encountered an error while fetching services. Please try again
          later.
        </p>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>LE | Services</title>
      </Helmet>
      <div className="w-full md:w-10/12 mx-auto md:p-7">{data.length}</div>
    </>
  );
}

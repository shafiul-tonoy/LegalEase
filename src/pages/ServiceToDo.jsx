import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";
export default function ServiceToDo() {
  const { user } = useAuth();
  const axiosRequest = useAxiosSecure();

  const fetchData = async () => {
    const { data } = await axiosRequest.get(
      `/providerBookedServices/${user.email}`
    );
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["providerBookedService", user.email],
    queryFn: fetchData,
    staleTime: 0,
    cacheTime: 0,
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
        <title>L.E | Service to do</title>
      </Helmet>
      <div className="w-full md:w-10/12 mx-auto md:p-7">
        <h1>Service to Do</h1>
      </div>
    </>
  );
}

import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";

import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";

export default function Details() {
  const { id } = useParams();

  const axiosRequest = useAxiosSecure();

  const fetchData = async () => {
    const { data } = await axiosRequest.get(`/services/${id}`);
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["services", id],
    queryFn: fetchData,
    staleTime: 0, // Ensure data is not considered fresh
    cacheTime: 0, // Prevent reuse of stale cache (optional)
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
  const {
    imageUrl,
    serviceName,
    price,
    serviceArea,
    description,
    serviceProvider,
  } = data;

  return (
    <>
      <Helmet>
        <title>Service Details</title>
      </Helmet>
      <div className="w-full md:w-10/12 mx-auto md:p-7">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={serviceName}
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800">{serviceName}</h3>
            <p className="text-gray-600">{description}</p>
            <div className="mt-4">
              <p className="text-gray-700 font-semibold">
                Service Area: <span className="font-normal">{serviceArea}</span>
              </p>
              <p className="text-gray-700 font-semibold">
                Price: <span className="font-normal">${price}</span>
              </p>
            </div>
            <div className="flex items-center mt-6">
              <img
                src={serviceProvider.photoURL}
                alt={name}
                className="w-24 h-24 rounded-full object-cover border"
              />
              <div className="ml-4">
                <p className="text-gray-800 font-bold">{serviceProvider.name}</p>
                <p className="text-gray-600 text-sm">{serviceArea}</p>
              </div>
            </div>
            <button className="btn mt-5 btn-primary w-full">Book Now</button>
          </div>
        </div>
      </div>
    </>
  );
}

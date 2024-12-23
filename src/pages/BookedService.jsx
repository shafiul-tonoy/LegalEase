import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";

export default function BookedService() {
  const { user } = useAuth();
  const axiosRequest = useAxiosSecure();

  const fetchData = async () => {
    const { data } = await axiosRequest.get(`/bookedServices/${user.email}`);
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookedService", user.email],
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
        <title>Booked Service</title>
      </Helmet>
      <div className="w-full md:w-10/12 mx-auto md:p-7">
        <h1 className="text-2xl">My Booked Service</h1>
        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 ">
            {data.map((service) => (
              <div
                className="card bg-base-100  w-96 shadow-xl"
                key={service._id}
              >
                <div className="card-body">
                  <h2 className="card-title">{service.serviceName}</h2>
                  <div className="badge badge-accent">
                    {service.serviceStatus}
                  </div>
                  <p>Price : {service.price}</p>
                  <p>Service Taking Date : {service.serviceTakingDate}</p>
                  <h3>Provider </h3>
                  <div className="flex items-center">
                    <div className="avatar">
                      <div className="w-8 rounded">
                        <img
                          src={service.serviceProvider.photoURL}
                          alt="Tailwind-CSS-Avatar-component"
                          className="object-cover w-full h-full rounded-full object-top"
                        />
                      </div>
                      <p className="ml-2">{service.serviceProvider.name}</p>
                    </div>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <h2>No Booked Services</h2>
            <p>You have not booked any services yet.</p>
          </div>
        )}
      </div>
    </>
  );
}

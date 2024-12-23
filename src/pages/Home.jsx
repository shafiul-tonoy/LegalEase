import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";

import Statistics from "../components/Statistics";
import FAQAccordion from "../components/FAQAccordion";

export default function Home() {
  const { loading } = useAuth();
  const axiosRequest = useAxios();
  const fetchData = async () => {
    const { data } = await axiosRequest.get("/servicesHome");
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["servicesHome"],
    queryFn: fetchData,
  });

  if (loading) {
    return <Loading />;
  }

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
        <title>Legal Ease | Home</title>
      </Helmet>
      <div className="">
        <div className="py-10 bg-[#F26724] text-center mt-5">
          <h1 className="text-[#09053D] text-3xl font-extrabold">
            Over a Thousand People Helped in Verdicts and Settlements
          </h1>
          <h2 className="text-xl font-bold text-white mt-4">
            Delivering Justice and Maximizing Results for Our Clients
          </h2>
        </div>
        <Banner />
        <div className="w-full md:w-10/12 mx-auto md:p-7">
          {/* cards */}
          <h1>Pouplar Services</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 mb-4 gap-3">
            {data.map((service) => (
              <div className="card bg-base-100  shadow-xl" key={service.id}>
                <figure>
                  <img
                    src={service.imageUrl}
                    alt="law"
                    className="h-96 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{service.serviceName}</h2>
                  <p>{service.description.substring(0, 99)}...</p>
                  <p>Service Area : {service.serviceArea}</p>
                  <p>Service Price : {service.price}</p>
                  <div className="p-2 rounded shadow-xl">
                    <h1 className="mb-2">Service Provider</h1>
                    <hr />
                    <div className="flex gap-2 items-center mt-2">
                      <img
                        src={service.serviceProvider.photoURL}
                        alt="Provider"
                        className="w-24 h-24 rounded-xl object-cover object-top"
                      />
                      <p>{service.serviceProvider.name}</p>
                    </div>
                  </div>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">
                      <Link to={`/details/${service._id}`}>View Details</Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/services">
            <button className="btn">All Services</button>
          </Link>
        </div>
        {/* Statistics */}
        <Statistics />
        <FAQAccordion />
      </div>
    </>
  );
}

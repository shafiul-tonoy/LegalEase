import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";

export default function Services() {
  const axiosRequest = useAxios();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [sortBy, setSortBy] = useState("none");

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
        <p>We encountered an error while fetching services. Please try again later.</p>
      </div>
    );

  const sortServices = (services) => {
    return [...services].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-high":
          return parseFloat(b.price) - parseFloat(a.price);
        case "name-asc":
          return a.serviceName.localeCompare(b.serviceName);
        case "name-desc":
          return b.serviceName.localeCompare(a.serviceName);
        default:
          return 0;
      }
    });
  };

  // First filter, then sort
  const processedServices = sortServices(
    data.filter((service) =>
      service.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <Helmet>
        <title>LE | Services</title>
      </Helmet>
      <div className="w-full md:w-10/12 mx-auto md:p-7">
        {data.length > 0 ? (
          <>
            <div className="my-3">
              <h1 className="text-2xl">All Services</h1>
              <div className="flex flex-col md:flex-row gap-4 my-4">
                {/* Search Input */}
                <div className="flex-grow relative">
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setSearchTriggered(false);
                      }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() => setSearchTriggered(true)}
                    >
                      Search
                    </button>
                  </label>
                  {/* Popup for onChange search */}
                  {searchQuery && !searchTriggered && (
                    <div className="absolute top-full mt-2 bg-white border shadow-lg w-full z-10">
                      {processedServices.length > 0 ? (
                        processedServices.map((service) => (
                          <div
                            key={service._id}
                            className="p-2 flex justify-between items-center hover:bg-gray-100"
                          >
                            <span>{service.serviceName}</span>
                            <button className="btn btn-sm btn-link">
                              <Link to={`/details/${service._id}`}>View Details</Link>
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="p-2 text-gray-500">No services found</div>
                      )}
                    </div>
                  )}
                </div>

                {/* Sort Dropdown */}
                <select
                  className="select select-bordered w-full md:w-48"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="none">Sort by...</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 grid-cols-1">
              {processedServices.map((service) => (
                <div
                  className="card lg:card-side bg-base-100 shadow-xl"
                  key={service._id}
                >
                  <figure>
                    <img
                      src={service.imageUrl}
                      alt="Album"
                      className="w-full h-96 object-cover object-top rounded-lg"
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
                          className="w-36 h-32 rounded-xl object-cover object-top"
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
          </>
        ) : (
          <p className="text-center text-gray-600">
            No services available at the moment.
          </p>
        )}
      </div>
    </>
  );
}
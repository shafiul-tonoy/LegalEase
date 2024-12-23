import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";
import { success, errorToast } from "../utility/toastMsg";
import { TfiEmail } from "react-icons/tfi";

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

  const queryClient = useQueryClient();

  const handleSelect = async (e, serviceId) => {
    const serviceStatus = e.target.value;
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosRequest.patch(
        `/bookedServices/${serviceId}`,
        {
          serviceStatus,
        }
      );
      success();
      queryClient.invalidateQueries(["providerBookedService", user.email]);
    } catch (error) {
      console.error("Error updating service status:", error.message || error);
      errorToast("Error updating service status");
    }
  };

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
        {data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Service Name</th>
                  <th>Buyer</th>
                  <th>Service Taking Date</th>
                  <th>Status</th>
                  <th>Update Status</th>
                  <th>Instructions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((service) => (
                  <tr key={service._id}>
                    <td></td>
                    <td>{service.serviceName}</td>
                    <td>
                      Name : {service.userName} <br />
                      email : {service.userEmail}
                    </td>
                    <td>
                      {new Date(service.serviceTakingDate).toLocaleDateString()}
                    </td>
                    <td>{service.serviceStatus}</td>
                    <td>
                      {/* select the service serviceStatus */}
                      <select
                        className="select select-bordered"
                        onChange={(e) => handleSelect(e, service._id)}
                      >
                        <option value="" disabled selected>
                          Select Status
                        </option>
                        <option value="pending">Pending</option>
                        <option value="working">Working</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td>
                      <div
                        className="tooltip"
                        data-tip={service.specialInstructions}
                      >
                        <button className="btn">
                          <TfiEmail />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No service to do</p>
        )}
      </div>
    </>
  );
}

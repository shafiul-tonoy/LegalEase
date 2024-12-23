import { Helmet } from "react-helmet-async";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { success } from "../utility/toastMsg";

export default function ManageService() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosRequest = useAxios();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const fetchData = async () => {
    const { data } = await axiosRequest.get(`/manageServices/${user.email}`);
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["manageServices"],
    queryFn: fetchData,
  });

  // Mutation to delete a service
  const deleteServiceMutation = useMutation({
    mutationFn: (serviceId) => axiosRequest.delete(`/services/${serviceId}`),
    // After deleting, invalidate the query to refresh the list of services
    onSuccess: () => {
      queryClient.invalidateQueries(["manageServices"]);
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });

  // Handle delete request
  const handleDelete = (serviceId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteServiceMutation.mutate(serviceId);
        Swal.fire("Deleted!", "Your service has been deleted.", "success");
      }
    });
  };

  const handleUpdate = (serviceId) => {
    openModal();
    const service = data.find((service) => service._id === serviceId);
    setValue("imageUrl", service.imageUrl);
    setValue("serviceName", service.serviceName);
    setValue("price", service.price);
    setValue("serviceArea", service.serviceArea);
    setValue("description", service.description);
    setValue("serviceId", service._id);
  };

  const onSubmit = async (data) => {
    data.serviceProvider = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };

    // eslint-disable-next-line no-unused-vars
    const { serviceId, ...payload } = data;

    try {
      await axiosRequest.put(
        `/services/${data.serviceId}`,
        payload
      );
      navigate("/services");

      success();
      closeModal();
    } catch (error) {
      console.error("Error updating service:", error);
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
        <title>L.E | Manage Service</title>
      </Helmet>
      <div className="w-full md:w-10/12 mx-auto md:p-7">
        {data.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.map((service) => (
              <div
                className="card card-compact bg-base-100  shadow-xl"
                key={service._id}
              >
                <figure>
                  <img src={service.imageUrl} alt="photo" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{service.serviceName}</h2>
                  <p>{service.description.substring(0, 99)}...</p>
                  <p>Service Area : {service.serviceArea}</p>
                  <p>Service Price : {service.price}</p>
                  <div className="card-actions justify-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdate(service._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => handleDelete(service._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-red-500 mt-10">
            <h2>No Services Found</h2>
            <p>
              You have not added any services yet. Please add services to manage
              them.
            </p>
          </div>
        )}
      </div>
      {/* modal */}

      {isModalOpen && (
        <dialog className="modal modal-bottom sm:modal-middle" open>
          <div className="modal-box">
            {/* form start */}
            <div className="flex items-center justify-center min-h-[calc(100vh-325px)]">
              <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">
                  Update Service
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Image URL */}
                  <div>
                    <label
                      htmlFor="imageUrl"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Image URL
                    </label>
                    <input
                      type="url"
                      id="imageUrl"
                      name="imageUrl"
                      className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                      placeholder="Enter image URL of the service"
                      {...register("imageUrl", {
                        required: "Image URL is required",
                      })}
                    />
                    {errors.imageUrl && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.imageUrl.message}
                      </p>
                    )}
                  </div>

                  {/* Service Name */}
                  <div>
                    <label
                      htmlFor="serviceName"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Service Name
                    </label>
                    <input
                      type="text"
                      id="serviceName"
                      name="serviceName"
                      className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                      placeholder="Enter the name of the service"
                      {...register("serviceName", {
                        required: "Service name is required",
                      })}
                    />
                    {errors.serviceName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.serviceName.message}
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                      placeholder="Enter the price"
                      {...register("price", {
                        required: "Price is required",
                        valueAsNumber: true,
                      })}
                    />
                    {errors.price && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  {/* Service Area */}
                  <div>
                    <label
                      htmlFor="serviceArea"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Service Area
                    </label>
                    <input
                      type="text"
                      id="serviceArea"
                      name="serviceArea"
                      className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                      placeholder="Enter the service area"
                      {...register("serviceArea", {
                        required: "Service area is required",
                      })}
                    />
                    {errors.serviceArea && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.serviceArea.message}
                      </p>
                    )}
                  </div>

                  

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                      placeholder="Enter a description of the service"
                      rows="4"
                      {...register("description", {
                        required: "Description is required",
                      })}
                    ></textarea>
                    {/* Hidden input to store the serviceId */}
                    <input
                      type="hidden"
                      name="serviceId"
                      {...register("serviceId")}
                    />
                    {errors.description && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Update Button */}
                  <button
                    type="submit"
                    className="w-full py-3 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 shadow-md focus:outline-none focus:ring focus:ring-indigo-400"
                  >
                    Update Service
                  </button>
                </form>
              </div>
            </div>

            {/* form end */}
            <div className="modal-action">
              {/* Close button */}
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

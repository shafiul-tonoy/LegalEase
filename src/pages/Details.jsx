import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import { success, errorToast } from "../utility/toastMsg";
import { useNavigate } from "react-router-dom";

export default function Details() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    _id: serviceId,
  } = data;

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      serviceId,
      imageUrl,
      serviceName,
      price,
      serviceArea,
      description,
      serviceProvider,
      userName: user.displayName,
      userEmail: user.email,
      serviceStatus: "pending",
    };

    //axios request

    try {
      const response = await axiosRequest.post(`/bookedServices`, updatedData);
      if (response.status >= 200 && response.status < 300) {
        navigate("/bookedService");
        success();
      } else {
        throw new Error("Failed to book service.");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      // console.log(err);      
      errorToast("Service booking failed. Please check if you have already purchased this service.");
    }
  };

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
          <div className="p-6 space-y-3">
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
                <p className="text-gray-800 font-bold">
                  {serviceProvider.name}
                </p>
                <p className="text-gray-600 text-sm font-semibold">{serviceArea}</p>
              </div>
            </div>
            <button className="btn mt-5 btn-primary w-full" onClick={openModal}>
              Book Now
            </button>
          </div>
        </div>
      </div>
      {/* modal */}

      {isModalOpen && (
        <dialog className="modal modal-bottom sm:modal-middle" open>
          <div className="modal-box">
            {/* form start */}
            <div className="w-full max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-center mb-6">
                Purchase Service
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Service ID */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Service ID
                  </label>
                  <input
                    type="text"
                    value={serviceId}
                    disabled
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>

                {/* Service Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Service Name
                  </label>
                  <input
                    type="text"
                    value={serviceName}
                    disabled
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>

                {/* Service Image */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Service Image
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    disabled
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>

                {/* Provider Email */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Provider Email
                  </label>
                  <input
                    type="text"
                    value={serviceProvider.email}
                    // {...register("providerEmail", { value: serviceProvider.email })}
                    disabled
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>

                {/* Provider Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Provider Name
                  </label>
                  <input
                    type="text"
                    value={serviceProvider.name}
                    // {...register("providerName", { value: serviceProvider.name })}
                    disabled
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>

                {/* Current User Email */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Email
                  </label>
                  <input
                    type="text"
                    value={user.email}
                    // {...register("userEmail", { value: user.email })}
                    disabled
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>

                {/* Current User Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={user.displayName}
                    // {...register("userName", { value: user.displayName })}
                    disabled
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>

                {/* Service Taking Date */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Service Taking Date
                  </label>
                  <input
                    type="date"
                    {...register("serviceTakingDate", {
                      required: "Service Taking Date is required",
                    })}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.serviceTakingDate && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.serviceTakingDate.message}
                    </p>
                  )}
                </div>

                {/* Special Instructions */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Special Instructions
                  </label>
                  <textarea
                    placeholder="Enter any special instructions (e.g., address, area, or custom plan)"
                    {...register("specialInstructions", {
                      required: "Special instructions are required",
                    })}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                  ></textarea>
                  {errors.specialInstructions && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.specialInstructions.message}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="text"
                    // {...register("price", { value: `$${price}` })}
                    value={price}
                    disabled
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>

                {/* Purchase Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Purchase
                  </button>
                </div>
              </form>
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

//

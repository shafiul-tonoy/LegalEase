import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { success } from "../utility/toastMsg";
import { useNavigate } from "react-router-dom";

export default function AddService() {
  const navigate = useNavigate();
  const axiosRequest = useAxiosSecure();
  const { user } = useAuth();
  // console.table(user.displayName, user.email, user.photoURL);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (serviceData) => {
    serviceData.serviceProvider = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };

    //axios request

    try {
      await axiosRequest.post(`/services`, serviceData);
      navigate("/services");
      success();
    } catch (err) {
      console.error("Error updating services:", err.message || err);
    }
  };

  return (
    <>
      <Helmet>
        <title>L.E | Add Service</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-[calc(100vh-325px)] ">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Add a Service</h2>
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
                {...register("imageUrl", { required: "Image URL is required" })}
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
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Add Button */}
            <button
              type="submit"
              className="w-full py-3 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 shadow-md focus:outline-none focus:ring focus:ring-indigo-400"
            >
              Add Service
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

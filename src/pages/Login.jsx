import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { success } from "../utility/toastMsg";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const { login, setUser, signInWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const location = useLocation();
  const Navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    login(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        Navigate(location?.state ? location.state : "/");
        success();
      })
      .catch((err) => setError(err.code)); // Replace with your login logic
  };

  //   google signin

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        Navigate(location?.state ? location.state : "/");
        success();
      })
      .catch((err) => setError(err.code));
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-[calc(100vh-325px)] ">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {error && (
              <p className="text-sm font-semibold text-red-500 my-2">
                ** {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>

          {/* google login */}

          <div className="mt-6">
            <button
              type="button"
              className="w-full 
            px-4 py-2 text-black bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2
             focus:ring-gray-400 flex items-center justify-center gap-2"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle size="16" />
              Sign in with Google
            </button>
          </div>
          <p className="mt-4 text-sm text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

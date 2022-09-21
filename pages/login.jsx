/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import Link from "next/link";
import jsCookie from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";
import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { redirect } = router.query;
  useEffect(() => {
    if (userInfo) {
      router.replace(redirect || "/");
    }
  }, [router, userInfo, redirect]);

  const onSubmit = async (values) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post("/api/users/login", values);
      setLoading(false);
      dispatch({ type: "USER_LOGIN", payload: data });
      jsCookie.set("userInfo", JSON.stringify(data));
      router.replace(redirect || "/");
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="text-gray-600 body-font relative">
      <div className="container h-[80vh] px-5 m-auto flex">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col m-auto w-full relative z-10 shadow-md"
        >
          {error !== "" && <p className="text-red-500">{error}</p>}
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register("email", { required: true })}
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {errors.email && (
              <p className="text-red-500">-The email feild is requrid</p>
            )}
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Pssword
            </label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password", { required: true })}
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {errors.password && (
              <p className="text-red-500">-The password feild is requrid</p>
            )}
          </div>
          <button
            type="submit"
            className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg"
          >
            {loading ? "Loading ..." : "Login"}
          </button>
          <p className="text-xs text-gray-500 mt-3">
            don't have an account ?
            <Link href="/register">
              <span className="text-yellow-500 cursor-pointer">Register</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

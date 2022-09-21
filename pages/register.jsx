import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";
import { useForm } from "react-hook-form";

function Register() {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (userInfo) {
      router.push(redirect || "/");
    }
  }, [router, userInfo, redirect]);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/users/register", values);
      setLoading(false);
      dispatch({ type: "USER_LOGIN", payload: data });
      jsCookie.set("userInfo", JSON.stringify(data));
      router.push(redirect || "/");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="text-gray-600 body-font relative">
      <div className="container h-[80vh] px-5 m-auto flex">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col m-auto w-full relative z-10 shadow-md"
        >
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              {...register("name", { required: true })}
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {errors.name && (
              <p className="text-red-500">-The name feild is requrid</p>
            )}
          </div>
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
            {loading ? "loading..." : "Register"}
          </button>
          <p className="text-xs text-gray-500 mt-3">
            already have an account ?{" "}
            <Link href="/login">
              <span className="text-yellow-500 cursor-pointer">Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;

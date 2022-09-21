import Link from "next/link";
import { useRouter } from "next/router";
import jsCookie from "js-cookie";
import React, { useContext } from "react";
import { Store } from "../utils/Store";

function Header() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const handleLogout = () => {
    dispatch({ type: "USER_LOGOUT" });
    jsCookie.remove("userInfo");
    window.location.reload()
  };

  return (
    <div className="text-gray-600 body-font border-solid border-black border border-t-0 border-x-0">
      <div className="container mx-auto flex flex-wrap py-2 p-5 flex-row items-center justify-between">
        <Link
          href="/"
          className="title-font cursor-pointer object-contain font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img src="/assets/medium.png" alt="medium" className="w-48 p-2 " />
        </Link>
        <div>
          <nav className="hidden md:ml-auto md:inline-flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900">Our story</a>
            <a className="mr-5 hover:text-gray-900">Membership</a>
            <a className="mr-5 hover:text-gray-900">Write</a>
          </nav>
          {userInfo !== null ? (
            <div className="group inline-flex bg-white border rounded-md cursor-pointer">
              <button
                type="button"
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-l-md"
              >
                {userInfo && userInfo.name}
              </button>

              <div className="relative">
                <button
                  type="button"
                  className="inline-flex items-center justify-center h-full px-2 text-gray-600 border-l border-gray-100 hover:text-gray-700 rounded-r-md hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => handleLogout()}
                  className="group-focus-within:block hidden cursor-pointer absolute right-0 z-10 w-44 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg"
                >
                  <div className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700">
                    Logout
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/login">
                <span className="hidden sm:inline-flex mr-5 cursor-pointer hover:text-gray-900">
                  Sign In
                </span>
              </Link>
              <Link href="/register">
                <button className="inline-flex items-center bg-black text-white border-0 py-1 px-4 focus:outline-none hover:bg-slate-900 rounded-full text-base">
                  Get started
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

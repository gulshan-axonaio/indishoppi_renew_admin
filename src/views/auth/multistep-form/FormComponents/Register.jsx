import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

const Register = ({ state, setSatate, location }) => {
  const inputHandle = (e) => {
    setSatate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-w-screen  bg-[#161d31] text-white">
      <div className="bg-[#283046] p-8 rounded-md  ">
        <h2 className="text-3xl font-semibold mb-4">Welcome to Indi Shopee</h2>
        <p className="text-sm mb-3">
          Please register to your account and start your bussiness
        </p>
        <div className="flex flex-col w-full gap-1 mb-3 ">
          <label htmlFor="name">Name</label>
          <input
            onChange={inputHandle}
            value={state.name}
            className="px-3 py-2 outline-none border border-slate-700 bg-[#283046] rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"
            type="text"
            name="name"
            placeholder="name"
            id="name"
            required
          />
        </div>
        <div className="flex flex-col w-full gap-1 mb-3">
          <label htmlFor="email">Email</label>
          <input
            onChange={inputHandle}
            value={state.email}
            className="px-3 py-2 outline-none border border-slate-700 bg-[#283046] rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"
            type="email"
            name="email"
            placeholder="email"
            id="email"
            required
          />
        </div>
        <div className="flex flex-col w-full gap-1 mb-3">
          <label htmlFor="password">Password</label>
          <input
            onChange={inputHandle}
            value={state.password}
            className="px-3 py-2 outline-none border border-slate-700 bg-[#283046] rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"
            type="password"
            name="password"
            placeholder="password"
            id="password"
            required
          />
        </div>
        {location?.pathname.includes("/admin/addseller") ? null : (
          <>
            <div className="flex items-center w-full gap-3 mb-3">
              <input
                className="w-4 h-4 text-blue-600 overflow-hidden bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                type="checkbox"
                name="checkbox"
                id="checkbox"
                required
              />
              <label htmlFor="checkbox">
                I agree to privacy policy & terms
              </label>
            </div>
            <div className="flex items-center mb-3 gap-3 justify-start">
              <p>
                Already have an account ?
                <Link
                  className="text-sm underline text-blue-300 ml-2"
                  to={"/login"}
                >
                  Sign In here
                </Link>
              </p>
            </div>
          </>
        )}
        {/* <button
              type="button"
              onClick={submit}
              className="bg-[#161d31] w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
            >
              Signup
            </button> */}

        <div className="w-full flex justify-center items-center mb-3">
          <div className="w-[45%] bg-slate-700 h-[1px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;

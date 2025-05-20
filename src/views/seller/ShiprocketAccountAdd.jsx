import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  messageClear,
  shiprocket_account_add,
} from "../../store/Reducers/authReducer";
import { Link } from "react-router-dom";

const ShiprocketAccountAdd = () => {
  const [state, setState] = useState({
    shiprocket_email: "",
    shiprocket_password: "",
  });

  const dispatch = useDispatch();
  const { successMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      messageClear();
    }
  }, [successMessage]);

  const add = (e) => {
    e.preventDefault();
    dispatch(shiprocket_account_add(state));
  };

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-12/12">
          <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0">
            <div className="bg-[#283046] rounded-md text-[#d0d2d6] p-4">
              <div className="flex justify-between items-center pb-4">
                <h1 className="text-[#d0d2d6] text-2xl uppercase font-semibold">
                  Add Shiprocket Account
                </h1>
                <Link
                  className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 "
                  to="/seller/dashboard/shiprocket-account"
                >
                  All List
                </Link>
              </div>
              <form onSubmit={add}>
                <div className="flex gap-4 mb-3">
                  <div className="flex-1">
                    <label htmlFor="shiprocket_email">EMAIL</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="email"
                      placeholder="Email"
                      name="shiprocket_email"
                      id="shiprocket_email"
                      onChange={inputHandle}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="shiprocket_password">Password</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="Password"
                      name="shiprocket_password"
                      id="shiprocket_password"
                      onChange={inputHandle}
                    />
                  </div>
                </div>

                <button className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 mt-5">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiprocketAccountAdd;

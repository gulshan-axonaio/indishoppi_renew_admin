import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ShiprocketAccount = () => {
  const { userInfo } = useSelector((state) => state.auth);

  console.log("userInfo", userInfo);

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-[#d0d2d6] text-2xl uppercase font-semibold">
          Shiprocket Account Detail
        </h1>
        <Link
          className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 "
          to="/seller/dashboard/shiprocket-account-add"
        >
          Add New
        </Link>
      </div>
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Password
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  scope="row"
                  className="py-1 px-4 font-medium whitespace-nowrap"
                >
                  {userInfo.shiprocket_email ? 1 : ""}
                </td>
                <td className="py-3 px-4 font-medium whitespace-nowrap">
                  <span>
                    {userInfo.shiprocket_email ? userInfo.shiprocket_email : ""}
                  </span>
                </td>
                <td className="py-3 px-4 font-medium whitespace-nowrap">
                  <span>
                    {userInfo.shiprocket_password
                      ? userInfo.shiprocket_password
                      : ""}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShiprocketAccount;

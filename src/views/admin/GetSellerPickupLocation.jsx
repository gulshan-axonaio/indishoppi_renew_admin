import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { FaClone } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import Pagination from "../Pagination";
import Search from "../components/Search";
import { useSelector, useDispatch } from "react-redux";
import { admin_get_seller_pickuplocation } from "../../store/Reducers/OrderReducer";
import Swal from "sweetalert2";

const GetSellerPickupLocation = () => {
  const dispatch = useDispatch();
  const { valueName } = useParams();
  const { totalPickupLocation, myPickupLocation } = useSelector(
    (state) => state.order
  );
  // const { userInfo } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  useEffect(() => {
    dispatch(
      admin_get_seller_pickuplocation({
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue,
        valueName,
      })
    );
  }, [dispatch, parPage, currentPage, searchValue, valueName]);

  console.log("myPickupLocation", myPickupLocation);

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-[#d0d2d6] text-2xl uppercase font-semibold">
          All Pickup Location
        </h1>
        {/* <Link
          className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 "
          to="/seller/dashboard/add-pickup-location"
        >
          Add New
        </Link> */}
      </div>
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Phone
                </th>
                <th scope="col" className="py-3 px-4">
                  Pincode
                </th>
                <th scope="col" className="py-3 px-4">
                  State
                </th>
                <th scope="col" className="py-3 px-4">
                  City
                </th>

                <th scope="col" className="py-3 px-4">
                  Status
                </th>

                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {(myPickupLocation || []).map((d, i) => (
                <tr key={i}>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {i + 1}
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>{d.name}</span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    {d.email}
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>{d.phone}</span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>{d.pin_code}</span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    {d.state}
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    {d.city}
                  </td>

                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <button
                      className={`px-4 py-2 text-white rounded ${
                        d.status === 0
                          ? "bg-blue-500"
                          : d.status === 1
                          ? "bg-geen-500"
                          : "bg-red-500"
                      }`}
                    >
                      {d.status === 0
                        ? "Pending"
                        : d.status === 1
                        ? "Active"
                        : "Rejected"}
                    </button>
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/admin/dashboard/edit-pickup-location/${d._id}`}
                        className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                      >
                        <FaEdit />
                      </Link>
                      <Link
                        className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                        to={`/admin/dashboard/pickuplocation/pickuplocationDetail/${d._id}`}
                      >
                        <FaEye />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPickupLocation <= parPage ? (
          ""
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalPickupLocation}
              parPage={parPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GetSellerPickupLocation;

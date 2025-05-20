import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Pagination from "../Pagination";
import Search from "../components/Search";
import { useSelector, useDispatch } from "react-redux";
import { admin_get_productType } from "../../store/Reducers/OrderReducer";

import {
  delete_product_type,
  messageClear,
} from "../../store/Reducers/categoryReducer";
import Swal from "sweetalert2";

const ProductType = () => {
  const dispatch = useDispatch();
  const { valueName } = useParams();
  const {
    totalProductType,
    productType,
    successMessage,
    errorMessage,
  } = useSelector((state) => state.order);

  console.log("productType", productType);

  // const { userInfo } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(50);

  console.log("totalProductType", totalProductType);

  useEffect(() => {
    dispatch(
      admin_get_productType({ parPage, page: currentPage, searchValue })
    );
  }, [dispatch, parPage, currentPage, searchValue, valueName]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      dispatch(
        admin_get_productType({ parPage, page: currentPage, searchValue })
      );
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  console.log("productType", productType);

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-[#545A58] text-2xl uppercase font-semibold">
          All Product Type
        </h1>
        <Link
          className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 "
          to="/admin/dashboard/filter/add-product-type"
        >
          Add New
        </Link>
      </div>
      <div className="w-full p-4  bg-[#F7F7F7] rounded-md">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#545A58]">
            <thead className="text-sm text-[#545A58] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Product Type
                </th>

                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {(productType || []).map((d, i) => (
                <tr key={i}>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {i + 1}
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>{d.productType}</span>
                  </td>

                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/admin/dashboard/filter/edit-product-type/${d._id}`}
                        className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                      >
                        <FaEdit />
                      </Link>
                      <Link
                        className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"
                        onClick={() =>
                          Swal.fire({
                            title: "Are you sure to delete this product type?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              dispatch(delete_product_type(d._id));
                              Swal.fire({
                                title: "Deleted!",
                                text: "Product Type has been deleted.",
                                icon: "success",
                              });
                            }
                          })
                        }
                      >
                        <FaTrash />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalProductType <= parPage ? (
          ""
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalProductType}
              parPage={parPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductType;

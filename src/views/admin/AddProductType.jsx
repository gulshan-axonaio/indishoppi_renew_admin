import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  productTypeAdd,
  messageClear,
} from "../../store/Reducers/categoryReducer";

const AddProductType = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.category
  );
  const [state, setState] = useState({
    productType: "",
  });

  const add_product_type = async (e) => {
    e.preventDefault();

    const productTypeData = {
      productType: state.productType,
    };
    dispatch(productTypeAdd(productTypeData));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
      });
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex lg:hidden  items-center mb-5 p-4 bg-[#F7F7F7] rounded-md">
        <h1 className="text-[#545A58] font-semibold text-lg">Product Type</h1>
        <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-4 py-2 cursor-pointer text-white rounded-sm text-sm">
          Add
        </button>
      </div>
      <div className="">
        <div className="">
          <div className="pl-5">
            <div className="bg-[#F7F7F7]  px-3 py-2 lg:rounded-md text-[#545A58]">
              <div className="flex justify-between items-center pb-4">
                <h1 className="text-[#545A58] text-2xl uppercase font-semibold">
                  Add Product Type
                </h1>
                <Link
                  className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 "
                  to="/admin/dashboard/filter/product-type"
                >
                  Product Type
                </Link>
              </div>
              <form onSubmit={add_product_type}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="productType">Type</label>
                  <input
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, productType: e.target.value })
                    }
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#F7F7F7] border border-slate-700 rounded-md text-[#545A58]"
                    type="text"
                    id="productType"
                    name="productType"
                    placeholder="Product Type"
                    required
                  />
                </div>

                <div className="mt-4">
                  <button
                    disabled={loader ? true : false}
                    className="bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductType;

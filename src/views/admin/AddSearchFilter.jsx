import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  searchFilterAdd,
  messageClear,
  get_filter_option_new,
} from "../../store/Reducers/categoryReducer";

const AddSearchFilter = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage, productTypesRes } = useSelector(
    (state) => state.category
  );

  const [state, setState] = useState({
    productType: "",
    options: [""],
  });

  // new

  const staticFields = [
    "brand",
    "price",
    "stock",
    "shopName",
    "images",
    "rating",
    "color",
    "views",
  ];

  const add_product_type = async (e) => {
    e.preventDefault();

    const productTypeData = {
      productType: state.productType,
      options: state.options.filter((opt) => opt.trim() !== ""),
    };

    dispatch(searchFilterAdd(productTypeData));
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
        productType: "",
        options: [""],
      });
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    dispatch(get_filter_option_new());
  }, [successMessage, errorMessage]);

  useEffect(() => {
    const selectedType = productTypesRes.find(
      (item) => item._id === state.productType
    );

    if (selectedType && selectedType.options?.length > 0) {
      const optionLabels = selectedType.options.map((opt) => opt.label);
      setState((prev) => ({
        ...prev,
        options: optionLabels.length ? [optionLabels[0]] : [""],
      }));
    } else {
      setState((prev) => ({ ...prev, options: [""] }));
    }
  }, [state.productType, productTypesRes]);

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
                  Add Search Filter
                </h1>
                <Link
                  className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 "
                  to="/admin/dashboard/get-search-filter"
                >
                  Search Filter
                </Link>
              </div>
              <form onSubmit={add_product_type}>
                {/* Product Type Input */}
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="productType">Type</label>
                  <select
                    required
                    id="type"
                    name="productType"
                    value={state.productType}
                    onChange={(e) =>
                      setState({ ...state, productType: e.target.value })
                    }
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#F7F7F7] border border-slate-700 rounded-md text-[#545A58]"
                  >
                    <option value="">Select</option>
                    {(productTypesRes || []).map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.productType
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col w-full gap-1 mb-3">
                  <label>Options</label>
                  {state.options.map((opt, index) => {
                    const selectedType = productTypesRes.find(
                      (p) => p._id === state.productType
                    );
                    const dynamicOptions = selectedType?.options || [];
                    const availableOptions = [
                      ...staticFields,
                      ...dynamicOptions.map((opt) => opt.label),
                    ];

                    return (
                      <div key={index} className="flex gap-2 items-center mb-2">
                        <select
                          value={opt}
                          onChange={(e) => {
                            const updatedOptions = [...state.options];
                            updatedOptions[index] = e.target.value;
                            setState({ ...state, options: updatedOptions });
                          }}
                          className="flex-1 px-4 py-2 border border-slate-700 rounded-md"
                        >
                          <option value="">Select option</option>
                          {availableOptions.map((item, idx) => (
                            <option key={idx} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>

                        {/* Remove Option Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const updatedOptions = [...state.options];
                            updatedOptions.splice(index, 1);
                            if (updatedOptions.length === 0) {
                              updatedOptions.push("");
                            }
                            setState({ ...state, options: updatedOptions });
                          }}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          −
                        </button>

                        {/* Add Option Button */}
                        {index === state.options.length - 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setState({
                                ...state,
                                options: [...state.options, ""],
                              })
                            }
                            className="bg-green-500 text-white px-2 py-1 rounded"
                          >
                            +
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4">
                  <button
                    disabled={loader}
                    className="bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                  >
                    {loader ? "Updating..." : "Update"}
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

export default AddSearchFilter;

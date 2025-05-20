import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  get_product_type,
  productTypeUpdate,
  messageClear,
} from "../../store/Reducers/categoryReducer";

const EditProductType = () => {
  const { productTypeId } = useParams();
  const dispatch = useDispatch();

  const { loader, successMessage, errorMessage, getproductType } = useSelector(
    (state) => state.category
  );

  const sectionOptions = [
    "General",
    "Display",
    "Camera",
    "Performance",
    "Connectivity",
    "Battery",
    "Build",
    "Other",
    "Hardware",
    "Power",
    "Software",
    "Input Devices",
    "Usage",
    "Audio",
    "Security",
    "Warranty",
    "Zoom & Lens",
    "Multimedia",
  ];

  const [state, setState] = useState({
    productType: "",
    options: [{ label: "", section: "" }],
  });

  const update_product_type = async (e) => {
    e.preventDefault();

    const productTypeData = {
      productTypeId: productTypeId,
      productType: state.productType,
      options: state.options
        .filter((opt) => opt.label.trim() !== "" && opt.section.trim() !== "")
        .map(({ label, section }) => ({ label, section })),
    };

    dispatch(productTypeUpdate(productTypeData));
  };

  useEffect(() => {
    dispatch(get_product_type(productTypeId));
  }, [productTypeId]);

  useEffect(() => {
    if (getproductType) {
      setState({
        productType: getproductType.productType || "",
        options: getproductType.options?.length
          ? [...getproductType.options]
          : [{ label: "", section: "" }],
      });
    }
  }, [getproductType]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex lg:hidden items-center mb-5 p-4 bg-[#F7F7F7] rounded-md">
        <h1 className="text-[#545A58] font-semibold text-lg">Product Type</h1>
        <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-4 py-2 cursor-pointer text-white rounded-sm text-sm">
          Add
        </button>
      </div>
      <div className="">
        <div className="">
          <div className="pl-5">
            <div className="bg-[#F7F7F7] px-3 py-2 lg:rounded-md text-[#545A58]">
              <div className="flex justify-between items-center pb-4">
                <h1 className="text-[#545A58] text-2xl uppercase font-semibold">
                  Edit Product Type
                </h1>
                <Link
                  className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
                  to="/admin/dashboard/filter/product-type"
                >
                  Product Type
                </Link>
              </div>
              <form onSubmit={update_product_type}>
                {/* Product Type Input */}
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="productType">Type</label>
                  <input
                    value={state.productType}
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

                {/* Dynamic Options (Label + Section) */}
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label>Options (Label & Section)</label>
                  {state.options.map((opt, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row gap-2 mb-2"
                    >
                      <input
                        type="text"
                        value={opt.label}
                        onChange={(e) => {
                          const updatedOptions = state.options.map((o, i) =>
                            i === index ? { ...o, label: e.target.value } : o
                          );
                          setState({ ...state, options: updatedOptions });
                        }}
                        className="flex-1 px-4 py-2 border border-slate-700 rounded-md"
                        placeholder={`Label ${index + 1}`}
                      />
                      <select
                        value={opt.section}
                        onChange={(e) => {
                          const updatedOptions = state.options.map((o, i) =>
                            i === index ? { ...o, section: e.target.value } : o
                          );
                          setState({ ...state, options: updatedOptions });
                        }}
                        className="flex-1 px-4 py-2 border border-slate-700 rounded-md"
                      >
                        <option value="">Select Section</option>
                        {sectionOptions.map((sec, i) => (
                          <option key={i} value={sec}>
                            {sec}
                          </option>
                        ))}
                      </select>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            const updatedOptions = [...state.options];
                            updatedOptions.splice(index, 1);
                            if (updatedOptions.length === 0) {
                              updatedOptions.push({ label: "", section: "" });
                            }
                            setState({ ...state, options: updatedOptions });
                          }}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          −
                        </button>
                        {index === state.options.length - 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setState({
                                ...state,
                                options: [
                                  ...state.options,
                                  { label: "", section: "" },
                                ],
                              })
                            }
                            className="bg-green-500 text-white px-2 py-1 rounded"
                          >
                            +
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
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

export default EditProductType;

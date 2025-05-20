import React, { useState, useEffect } from "react";
import { BsImages } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { get_category } from "../../../../store/Reducers/categoryReducer";
import {
  seller_kyc_data,
  messageClear,
  forward_email_data,
} from "../../../../store/Reducers/authReducer";
import toast from "react-hot-toast";

// Add Product
const Onboarding = ({ state, setState }) => {
  console.log(state);
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );
  const { categorys } = useSelector((state) => state?.category);
  const { email } = useSelector((state) => state?.auth);

  useEffect(() => {
    dispatch(
      get_category({
        searchValue: "",
        parPage: "",
        page: "",
      })
    );

    console.log("categorys", categorys);
  }, []);
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValue = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(srcValue);
    } else {
      setAllCategory(categorys);
    }
  };

  useEffect(() => {
    setAllCategory(categorys);
  }, [categorys]);

  // const SubmitKyc = (e) => {
  //   e.preventDefault();
  //   const obj = {
  //     businessName: state.businessName,
  //     businessSubcategory: state.businessSubcategory,
  //     panNo: state.panNo,
  //     adhaarNo: state.adhaarNo,
  //     businessAddress: state.businessAddress,
  //     businessPincode: state.businessPincode,
  //     gstNo: state.gstNo,
  //     email: email,
  //   };
  //   console.log(obj, "obj,,");
  //   dispatch(seller_kyc_data(obj));
  //   dispatch(forward_email_data(obj.email));
  // };
  return (
    <div className=" p-8 rounded-xl   bg-[#283046]  ">
      <div className="flex justify-between items-center ">
        <h1 className="text-[#d0d2d6] text-3xl  font-semibold">
          Seller Onboarding
        </h1>
      </div>
      <div className=" ">
        <form>
          <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6] mt-10">
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="businessName">Business Name</label>
              <input
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.businessName}
                type="text"
                placeholder="Business name"
                name="businessName"
                id="businessName"
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="panNo">PAN Number</label>
              <input
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.panNo}
                type="text"
                placeholder="PAN no"
                name="panNo"
                id="panNo"
              />
            </div>
          </div>
          <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6] mt-10">
            <div className="flex flex-col w-full gap-1 relative">
              <label htmlFor="category">Business Category</label>
              <input
                readOnly
                onClick={() => setCateShow(!cateShow)}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={category}
                type="text"
                placeholder="--select category--"
                id="category"
              />
              <div
                className={`absolute top-[101%] bg-slate-800 w-full transition-all ${
                  cateShow ? "scale-100" : "scale-0"
                }`}
              >
                <div className="w-full px-4 py-2 fixed">
                  <input
                    value={searchValue}
                    onChange={categorySearch}
                    className="px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden"
                    type="text"
                    placeholder="search"
                  />
                </div>
                <div className="pt-14"></div>
                <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scroll">
                  {allCategory.map((c, i) => (
                    <span
                      className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                        category === c.name && "bg-indigo-500"
                      }`}
                      onClick={() => {
                        setCateShow(false);
                        setCategory(c.name);

                        setState({ ...state, businessCategory: c.name });
                        setSearchValue("");
                        setAllCategory(categorys);
                      }}
                    >
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="businessSubcategory">Business Subcategory</label>
              <input
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.businessSubcategory}
                type="text"
                placeholder="business subcategory"
                name="businessSubcategory"
                id="businessSubcategory"
              />
            </div>
          </div>

          <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6] mt-10">
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="adhaarNo">Aadhaar Number</label>
              <input
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.adhaarNo}
                type="number"
                placeholder="Adhaar No"
                name="adhaarNo"
                id="adhaarNo"
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="businessAddress">Business Address</label>
              <input
                min="0"
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.businessAddress}
                type="text"
                placeholder="Business address"
                name="businessAddress"
                id="businessAddress"
              />
            </div>
          </div>
          <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6] mt-10">
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="businessPincode">Business Pincode</label>
              <input
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.businessPincode}
                type="number"
                placeholder="Business Pincode"
                name="businessPincode"
                id="businessPincode"
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="gstNo">GST No ( optional )</label>
              <input
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.gstNo}
                type="text"
                placeholder="GST No"
                name="gstNo"
                id="gstNo"
              />
            </div>
          </div>
          {/* <button
              className="bg-purple-700 w-[20px] h-[60px] text-white  rounded-lg text-xl mt-6 font-semibold hover:bg-purple-600"
              onClick={SubmitKyc}
            >
              Submit Details
            </button> */}
        </form>
      </div>
    </div>
  );
};

export default Onboarding;

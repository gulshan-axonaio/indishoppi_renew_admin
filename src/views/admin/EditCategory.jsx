import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
// import {
//   get_category,
//   get_one_category,
// } from "../../store/Reducers/categoryReducer";
import toast from "react-hot-toast";
function EditCategory() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  // const { categorys, singleCategory } = useSelector((state) => state?.category);
  // console.log(singleCategory, "one categories..");
  //   useEffect(() => {
  //     get_one_category(categoryId);
  //   }, [categoryId]);
  return (
    <>
      <h1>hello</h1>
    </>
    // <div
    //   className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
    //     show ? "right-0" : "-right-[340px]"
    //   } z-[9999] top-0 transition-all duration-500`}
    // >
    //   <div className="w-full pl-5">
    //     <div className="bg-[#283046] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]">
    //       <div className="flex justify-between items-center mb-4">
    //         <h1 className="text-[#d0d2d6] font-semibold text-xl">
    //           Add Category
    //         </h1>
    //         <div
    //           onClick={() => setShow(false)}
    //           className="block lg:hidden cursor-pointer"
    //         >
    //           <GrClose className="text-[#d0d2d6]" />
    //         </div>
    //       </div>
    //       <form onSubmit={add_category}>
    //         <div className="flex flex-col w-full gap-1 mb-3">
    //           <label htmlFor="name">Category name</label>
    //           <input
    //             value={state.name}
    //             onChange={(e) => setState({ ...state, name: e.target.value })}
    //             className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
    //             type="text"
    //             id="name"
    //             name="category_name"
    //             placeholder="category name"
    //             required
    //           />
    //         </div>
    //         <div>
    //           <label
    //             className="flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-indigo-500 w-full border-[#d0d2d6]"
    //             htmlFor="image"
    //           >
    //             {imageShow ? (
    //               <img className="w-full h-full" src={imageShow} />
    //             ) : (
    //               <>
    //                 <span>
    //                   <BsImage />
    //                 </span>
    //                 <span>select Image</span>
    //               </>
    //             )}
    //           </label>
    //         </div>
    //         <input
    //           onChange={imageHandle}
    //           className="hidden"
    //           type="file"
    //           name="image"
    //           id="image"
    //           required
    //         />
    //         <div className="mt-4">
    //           <button
    //             disabled={loader ? true : false}
    //             className="bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
    //           >
    //             {loader ? (
    //               <PropagateLoader color="#fff" cssOverride={overrideStyle} />
    //             ) : (
    //               "Add Category"
    //             )}
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
}

export default EditCategory;

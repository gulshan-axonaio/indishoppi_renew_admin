import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { BsImage } from "react-icons/bs";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import Search from "../components/Search";
import Swal from "sweetalert2";
import axios from "axios";
import {
  get_category,
  totalsubCategory,
  subcategorys,
  get_filter_option_new,
} from "../../store/Reducers/categoryReducer";
import {
  sub_Category_add,
  sub_category_update,
  get_sub_category,
  delete_sub_category,
  get_one_sub_category,
  messageClear,
} from "../../store/Reducers/subCategoryReducer";
import { get_user_info } from "../../store/Reducers/authReducer";

const SubCategory = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);
  const [imageShow, setImage] = useState("");
  const [state, setState] = useState({
    name: "",
    image: "",
    categoryId: undefined,
  });
  // const [images, setImages] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [type, setType] = useState("");

  const { categorys, productTypesRes } = useSelector((state) => state.category);
  const {
    loader,
    subCategory,
    errorMessage,
    successMessage,
    subCategorys,
    totalSubCategory,
  } = useSelector((state) => state?.subCategory);
  const { userInfo } = useSelector((state) => state?.auth);

  const handleEdit = (subcategory) => {
    setState({
      name: subcategory.name,
      image: subcategory.image,
      categoryId: subcategory.categoryId,
      productType: subcategory.productType,
    });
    setImage(subcategory.image);
    setEditMode(true);
    setEditId(subcategory._id);
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
        image: "",
        categoryId: "",
        productType: "",
      });
      setImage("");
      setEditMode(false);
      setEditId(null);
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    if (token) {
      dispatch(get_user_info());

      dispatch(
        get_category({
          searchValue: "",
          parPage: "",
          page: "",
        })
      );
    }
  }, [token]);

  // useEffect(() => {
  //   dispatch(get_sub_category);
  // }, [subCategory?.length]);

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

  const imageHandle = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImage(URL.createObjectURL(files[0]));
      setState({
        ...state,
        image: files[0],
      });
    }
  };

  const add_sub_category = async (e) => {
    e.preventDefault();

    let imageUrl = state.image;

    if (!editMode && !state.image) {
      return toast.error("Please select an image!");
    }

    if (state.image && state.image instanceof File) {
      const formData = new FormData();
      formData.append("image", state.image);

      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_LOCALBACKEND}/api/upload`,
          formData
        );

        if (!data.imageUrl) {
          throw new Error("Image upload failed!");
        }

        imageUrl = data.imageUrl;
      } catch (error) {
        return toast.error(error.message);
      }
    }

    const subCategoryData = {
      name: state.name,
      image: imageUrl,
      categoryId: state.categoryId,
      productType: state.productType,
    };

    if (editMode) {
      subCategoryData.id = editId;

      console.log("subCategoryData", subCategoryData);

      dispatch(sub_category_update(subCategoryData));
    } else {
      dispatch(sub_Category_add(subCategoryData));
    }

    dispatch(messageClear());
  };

  useEffect(() => {
    dispatch(get_sub_category());
  }, [subCategorys]);

  useEffect(() => {
    dispatch(get_sub_category());
  }, [successMessage, errorMessage]);

  useEffect(() => {
    dispatch(get_filter_option_new());
  }, [successMessage, errorMessage]);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_sub_category(obj));
  }, [searchValue, currentPage, parPage]);
  // console.log(subCategory, "sub category...");
  console.log("productTypesRes", productTypesRes);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#F7F7F7] rounded-md">
        <h1 className="text-[#545A58] font-semibold text-lg">Sub category</h1>
        <button
          onClick={() => setShow(true)}
          className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-4 py-2 cursor-pointer text-white rounded-sm text-sm"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-7/12">
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
                      Image
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Name
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Category
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(subCategorys || []).map((d, i) => (
                    <tr key={i}>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        {i + 1}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <img
                          className="w-[45px] h-[45px] object-cover"
                          src={d.image}
                          alt=""
                        />
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <span>{d.name}</span>
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <span>{d.categoryName}</span>
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <div className="flex justify-start items-center gap-4">
                          <button
                            className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                            onClick={() => handleEdit(d)}
                          >
                            <FaEdit />
                          </button>
                          <Link
                            className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"
                            onClick={() =>
                              Swal.fire({
                                title:
                                  "Are you sure to delete this sub category?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  dispatch(delete_sub_category(d._id));
                                  Swal.fire({
                                    title: "Deleted!",
                                    text: "Category has been deleted.",
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
            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={totalSubCategory}
                parPage={parPage}
                showItem={5}
              />
            </div>
          </div>
        </div>
        <div
          className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-[9999] top-0 transition-all duration-500`}
        >
          <div className="w-full pl-5">
            <div className="bg-[#F7F7F7] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#545A58]">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-[#545A58] font-semibold text-xl">
                  Add Sub-Category
                </h1>
                <div
                  onClick={() => setShow(false)}
                  className="block lg:hidden cursor-pointer"
                >
                  <GrClose className="text-[#545A58]" />
                </div>
              </div>
              <form onSubmit={add_sub_category}>
                {/* EXTRA INPUT */}

                <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#545A58]">
                  <div className="flex flex-col w-full gap-1 relative">
                    <div className="flex flex-col mb-3 w-full text-[#545A58]">
                      <label htmlFor="type" className="mb-1">
                        Product Type
                      </label>
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

                    <label htmlFor="category">select Category</label>
                    <select
                      name="categoryId"
                      readOnly
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#F7F7F7] border border-slate-700 rounded-md text-[#545A58]"
                      onChange={inputHandle}
                      value={state.categoryId}
                      type="text"
                      placeholder="--select category--"
                      id="category"
                    >
                      <option value={""}> select Category</option>
                      {categorys.map((c, i) => (
                        <option
                          value={c._id}
                          key={c.name + i}
                          className="px-2 py-2"
                        >
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <div
                      className={`absolute top-[101%] bg-slate-800 w-full transition-all ${
                        cateShow ? "scale-100" : "scale-0"
                      }`}
                    >
                      <div className="w-full px-4 py-2 fixed">
                        <input
                          value={searchValue}
                          onChange={categorySearch}
                          className="px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#545A58] overflow-hidden"
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
                </div>
                {/* ----------------- */}
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="name">Sub Category name</label>
                  <input
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#F7F7F7] border border-slate-700 rounded-md text-[#545A58]"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="sub_category_name"
                    required
                  />
                </div>
                <div>
                  <label
                    className="flex justify-center items-center flex-col h-full cursor-pointer border border-dashed hover:border-indigo-500 w-full border-[#545A58]"
                    htmlFor="image"
                  >
                    {imageShow ? (
                      <img
                        className="w-full h-full object-cover"
                        src={imageShow}
                      />
                    ) : (
                      <>
                        <span>
                          <BsImage />
                        </span>
                        <span>select Image</span>
                      </>
                    )}
                  </label>
                </div>
                <input
                  onChange={imageHandle}
                  className="hidden"
                  type="file"
                  name="image"
                  id="image"
                  {...(!editMode && { required: true })}
                />
                <div className="mt-4">
                  <button
                    disabled={loader ? true : false}
                    className="bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                  >
                    {loader ? (
                      <PropagateLoader
                        color="#fff"
                        cssOverride={overrideStyle}
                      />
                    ) : editMode ? (
                      "Update Category"
                    ) : (
                      "Add Category"
                    )}
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

export default SubCategory;

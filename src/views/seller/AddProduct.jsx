import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";
import { BsImages } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { get_category } from "../../store/Reducers/categoryReducer";
import axios from "axios";
import {
  get_sub_cat_by_category,
  get_sub_category,
} from "../../store/Reducers/subCategoryReducer";
import { add_product, messageClear } from "../../store/Reducers/productReducer";
import { get_user_info } from "../../store/Reducers/authReducer";

// Add Product
const AddProduct = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [productTypes, setProductTypes] = useState([]);
  const [options, setOptions] = useState([]);

  const { categorys } = useSelector((state) => state.category);
  const { subCategorys, specificSubCategory } = useSelector(
    (state) => state.subCategory
  );

  // console.log("specificSubCategory", specificSubCategory);
  console.log("productTypes", productTypes);

  const [allSubaCats, setAllSubCats] = useState(subCategorys);
  const { successMessage, errorMessage, loader } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    setAllSubCats(specificSubCategory);
  }, [specificSubCategory]);
  const { userInfo } = useSelector((state) => state?.auth);
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
      dispatch(
        get_sub_category({
          searchValue: "",
          parPage: "",
          page: "",
        })
      );
    }
  }, [token]);

  const [state, setState] = useState({
    type: "",
    stock: "",
    name: "",
    shopName: userInfo?.businessName,
    category: "",
    subcategory: "",
    description: "",
    price: "",
    discount: "",
    discountedPrice: "",
    brand: "",
    color: "",
    colorCode: "",
  });

  useEffect(() => {
    const updatedState = { ...state };
    options.forEach((option) => {
      if (!(option in updatedState)) {
        updatedState[option] = "";
      }
    });
    setState(updatedState);
  }, [options]);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const { data } = await api.get("/product-types", {
          withCredentials: true,
        });

        console.log("response", data.product);

        setProductTypes(data.product);
      } catch (error) {
        console.error("Error fetching product types", error);
      }
    };

    fetchProductTypes();
  }, []);

  useEffect(() => {
    setState({
      ...state,
      discountedPrice: Math.round(
        state.price - (state.discount * state.price) / 100
      ).toString(),
    });
  }, [state.discount, state.price]);
  const inputHandle = (e) => {
    const { name, value } = e.target;

    console.log(name, value);

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [cateShow, setCateShow] = useState(false);
  const [type, setType] = useState("");
  const [newtype, setNewType] = useState("");
  const [SubcateShow, setSubCateShow] = useState(false);
  const [category, setCategory] = useState({});
  const [subcategory, setSubCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [SubCatsearchValue, setSubCatSearchValue] = useState("");

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
  const subCategorySearch = (e) => {
    const value = e.target.value;
    setSubCatSearchValue(value);
    if (value) {
      let srcValue = allSubCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      console.log("srcValue", srcValue);
      setAllSubCategory(srcValue);
    } else {
      setAllSubCategory(allSubCategory);
    }
  };
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);
  const imageHandle = (e) => {
    e.preventDefault();
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setImages([...images, ...files]);
      let imageUrl = [];

      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
  };

  const uploadImagesToS3 = async (images) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCALBACKEND}/api/uploadMultiple`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data.imageUrls;
    } catch (error) {
      console.error("Image upload failed:", error);
      return [];
    }
  };

  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = imageShow;
      let tempImages = images;

      tempImages[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };
      setImageShow([...tempUrl]);
      setImages([...tempImages]);
    }
  };

  const removeImage = (i) => {
    const filterImage = images.filter((img, index) => index !== i);
    const filterImageUrl = imageShow.filter((img, index) => index !== i);
    setImages(filterImage);
    setImageShow(filterImageUrl);
  };

  const add = async (e) => {
    e.preventDefault();

    const selectedSubCategoryObj = specificSubCategory.find(
      (s) => s.name === subcategory
    );
    const selectedTypeObj = productTypes.find((p) => p._id === type);

    const dynamicFields = {};
    options.forEach((option) => {
      dynamicFields[option] = state[option] || "";
    });

    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    const imageUrls = await uploadImagesToS3(images);
    if (imageUrls.length === 0) {
      toast.error("Image upload failed. Try again.");
      return;
    }
    const productData = {
      type: selectedTypeObj?._id || null,
      stock: state.stock,
      name: state.name,
      shopName: state.shopName,
      category: category._id,
      subcategory: selectedSubCategoryObj?._id || null,
      description: state.description,
      price: state.price,
      discount: state.discount,
      discountedPrice: state.discountedPrice,
      brand: state.brand,
      color: state.color,
      colorCode: state.colorCode,
      imageUrls,
      ...dynamicFields,
    };

    dispatch(add_product(productData));
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
        type: "",
        category: "",
        subcategory: "",
        name: "",
        description: "",
        stock: "",
        price: "",
        discount: "",
        discountPrice: "",
        brand: "",
        color: "",
        colorCode: "",
      });
      setImageShow([]);
      setImages([]);
      setCategory({});
      setSubCategory("");
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    dispatch(get_sub_cat_by_category({ categoryId: category._id }));
  }, [category]);

  useEffect(() => {
    if (type) {
      console.log("Types", type);

      const selectedType = productTypes.find((p) => p._id === type);
      // setOptions(selectedType ? selectedType.options : []);
      setOptions(
        selectedType ? selectedType.options.map((opt) => opt.label) : []
      );
    }
  }, [type, productTypes]);

  const handleSubCategoryClick = (c) => {
    setCateShow(false);
    setSubCateShow(false);
    setSubCategory(c.name);
    setSearchValue("");
    setType(c.productType);

    const matchingProductType = productTypes?.find(
      (p) => p._id === c.productType
    );

    if (matchingProductType) {
      setNewType(matchingProductType.productType);
    }
  };

  // console.log("options", options);

  return (
    <div className="px-2 lg:px-7 pt-5 h-full ">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#545A58] text-2xl uppercase font-semibold">
            Add Product
          </h1>
          <Link
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 "
            to="/seller/dashboard/products"
          >
            Products
          </Link>
        </div>
        <div>
          <form onSubmit={add}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#F7F7F7] ">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Category</label>
                <input
                  readOnly
                  onClick={() => setCateShow(!cateShow)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#F7F7F7] border border-slate-700 rounded-md text-[#545A58]"
                  onChange={inputHandle}
                  value={category.name}
                  type="text"
                  placeholder="--select category--"
                  id="category"
                />
                <div
                  className={`absolute top-[101%] z-20 bg-slate-800 w-full transition-all ${
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
                    <span
                      className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer `}
                      onClick={() => {
                        setCateShow(false);
                        setCategory("");
                        setSearchValue("");
                      }}
                    >
                      select category
                    </span>

                    {categorys.map((c, i) => (
                      <span
                        key={i + "ad"}
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          category.name === c.name && "bg-indigo-500"
                        }`}
                        onClick={() => {
                          setCateShow(false);
                          setCategory(c);
                          // setSearchValue("");
                          // setAllCategory(categorys);
                          dispatch(
                            get_sub_category({
                              searchValue: "",
                              parPage: "",
                              page: "",
                            })
                          );
                        }}
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="subcategory">Sub Category</label>
                <input
                  readOnly
                  onClick={() => setSubCateShow(!SubcateShow)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#F7F7F7] border border-slate-700 rounded-md text-[#545A58]"
                  onChange={inputHandle}
                  value={subcategory}
                  type="text"
                  placeholder="--select sub category--"
                  id="subcategory"
                />
                <div
                  className={`absolute top-[101%] bg-slate-800 w-full transition-all ${
                    SubcateShow ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="w-full px-4 py-2 fixed">
                    <input
                      value={searchValue}
                      onChange={subCategorySearch}
                      className="px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#545A58] overflow-hidden"
                      type="text"
                      placeholder="search"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scroll">
                    {specificSubCategory.map((c, i) => (
                      <span
                        key={i + "SADAs"}
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          subcategory === c.name && "bg-indigo-500"
                        }`}
                        onClick={() => handleSubCategoryClick(c)}
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="type" className="mb-1">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={newtype}
                  className="px-4 py-2 bg-[#F7F7F7] border border-slate-700 rounded-md text-[#545A58]"
                  disabled={true}
                >
                  <option value="">Auto Selecting Type</option>
                  {productTypes.map((p) => (
                    <option key={p._id} value={p.productType}>
                      {p.productType}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#F7F7F7]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Product name</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#F7F7F7] border border-slate-700 rounded-md text-[#545A58]"
                  onChange={inputHandle}
                  value={state.name}
                  type="text"
                  placeholder="product name"
                  name="name"
                  id="name"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">Stock</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#F7F7F7] border border-slate-700 rounded-md text-[#545A58]"
                  onChange={inputHandle}
                  value={state.stock}
                  type="number"
                  min="0"
                  placeholder="product stock"
                  name="stock"
                  id="stock"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Brand</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#F7F7F7] border border-slate-700 rounded-md text-[#545A58]"
                  onChange={inputHandle}
                  value={state.brand}
                  type="text"
                  placeholder="product brand"
                  name="brand"
                  id="brand"
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#F7F7F7]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Price</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#F7F7F7] border border-slate-700 rounded-md text-[#545A58]"
                  onChange={inputHandle}
                  value={state.price}
                  type="number"
                  placeholder="price"
                  name="price"
                  id="price"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="discount">Discount</label>
                <input
                  min="0"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#F7F7F7] border border-slate-700 rounded-md text-[#545A58]"
                  onChange={(e) => {
                    inputHandle(e);
                  }}
                  value={state.discount}
                  type="number"
                  placeholder="%discount%"
                  name="discount"
                  id="discount"
                />
              </div>

              <div className="flex text-white flex-col w-full gap-1 mb-3">
                <label htmlFor="color">Discounted Price</label>
                <input
                  disabled
                  name="discountedPrice"
                  type="text"
                  placeholder="Enter Discount first"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#F7F7F7] border border-slate-700 rounded-md text-[#545A58]"
                  value={state.discountedPrice}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1 text-[#F7F7F7] mb-5">
              <label htmlFor="description">Description</label>
              <textarea
                rows={4}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#F7F7F7] border border-slate-700 rounded-md text-[#545A58]"
                onChange={inputHandle}
                value={state.description}
                placeholder="description"
                name="description"
                id="description"
              ></textarea>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#F7F7F7]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="colorCode">Color code</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#F7F7F7] border border-slate-700 rounded-md text-[#545A58]"
                  onChange={inputHandle}
                  value={state.colorCode}
                  type="text"
                  placeholder="#fffff, #111, #ff1234"
                  name="colorCode"
                  id="colorCode"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="color">Color</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#F7F7F7] border border-slate-700 rounded-md text-[#545A58]"
                  onChange={inputHandle}
                  value={state.color}
                  type="text"
                  placeholder="white, blue, green etc..."
                  name="color"
                  id="color"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {options.map((option, index) => (
                <div key={index} className="flex flex-col text-[#F7F7F7]">
                  <label htmlFor={option}>{option}</label>
                  <input
                    name={option}
                    type="text"
                    placeholder={`Enter ${option}`}
                    className="px-4 py-2 bg-[#F7F7F7] border border-slate-700 rounded-md text-[#545A58]"
                    onChange={inputHandle}
                    value={state[option] || ""}
                  />
                </div>
              ))}
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 h-auto sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#F7F7F7] mb-4">
              {imageShow.map((img, i) => (
                <div className="h-full relative" key={i + "SADAs"}>
                  <label htmlFor={i}>
                    <img
                      className="w-full h-full rounded-sm object-cover"
                      src={img.url}
                      alt=""
                    />
                  </label>
                  <input
                    onChange={(e) => changeImage(e.target.files[0], i)}
                    type="file"
                    id={i}
                    className="hidden"
                  />
                  <span
                    onClick={() => removeImage(i)}
                    className="p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
              ))}
              <label
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-[#545A58]"
                htmlFor="image"
              >
                <span>
                  <BsImages />
                </span>
                <span>select image</span>
              </label>
              <input
                multiple
                onChange={imageHandle}
                className="hidden"
                type="file"
                id="image"
              />
            </div>
            <div className="flex">
              <button
                disabled={loader ? true : false}
                className="bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Add product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

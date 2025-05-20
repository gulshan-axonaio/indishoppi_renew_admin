import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { get_category } from "../../store/Reducers/categoryReducer";
import { get_sub_cat_by_category } from "../../store/Reducers/subCategoryReducer";

import {
  get_product,
  messageClear,
  update_product,
  product_image_update,
} from "../../store/Reducers/productReducer";

import { overrideStyle } from "../../utils/utils";
import axios from "axios";
const EditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [productTypes, setProductTypes] = useState([]);
  const [options, setOptions] = useState([]);
  const [type, setType] = useState("");
  const [newtype, setNewType] = useState("");
  // const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { categorys } = useSelector((state) => state.category);
  const { subCategorys, specificSubCategory } = useSelector(
    (state) => state.subCategory
  );
  const { product, loader, errorMessage, successMessage } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    dispatch(
      get_category({
        searchValue: "",
        parPage: "",
        page: "",
      })
    );
  }, []);

  useEffect(() => {
    if (type && productTypes.length > 0) {
      const selectedType = productTypes.find((p) => p._id === type);
      if (selectedType) {
        setNewType(selectedType.productType);
        setOptions(selectedType.options);

        const dynamicFields = {};
        selectedType.options.forEach((option) => {
          dynamicFields[option.label] = product[option.label] || "";
        });

        setState((prevState) => ({
          ...prevState,
          ...dynamicFields,
        }));
      }
    }
  }, [type, productTypes]);

  const [state, setState] = useState({
    category: "",
    subcategory: "",
    type: "",
    name: "",
    stock: "",
    brand: "",
    price: "",
    discount: "",
    discountedPrice: "",
    description: "",
    color: "",
    colorCode: "",
  });
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

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(get_product(productId));
  }, [productId]);

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
  const [imageShow, setImageShow] = useState([]);

  const changeImage = async (img, files) => {
    let imageUrl;
    if (files.length > 0) {
      const newImageURL = URL.createObjectURL(files[0]);
      const formData = new FormData();
      formData.append("image", files[0]);

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

      setImageShow((prevImages) =>
        prevImages.map((image) => (image === img ? newImageURL : image))
      );

      dispatch(
        product_image_update({
          oldImage: img,
          newImage: imageUrl,
          productId,
        })
      );
    }
  };

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const { data } = await api.get("/product-types", {
          withCredentials: true,
        });

        // console.log("response", data.product);

        setProductTypes(data.product);
      } catch (error) {
        console.error("Error fetching product types", error);
      }
    };

    fetchProductTypes();
  }, []);

  useEffect(() => {
    setState({
      productId: product._id,
      category: product.category,
      subcategory: product.subcategory,
      name: product.name,
      stock: product.stock,
      brand: product.brand,
      price: product.price,
      discount: product.discount,
      discountedPrice: product.discountedPrice,
      description: product.description,
      color: product.color,
      colorCode: product.colorCode,
    });
    setCategory(product.category);
    setSubCategory(product.subcategory);
    setType(product.type);
    setImageShow(product.images);

    console.log("type", type);

    const matchingProductType = productTypes?.find((p) => p._id === type);

    if (matchingProductType) {
      setNewType(matchingProductType.productType);
    }
  }, [product]);
  useEffect(() => {
    if (categorys.length > 0) {
      setAllCategory(categorys);
    }
  }, [categorys]);

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

  const update = (e) => {
    e.preventDefault();

    const selectedSubCategoryObj = specificSubCategory.find(
      (s) => s._id === subcategory
    );
    const selectedTypeObj = productTypes.find((p) => p._id === type);

    const dynamicFields = {};
    options.forEach((option) => {
      dynamicFields[option] = state[option] || "";
    });
    const obj = {
      productId: productId,
      category: category,
      subcategory: selectedSubCategoryObj?._id || null,
      type: selectedTypeObj?._id || null,
      name: state.name,
      stock: state.stock,
      brand: state.brand,
      price: state.price,
      discount: state.discount,
      discountedPrice: state.discountedPrice,
      description: state.description,
      color: state.color,
      colorCode: state.colorCode,
      ...dynamicFields,
    };
    console.log("update_product==>", obj);
    dispatch(update_product(obj));
  };

  useEffect(() => {
    if (product && product.images) {
      setImageShow(product.images);
    }
  }, [product]);

  useEffect(() => {
    if (type) {
      const selectedType = productTypes.find((p) => p._id === type);
      // setOptions(selectedType ? selectedType.options : []);
      setOptions(
        selectedType ? selectedType.options.map((opt) => opt.label) : []
      );
    }
  }, [type, productTypes]);

  useEffect(() => {
    dispatch(get_sub_cat_by_category({ categoryId: category }));
  }, [category]);

  const handleSubCategoryClick = (c) => {
    // console.log("cvalue", c);

    // setCateShow(false);
    // setSubCateShow(false);
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

  console.log("newtype", newtype);
  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <div className="flex justify-between items-center pb-2">
          <h1 className="text-[#d0d2d6] lg:text-3xl text-xl font-semibold">
            Edit Product
          </h1>
          <Link
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 "
            to="/seller/dashboard/products"
          >
            Products
          </Link>
        </div>
        <div className="flex items-end justify-end">
          <Link
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 "
            to={`/seller/dashboard/display-variants/${productId}`}
          >
            See Variants
          </Link>
        </div>
        <div>
          <form onSubmit={update}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Category</label>
                <select
                  required
                  id="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    dispatch(get_sub_cat_by_category(e.target.value));
                  }}
                  className="px-4 py-2 bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                >
                  <option value="">--select category--</option>
                  {categorys.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Sub category</label>
                <select
                  required
                  id="subcategory"
                  value={subcategory}
                  onChange={(e) => {
                    const selected = specificSubCategory.find(
                      (sc) => sc._id === e.target.value
                    );
                    if (selected) {
                      handleSubCategoryClick(selected);
                    }
                    setSubCategory(e.target.value);
                  }}
                  className="px-4 py-2 bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                >
                  <option value="">--select subcategory--</option>
                  {specificSubCategory.map((c) => (
                    <option
                      key={c._id}
                      value={c._id}
                      onClick={() => handleSubCategoryClick(c)}
                    >
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="type">Product Type</label>
                <select
                  required
                  id="type"
                  name="type"
                  value={newtype}
                  onChange={(e) => setType(e.target.value)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                >
                  {productTypes.map((p) => (
                    <option key={p._id} value={p.productType}>
                      {p.productType}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Product name</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
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
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
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
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.brand}
                  type="text"
                  placeholder="Brand Name"
                  name="brand"
                  id="brand"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Price</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
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
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.discount}
                  type="number"
                  placeholder="%discount%"
                  name="discount"
                  id="discount"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="discount">Discount Price</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.discountedPrice}
                  type="number"
                  placeholder="%discountedPrice%"
                  name="discountedPrice"
                  id="discountedPrice"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="colorCode">Color code</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.colorCode}
                  type="text"
                  placeholder=""
                  name="colorCode"
                  id="colorCode"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="color">Color</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.color}
                  type="text"
                  placeholder=""
                  name="color"
                  id="color"
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="description">Description</label>
              <textarea
                rows={8}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.description}
                placeholder="description"
                name="description"
                id="description"
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="flex flex-col mb-3 w-full text-[#F7F7F7]"
                >
                  <label htmlFor={option}>{option}</label>
                  <input
                    required
                    name={option}
                    type="text"
                    placeholder={`Enter ${option}`}
                    className="px-4 py-2 bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    onChange={inputHandle}
                    value={state[option] || ""}
                  />
                </div>
              ))}
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
              {imageShow &&
                imageShow.length > 0 &&
                imageShow.map((img, i) => (
                  <div>
                    <label className="h-[180px]" htmlFor={i}>
                      <img className="h-full" src={img} alt="" />
                    </label>
                    <input
                      onChange={(e) => changeImage(img, e.target.files)}
                      type="file"
                      id={i}
                      className="hidden"
                    />
                  </div>
                ))}
            </div>
            <div className="flex">
              <button
                disabled={loader ? true : false}
                className="bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Update product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

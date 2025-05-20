import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import api from "../../api/api";
import * as Yup from "yup";
import { get_category } from "../../store/Reducers/categoryReducer";
import { get_sub_cat_by_category } from "../../store/Reducers/subCategoryReducer";
import {
  get_product,
  messageClear,
  update_product,
  product_image_update,
  add_product_variant,
} from "../../store/Reducers/productReducer";
import { BsImages } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { overrideStyle } from "../../utils/utils";
import axios from "axios";
const AddVariant = () => {
  const { productId } = useParams();
  // const [productTypes, setProductTypes] = useState([]);
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [options, setOptions] = useState([]);
  const [type, setType] = useState("");
  const [newtype, setNewType] = useState("");
  const [productDetail, setProductDetail] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const { categorys } = useSelector((state) => state.category);
  const { subCategorys, specificSubCategory } = useSelector(
    (state) => state.subCategory
  );

  const { userInfo } = useSelector((state) => state?.auth);

  const { product, loader, errorMessage, successMessage } = useSelector(
    (state) => state.product
  );

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
    shopName: userInfo?.businessName,
  });

  // console.log("shopname", state.shopName);

  useEffect(() => {
    dispatch(get_product(productId));
  }, [productId]);

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
    const fetchProductById = async (productId) => {
      try {
        const { data } = await api.post(
          "/fetch_product_byId",
          { productId },
          {
            withCredentials: true,
          }
        );
        setProductDetail(data.product);
      } catch (error) {
        console.error("Error fetching product types", error);
      }
    };

    fetchProductById(productId);
  }, []);

  useEffect(() => {
    setState({
      productId: product._id,
      category: product.category,
      subcategory: product.subcategory,
      name: product.name,
      brand: product.brand,
      description: product.description,
      shopName: state.shopName,
    });
    setCategory(product.category);
    setSubCategory(product.subcategory);
    setType(product.type);

    const matchingProductType = productTypes?.find((p) => p._id === type);

    if (matchingProductType) {
      setNewType(matchingProductType.productType);
    }
  }, [product]);

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

  useEffect(() => {
    if (type && productTypes.length > 0) {
      const selectedType = productTypes.find((p) => p._id === type);
      if (selectedType) {
        setNewType(selectedType.productType);
        setOptions(
          selectedType ? selectedType.options.map((opt) => opt.label) : []
        );

        const dynamicFields = {};
        selectedType.options.forEach((option) => {
          dynamicFields[option] = product[option] || "";
        });

        setState((prevState) => ({
          ...prevState,
          ...dynamicFields,
        }));
      }
    }
  }, [type, productTypes]);

  const AddVariant = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    const imageUrls = await uploadImagesToS3(images);
    // const imageUrls = "hello";
    if (imageUrls.length === 0) {
      toast.error("Image upload failed. Try again.");
      return;
    }

    // console.log("imageUrls", imageUrls);

    const selectedSubCategoryObj = specificSubCategory.find(
      (s) => s._id === subcategory
    );
    const selectedTypeObj = productTypes.find((p) => p._id === type);

    const dynamicFields = {};
    options.forEach((option) => {
      dynamicFields[option] = state[option] || "";
    });

    const varientData = {
      productId: productId,
      type: selectedTypeObj?._id || null,
      category: category,
      subcategory: selectedSubCategoryObj?._id || null,
      shopName: state.shopName,
      name: state.name,
      stock: state.stock,
      brand: state.brand,
      price: state.price,
      discount: state.discount,
      discountedPrice: state.discountedPrice,
      color: state.color,
      colorName: state.colorCode,
      description: state.description,
      imageUrls,
      ...dynamicFields,
    };

    // console.log("varientData==>", varientData);

    dispatch(add_product_variant({ varientData, productId }));
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

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
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
      setImageShow([]);
      setImages([]);
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    if (type) {
      const selectedType = productTypes.find((p) => p._id === type);
      setOptions(
        selectedType ? selectedType.options.map((opt) => opt.label) : []
      );
    }
  }, [type, productTypes]);

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
    dispatch(
      get_category({
        searchValue: "",
        parPage: "",
        page: "",
      })
    );
  }, []);

  useEffect(() => {
    dispatch(get_sub_cat_by_category({ categoryId: category }));
  }, [category]);

  const handleSubCategoryClick = (c) => {
    console.log("cvalue", c);

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

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4 text-white  bg-[#283046] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] lg:text-3xl text-xl  font-semibold">
            Add Variation
          </h1>
          <Link
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 "
            to="/seller/dashboard/products"
          >
            Products
          </Link>
        </div>
        <div>
          <form onSubmit={AddVariant}>
            {/* Type Selection */}

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
            <div className="flex gap-0 lg:gap-4 lg:flex-row flex-col">
              <div className="flex flex-col w-full gap-1 mb-3">
                <label htmlFor="type">Product Name</label>
                <input
                  disabled
                  id="name"
                  name="name"
                  type="text"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  value={state.name}
                />
              </div>
              <div className="flex flex-col w-full gap-1 mb-3">
                <label htmlFor="stock">Stock</label>
                <input
                  required
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="Enter stock"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.stock}
                />
              </div>
              <div className="flex flex-col w-full gap-1 mb-3">
                <label htmlFor="brand">Brand</label>
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  placeholder="Enter Brand"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.brand}
                />
              </div>
            </div>
            {/* Price */}
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Price</label>
                <input
                  required
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
                  min="0"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
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
                <label htmlFor="discountedPrice">Discounted Price</label>
                <input
                  disabled
                  name="discountedPrice"
                  type="number"
                  placeholder="Enter Discount first"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  value={state.discountedPrice}
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

            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 h-auto sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
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
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-[#d0d2d6]"
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

            <button
              type="submit"
              //   disabled={loader ? true : false}
              className="bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
            >
              {loader ? (
                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
              ) : (
                "  Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVariant;

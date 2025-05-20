import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { get_product } from "../../store/Reducers/productReducer";

function ProductDetails() {
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { productId } = useParams();
  useEffect(() => {
    dispatch(get_product(productId));
  }, [productId, productId?.length]);
  return (
    <div>
      <div className="px-2 lg:px-7 pt-5">
        <div className="w-full p-4  bg-[#283046] rounded-md">
          <div className="w-full flex lg:flex-row flex-col flex-wrap text-[#d0d2d6]">
            <div className="w-full lg:w-3/12 flex justify-center items-center py-3">
              <div>
                {product?.images ? (
                  <img
                    className="w-full h-full rounded-lg object-cover"
                    src={product.images[0]}
                    alt=""
                  />
                ) : (
                  <span>Image not uploaded</span>
                )}
              </div>
            </div>
            <div className="w-full lg:w-8/12">
              <div className="px-0 md:px-5 py-2 ">
                <div className="py-2 text-2xl">
                  <h2 className="text-xl lg:text-3xl font-semibold">
                    Product Details
                  </h2>
                </div>
                <div className="flex w-full gap-8 lg:flex-row flex-col">
                  <div className="flex justify-center w-full h-fit mt-8  text-lg flex-col gap-8 p-8 bg-slate-800 rounded-md">
                    <div className="flex gap-2">
                      <span className="font-semibold">Brand Name: </span>
                      <span>{product?.brand}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-semibold">Product Category: </span>
                      <span>{product?.category}</span>
                    </div>

                    <div className="flex gap-2">
                      <span className="font-semibold">Discount : </span>
                      <span>{product?.discount}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-semibold">Product name: </span>
                      <span>{product?.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-semibold">Product Stock: </span>
                      <span>{product?.stock}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-semibold">Shop Name: </span>
                      <span>{product?.shopName}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md w-full">
                    <div className="flex flex-col w-full gap-2 p-2">
                      <span className="text-xl">Description : </span>
                      <span className="">{product?.description}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

import React, { useState, useEffect } from "react";
// import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import Search from "../components/Search";
import { useSelector, useDispatch } from "react-redux";
import {
  get_seller_orders,
  push_order_to_shiprocket,
  get_seller_all_pickup_location,
} from "../../store/Reducers/OrderReducer";
import Swal from "sweetalert2";

const Orders = () => {
  const dispatch = useDispatch();
  const { totalOrder, myOrders, sellerAllPL } = useSelector(
    (state) => state.order
  );
  // const { userInfo } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  useEffect(() => {
    dispatch(
      get_seller_orders({
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue,
      })
    );
  }, [dispatch, parPage, currentPage, searchValue]);

  useEffect(() => {
    dispatch(get_seller_all_pickup_location());
  }, [dispatch]);

  // console.log("myOrders", myOrders);
  console.log("sellerAllPL", sellerAllPL);

  // const handleShipNow = async (orderId) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "Do you want to ship this order?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, Ship it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         const response = await dispatch(
  //           push_order_to_shiprocket({ orderId })
  //         );

  //         console.log("Shiprocket Order Response:", response.payload.srOrder);

  //         Swal.fire(
  //           "Shipped!",
  //           "The order has been shipped successfully.",
  //           "success"
  //         );
  //       } catch (error) {
  //         // On failure
  //         Swal.fire(
  //           "Error!",
  //           "There was a problem shipping the order.",
  //           "error"
  //         );
  //       }
  //     }
  //   });
  // };

  const handleShipNow = async (orderId) => {
    const pickupOptions = (sellerAllPL?.shipping_address || [])
      .map((address, index) => {
        return `<option value="${index}">
       ${address.city} - ${address.pickup_location} - ${address.rto_address_id}
      </option>`;
      })
      .join("");

    const { value: selectedIndex } = await Swal.fire({
      title: "Select Pickup Location",
      html: `
      <select id="pickupSelect" class="swal2-input">
        <option value="" disabled selected>Select pickup location</option>
        ${pickupOptions}
      </select>
    `,
      focusConfirm: false,
      preConfirm: () => {
        const selected = document.getElementById("pickupSelect").value;
        if (!selected) {
          Swal.showValidationMessage("Please select a pickup location");
        }
        return selected;
      },
      showCancelButton: true,
      confirmButtonText: "Ship Now",
      cancelButtonText: "Cancel",
    });

    if (selectedIndex !== undefined) {
      const pickupData = sellerAllPL.shipping_address[selectedIndex];

      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to ship this order?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Ship it!",
      });

      if (confirmResult.isConfirmed) {
        try {
          const response = await dispatch(
            push_order_to_shiprocket({ orderId, pickupData })
          );

          if (response.payload.status === 200) {
            Swal.fire("Shipped!", response.payload.message, "success");
          } else {
            Swal.fire("Error!", response.payload.message, "error");
          }

          console.log(
            "Shiprocket Order Response:",
            response.payload.shiprocketOrderResponse
          );
        } catch (error) {
          Swal.fire(
            "Error!",
            "There was a problem shipping the order.",
            "error"
          );
        }
      }
    }
  };

  // test

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Date
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {(myOrders || []).map((d, i) => (
                <tr key={i}>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <Link
                      to={`/seller/dashboard/order/details/${d._id}`}
                      className="text-blue-500"
                      title="Order Details"
                    >
                      <span>#{d._id}</span>
                    </Link>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    ₹{d.price}
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>
                      {d.payment_status.charAt(0).toUpperCase() +
                        d.payment_status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>
                      {d.order_status.charAt(0).toUpperCase() +
                        d.order_status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    {d.createdAt}
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <button
                      onClick={() => handleShipNow(d._id)}
                      className={`px-4 py-2 text-white rounded ${
                        d.isShiped === "pending"
                          ? "bg-blue-500"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      disabled={d.isShiped !== "pending"}
                    >
                      Ship Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalOrder <= parPage ? (
          ""
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrder}
              parPage={parPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

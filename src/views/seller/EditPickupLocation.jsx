import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  messageClear,
  get_pickup_location,
} from "../../store/Reducers/productReducer";

import { pickup_location_update } from "../../store/Reducers/authReducer";
import { Link, useParams } from "react-router-dom";

const EditPickupLocation = () => {
  const { locationId } = useParams();
  const dispatch = useDispatch();
  const { successMessage } = useSelector((state) => state.auth);
  const { pickup_locaton } = useSelector((state) => state.product);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      messageClear();
    }
  }, [successMessage]);
  const [state, setState] = useState({
    pickup_loc_id: "",
    pickup_location: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    address_2: "",
    city: "",
    state: "",
    country: "",
    pin_code: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const updatePickupLocation = (e) => {
    e.preventDefault();

    console.log("state", state);

    dispatch(pickup_location_update(state));
  };

  useEffect(() => {
    setState({
      pickup_loc_id: pickup_locaton._id,
      pickup_location: pickup_locaton.pickup_location,
      name: pickup_locaton.name,
      email: pickup_locaton.email,
      phone: pickup_locaton.phone,
      address: pickup_locaton.address,
      address_2: pickup_locaton.address_2,
      city: pickup_locaton.city,
      state: pickup_locaton.state,
      country: pickup_locaton.country,
      pin_code: pickup_locaton.pin_code,
    });
  }, [pickup_locaton]);

  useEffect(() => {
    dispatch(get_pickup_location(locationId));
  }, [locationId]);

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-12/12">
          <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0">
            <div className="bg-[#283046] rounded-md text-[#d0d2d6] p-4">
              <div className="flex justify-between items-center pb-4">
                <h1 className="text-[#d0d2d6] text-2xl uppercase font-semibold">
                  Edit Pickup Location
                </h1>
                <Link
                  className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 "
                  to="/seller/dashboard/get-pickup-location"
                >
                  Go back
                </Link>
              </div>
              <form onSubmit={updatePickupLocation}>
                <div className="flex gap-4 mb-3">
                  <div className="flex-1">
                    <label htmlFor="name">NAME</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="Name"
                      name="name"
                      id="name"
                      value={state.name}
                      onChange={inputHandle}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="email">EMAIL</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="email"
                      placeholder="Email"
                      name="email"
                      id="email"
                      value={state.email}
                      onChange={inputHandle}
                    />
                  </div>
                </div>

                <div className="flex gap-4 mb-3">
                  <div className="flex-1">
                    <label htmlFor="phone">PHONE</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      id="phone"
                      value={state.phone}
                      onChange={inputHandle}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="pickup_location">PICKUP LOCATION</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="Pickup Location"
                      name="pickup_location"
                      id="pickup_location"
                      value={state.pickup_location}
                      onChange={inputHandle}
                    />
                  </div>
                </div>

                <div className="flex gap-4 mb-3">
                  <div className="flex-1">
                    <label htmlFor="city">CITY</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="City"
                      name="city"
                      id="city"
                      value={state.city}
                      onChange={inputHandle}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="state">STATE</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="State"
                      name="state"
                      id="state"
                      value={state.state}
                      onChange={inputHandle}
                    />
                  </div>
                </div>

                <div className="flex gap-4 mb-3">
                  <div className="flex-1">
                    <label htmlFor="country">COUNTRY</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="Country"
                      name="country"
                      id="country"
                      value={state.country}
                      onChange={inputHandle}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="pin_code">PIN CODE</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="Pin Code"
                      name="pin_code"
                      id="pin_code"
                      value={state.pin_code}
                      onChange={inputHandle}
                    />
                  </div>
                </div>

                <div className="fle gap-4 mb-3">
                  <div className="flex-1">
                    <label htmlFor="address">ADDRESS</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="Address"
                      name="address"
                      id="address"
                      value={state.address}
                      onChange={inputHandle}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="address_2">ADDRESS 2</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="Address 2"
                      name="address_2"
                      id="address_2"
                      value={state.address_2}
                      onChange={inputHandle}
                    />
                  </div>
                </div>

                <button className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 mt-5">
                  Update Pickup Location
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPickupLocation;

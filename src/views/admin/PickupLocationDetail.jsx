import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  messageClear,
  get_pickup_location,
} from "../../store/Reducers/productReducer";
import { Link, useParams } from "react-router-dom";

const PickupLocationDetail = () => {
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

      company_id: pickup_locaton.company_id,
      pickup_id: pickup_locaton.pickup_id,
      pickup_code: pickup_locaton.pickup_code,
      address_type: pickup_locaton.address_type,
      gstin: pickup_locaton.gstin,
      alternate_phone: pickup_locaton.alternate_phone,
      lat: pickup_locaton.lat,
      long: pickup_locaton.long,
      rto_address_id: pickup_locaton.rto_address_id,
      createdAt: pickup_locaton.createdAt,
      status: pickup_locaton.status,
    });
  }, [pickup_locaton]);

  // const path = window.location.pathname;
  // const firstSegment = path.split("/")[1];
  console.log("First_Segment:", "rfrf");

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
                  Pickup Location Detail
                </h1>
                <Link
                  className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 "
                  to="/admin/dashboard/pickup-location/new"
                >
                  Go back
                </Link>
              </div>
              <form>
                <div className="flex flex-wrap gap-4 mb-3 ">
                  <div className="w-full">
                    <input
                      className={`px-4 py-2 outline-none w-full rounded-md text-center text-[#d0d2d6] mx-auto ${
                        state.status == 0
                          ? "bg-blue-500 border-blue-600"
                          : state.status == 1
                          ? "bg-green-500 border-yellow-600"
                          : state.status == 2
                          ? "bg-red-500 border-green-600"
                          : "bg-gray-500 border-gray-600"
                      }`}
                      type="text"
                      name="long"
                      disabled
                      value={
                        state.status === 0
                          ? "We're still waiting for your pickup location to be confirmed."
                          : state.status === 1
                          ? "Great! Your pickup location is active and ready."
                          : state.status === 2
                          ? "Oops! This request has been rejected"
                          : "UNKNOWN"
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-3">
                  <div className="md:w-4/12">
                    <label htmlFor="name">NAME</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="Name"
                      name="name"
                      disabled
                      value={state.name}
                    />
                  </div>
                  <div className="md:w-3/12">
                    <label htmlFor="email">EMAIL</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="email"
                      placeholder="Email"
                      name="email"
                      disabled
                      value={state.email}
                    />
                  </div>
                  <div className="md:w-4/12">
                    <label htmlFor="phone">PHONE</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      disabled
                      value={state.phone}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-3">
                  <div className="md:w-4/12">
                    <label htmlFor="pickup_location">PICKUP LOCATION</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="Pickup Location"
                      name="pickup_location"
                      disabled
                      value={state.pickup_location}
                    />
                  </div>
                  <div className="md:w-3/12">
                    <label htmlFor="city">CITY</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="City"
                      name="city"
                      disabled
                      value={state.city}
                    />
                  </div>
                  <div className="md:w-4/12">
                    <label htmlFor="state">STATE</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="State"
                      name="state"
                      disabled
                      value={state.state}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-3">
                  <div className="md:w-4/12">
                    <label htmlFor="country">COUNTRY</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="Country"
                      name="country"
                      disabled
                      value={state.country}
                    />
                  </div>
                  <div className="md:w-3/12">
                    <label htmlFor="pin_code">PIN CODE</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="Pin Code"
                      name="pin_code"
                      disabled
                      value={state.pin_code}
                    />
                  </div>
                  <div className="md:w-4/12">
                    <label htmlFor="company_id">COMPANY ID</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="COMPANY ID"
                      name="company_id"
                      disabled
                      value={state.company_id}
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
                      disabled
                      value={state.address}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="address_2">ADDRESS 2</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="Address 2"
                      name="address_2"
                      disabled
                      value={state.address_2}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-3">
                  <div className="md:w-4/12">
                    <label htmlFor="pickup_id">PICKUP ID</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="PICKUP ID"
                      name="pickup_id"
                      disabled
                      value={state.pickup_id}
                    />
                  </div>
                  <div className="md:w-3/12">
                    <label htmlFor="pickup_code">PICKUP CODE</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="PICKUP CODE"
                      name="pickup_code"
                      disabled
                      value={state.pickup_code}
                    />
                  </div>
                  <div className="md:w-4/12">
                    <label htmlFor="address_type">ADDRESS TYPE</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="ADDRESS TYPE"
                      name="address_type"
                      disabled
                      value={state.address_type}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-3">
                  <div className="md:w-4/12">
                    <label htmlFor="gstin">GSTIN</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="GSTIN"
                      name="gstin"
                      disabled
                      value={state.gstin}
                    />
                  </div>
                  <div className="md:w-3/12">
                    <label htmlFor="alternate_phone">ALTERNATE PHONE</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="ALTERNATE PHONE"
                      name="alternate_phone"
                      disabled
                      value={state.alternate_phone}
                    />
                  </div>
                  <div className="md:w-4/12">
                    <label htmlFor="lat">LATITUDE</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="LAT"
                      name="lat"
                      disabled
                      value={state.lat}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-3">
                  <div className="md:w-4/12">
                    <label htmlFor="long">LONGITUDE</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="LONGITUDE"
                      name="long"
                      disabled
                      value={state.long}
                    />
                  </div>
                  <div className="md:w-3/12">
                    <label htmlFor="rto_address_id">RTO ADDRESS ID</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      placeholder="RTO ADDRESS ID"
                      name="rto_address_id"
                      disabled
                      value={state.rto_address_id}
                    />
                  </div>
                  <div className="md:w-4/12">
                    <label htmlFor="createdAt">CREATED DATE</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      type="text"
                      name="createdAt"
                      disabled
                      value={state.createdAt}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupLocationDetail;

import React from "react";
import { Audio, Hourglass } from "react-loader-spinner";

const Pending = () => {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="-mt-20">
        <div className="mb-3 flex items-center justify-center">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
        </div>
        <div className=" p-5">
          <div className="text-slate-400 flex items-center justify-center flex-col text-lg lg:text-xl">
            <span className="mb-2 text-center font-bold">
              {" "}
              your account is pending for approval from the admin side.
            </span>
            <span className="text-sm">
              Kindly wait for some time and try again.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pending;

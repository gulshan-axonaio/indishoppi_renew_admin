import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsImages } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../../../utils/utils";
import axios from "axios";
import api from "../../../../api/api";
import toast from "react-hot-toast";
import {
  messageClear,
  seller_kyc_file_upload,
} from "../../../../store/Reducers/authReducer";

function DocumentsUpload({ files, setFiles }) {
  const navigate = useNavigate();
  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles([...files, ...selectedFiles]);
  };

  return (
    <div className=" w-full rounded-xl  bg-[#283046] flex flex-col p-5 gap-10 justify-center items-center border-2 border-white border-solid">
      <div className="border-2 border-white border-dotted  h-3/6 flex flex-col justify-center items-center">
        <h2 className="text-white font-semibold text-xl mb-10 text-left">
          Adhaar upload
        </h2>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div className="border-2 border-white border-dotted h-3/6 flex flex-col justify-center items-center">
        <h2 className="text-white font-semibold text-xl mb-10 text-left">
          PAN Upload
        </h2>
        <input type="file" onChange={handleFileChange} />
      </div>

      <div className="border-2 border-white border-dotted h-3/6 flex flex-col justify-center items-center">
        <h2 className="text-white font-semibold text-xl mb-10 text-left">
          GST Upload
        </h2>
        <input type="file" onChange={handleFileChange} />
      </div>
      {/* <div>
        <button
          onClick={handleUpload}
          className="bg-purple-500 text-white rounded-md p-4"
        >
          Upload Files
        </button>
      </div> */}
    </div>
  );
}
export default DocumentsUpload;

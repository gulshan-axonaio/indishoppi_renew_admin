import React, { useEffect, useState } from "react";
import { useMultiStepForm } from "./Hook/useMultiStepForm";
import Register from "../FormComponents/Register";
import Onboarding from "../FormComponents/Onboarding";
import DocumentsUpload from "../FormComponents/DocumentsUpload";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  messageClear,
  seller_register,
} from "../../../../store/Reducers/authReducer";
import api from "../../../../api/api";

// ********** <This is Main Form Element/>  Read the Hook Page for more info******************
const MultiStepForm = () => {
  const [state, setSatate] = useState({
    name: "",
    email: "",
    password: "",
  });
  const location = useLocation();
  const [state2, setState] = useState({
    businessName: "",
    businessSubcategory: "",
    panNo: "",
    businessCategory: "",
    adhaarNo: "",
    businessAddress: "",
    businessPincode: "",
    gstNo: "",
  });
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );
  const SUBMIT = (e) => {
    e.preventDefault();
    if (isLastStep) {
      try {
        // email,
        // name,
        // password,
        // businessName,
        // pan,
        // subCategory,
        // category,
        // adhaar,
        // businessAddress,
        // pincode,
        // gst,
        const formData = new FormData();
        formData.append("email", state?.email);
        formData.append("name", state.name);
        formData.append("password", state.password);
        formData.append("businessName", state2.businessName);
        formData.append("subCategory", state2.businessSubcategory);
        formData.append("category", state2.businessCategory);
        formData.append("pan", state2.panNo);
        formData.append("adhaar", state2.adhaarNo);
        formData.append("businessAddress", state2.businessAddress);
        formData.append("pincode", state2.businessPincode);
        formData.append("gst", state2.gstNo);

        console.log(formData, "formData..");
        for (let i = 0; i < files.length; i++) {
          formData.append(`file${i + 1}`, files[i]);
        }

        dispatch(seller_register(formData));
        console.log(formData, "formData..");
        // for (let [key, value] of formData.entries()) {
        //   console.log(`${key}: ${value}`);
        // }
      } catch (error) {
        console.error("Error uploading files:", error.message);
      }
    } else {
      next();
    }
  };

  useEffect(() => {
    if (successMessage && location.pathname.includes("/admin/addseller")) {
      toast.success(successMessage);
      dispatch(messageClear());
      console.log("logged in ");
      navigate("/login");
    } else if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      console.log("logged in second ");
      navigate("/login");
    }
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [successMessage, errorMessage]);

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    // **************** Import form pages here inside the array ... *************

    useMultiStepForm([
      <Register state={state} setSatate={setSatate} location={location} />,
      <Onboarding state={state2} setState={setState} />,
      <DocumentsUpload files={files} setFiles={setFiles} location={location} />,
    ]);

  return (
    <div className="relative bg-[#161d31] border flex items-center justify-center w-full border-black   rounded-lg min-h-[100vh] m-0 p-0">
      {/* On submit of form it will check for validations then  saves the state then increment the page */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex  items-center justify-center flex-col"
      >
        <div className="absolute top-2 right-2 text-white font-semibold text-lg">
          {currentStepIndex + 1}/{steps.length}
        </div>
        <div className="lg:w-[35vw] w-screen h-auto">{step}</div>
        <div
          className={`flex ${
            !isFirstStep ? " justify-end " : " justify-between "
          } w-full mt-2 items-center `}
        >
          {isFirstStep && (
            <button
              type="button"
              className="px-8 py-3  w-32 text-sm font-semibold  cursor-pointer text-white bg-slate-800 text-center rounded-md  "
              onClick={() => back(currentStepIndex)}
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={SUBMIT}
            className="px-8 py-3   w-32 text-sm font-semibold cursor-pointer text-white bg-slate-800 text-center rounded-md"
          >
            {isLastStep ? "Finsh" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;

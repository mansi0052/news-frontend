import React from "react";
import toast from "react-hot-toast";

toast.success("Summary saved!");
toast.error("Something went wrong");


const Spinner = () => <div className="spinner">Loading...</div>;

export default Spinner;

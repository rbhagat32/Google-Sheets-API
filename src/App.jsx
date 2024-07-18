import React from "react";
import Form from "./components/Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen grid place-items-center bg-zinc-900 text-white">
        <Form />
      </div>
    </>
  );
}

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export default function Form() {
  const { register, handleSubmit, reset } = useForm();

  const sendData = (data) => {
    axios
      .post("/api", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success("Form submitted successfully!");
        reset();
      })
      .catch((error) => {
        toast.error("Some error occurred while submitting the form!");
        console.log("Error message:", error.message);
        if (error.response) {
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
          console.log("Response headers:", error.response.headers);
        }
      });
  };

  return (
    <form
      onSubmit={handleSubmit(sendData)}
      className="flex flex-col gap-4 w-96"
    >
      <input
        {...register("Name")}
        type="text"
        placeholder="Name:"
        className="outline-none px-4 py-2 rounded-lg border border-white bg-zinc-800 placeholder:text-white"
      />
      <input
        {...register("Email")}
        type="email"
        placeholder="Email:"
        className="outline-none px-4 py-2 rounded-lg border border-white bg-zinc-800 placeholder:text-white"
      />
      <input
        {...register("Message")}
        type="text"
        placeholder="Message:"
        className="outline-none px-4 py-2 rounded-lg border border-white bg-zinc-800 placeholder:text-white"
      />
      <input
        type="submit"
        value="Submit"
        className="px-4 py-3 bg-rose-500 rounded-lg font-semibold cursor-pointer"
      />
    </form>
  );
}

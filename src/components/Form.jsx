import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export default function Form() {
  const { register, handleSubmit, reset } = useForm();

  const sendData = (data) => {
    axios
      .post(
        "https://sheet.best/api/sheets/2418f65d-582f-4ddd-811a-26f5099df372",
        data
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Form submitted successfully");
          reset();
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(sendData)}
      className="flex flex-col gap-4 w-96"
    >
      <input
        {...register("name")}
        type="text"
        placeholder="name"
        className="outline-none px-4 py-2 rounded-lg border border-white bg-zinc-800 placeholder:text-white"
      />
      <input
        {...register("email")}
        type="email"
        placeholder="email"
        className="outline-none px-4 py-2 rounded-lg border border-white bg-zinc-800 placeholder:text-white"
      />
      <input
        {...register("message")}
        type="text"
        placeholder="message"
        className="outline-none px-4 py-2 rounded-lg border border-white bg-zinc-800 placeholder:text-white"
      />
      <input
        type="submit"
        value="Submit"
        className="px-4 py-3 bg-rose-500 rounded-lg cursor-pointer"
      />
    </form>
  );
}

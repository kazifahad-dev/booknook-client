"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordInput({ name = "password", placeholder }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        name={name}
        type={show ? "text" : "password"}
        required
        placeholder={placeholder}
        className="input input-bordered w-full pr-12"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-lg opacity-70 hover:opacity-100"
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}
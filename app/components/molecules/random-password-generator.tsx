"use client";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { IoCopyOutline } from "react-icons/io5";
import TextFields from "../atoms/text-fields";

const RandomPasswordGenerator = () => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const passwordLength = 16;
  const number = "0123456789";
  const symbol = "@#$%^()_~+{}[]<>/-=";
  const allChars = upperCase + lowerCase + number + symbol;

  function createPassword() {
    let password = "";
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += number[Math.floor(Math.random() * number.length)];
    password += symbol[Math.floor(Math.random() * symbol.length)];

    while (passwordLength > password.length) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    setInputValue(password);
  }

  function copyPassword() {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      toast.success("Password copied successfully");
      setInputValue("");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen flex-col space-y-6 ">
      <div className="border border-gray-200 space-y-5  px-5 py-10 h-full bg-gray-200">
        <TextFields />
        <div className="flex flex-col items-start space-y-3 ">
          <div className="relative ">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border px-5 py-2 outline-none w-96 placeholder:text-sm"
              placeholder="Password"
            />
            <IoCopyOutline
              onClick={() => copyPassword()}
              title="copy password"
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
            />
          </div>
          <button
            className=" px-6 py-2 bg-slate-800 text-white  "
            onClick={() => createPassword()}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomPasswordGenerator;

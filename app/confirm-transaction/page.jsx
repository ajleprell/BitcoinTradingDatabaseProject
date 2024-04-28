"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const ConfirmTransaction = () => {
  const router = useRouter();

  // const amountOfBitcoin

  return (
    <div className="flex flex-col justify-around items-center w-screen h-screen p-4">
      <div className="flex flex-row justify-around w-full bg-red-500">
        <h1 className="text-4xl font-bold">Create Client Account</h1>
        <h1 className="text-4xl font-bold">
          {new Date().toLocaleDateString()}
        </h1>
      </div>
      <div className="flex flex-row justify-around w-full bg-red-500">
        <h1 className="text-4xl font-bold">Create Client Account</h1>
        <h1 className="text-4xl font-bold">
          {new Date().toLocaleDateString()}
        </h1>
      </div>
    </div>
  );
};

export default ConfirmTransaction;

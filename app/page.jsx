"use client";

import React from "react";
import Button from "./_components/button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateAccountType } from "./_slices/account-slice";

const LandingPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSelect = (accountType) => {
    dispatch(updateAccountType(accountType));
    
    router.push("/sign-in");
  };

  return (
    <div className="flex flex-col justify-around items-center w-screen h-screen p-4">
      <h1 className="text-8xl font-bold">Bitcoin Trading Project</h1>
      <div className="flex flex-row gap-x-16">
        <Button onClick={() => handleSelect("Client")} className="px-16">
          Client
        </Button>
        <Button onClick={() => handleSelect("Trader")} className="px-16">
          Trader
        </Button>
        <Button onClick={() => handleSelect("Manager")} className="px-16">
          Manager
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;

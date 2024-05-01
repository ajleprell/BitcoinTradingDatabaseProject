"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addCommas from "../_reusable-functions/add-commas";
import Input from "../_components/input";
import Button from "../_components/button";
import { ToastContainer, toast } from "react-toastify";
import { setTransaction } from "../_slices/view-transaction-slice";

const PASSWORD = "Test Password";

const ConfirmTransaction = () => {
  const router = useRouter();
  const { bitcoinAmount, usdAmount, feeType } = useSelector(
    (state) => state.transaction
  );
  const { firstName, lastName, traderInfo } = useSelector(
    (state) => state.currentlyTradingUser
  );
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  console.log(useSelector((state) => state.transaction.bitcoinAmount));

  const onConfirm = () => {
    if (password === "") {
      toast.error("Please enter password");
      return;
    } else if (password !== PASSWORD) {
      toast.error("Incorrect password");
      return;
    }

    // Add Transaction To Cloud

    dispatch(
      setTransaction({
        name: firstName + " " + lastName,
        bitcoinAmount,
        usdAmount,
        commissionType: feeType,
        traderName: traderInfo.title,
        date: new Date().toLocaleDateString(),
      })
    );

    router.push("/view-transaction");
  };

  return (
    <div className="flex flex-col justify-around items-start w-screen h-screen p-4">
      <div className="flex flex-row w-full justify-between font-bold text-6xl">
        <div>Transaction In Progress</div>
        <div>{new Date().toLocaleDateString()}</div>
      </div>
      <div className="w-full h-full flex-row flex">
        <div className="flex flex-col w-full h-full items-start justify-around">
          <h1 className="text-4xl font-medium">
            Amount of Bitcoin to trade:{" "}
            <span className="font-bold">{bitcoinAmount} BTC</span>
          </h1>
          <h1 className="text-4xl font-medium">
            Trade Currency: <span className="font-bold">{feeType}</span>
          </h1>
          {feeType === "Fiat Currency" && (
            <h1 className="text-4xl font-medium">
              Amount in USD:{" "}
              <span className="font-bold">
                ${addCommas(usdAmount.toString())}
              </span>
            </h1>
          )}
          <h1 className="text-4xl font-medium">
            Password:
            <Input
              value={password}
              setValue={setPassword}
              placeholder="Input Password"
            />
          </h1>
        </div>
        <div className="flex flex-col justify-end gap-y-12">
          <Button
            className="w-max self-end bg-red-500 hover:bg-red-600"
            onClick={() => router.push("/trade")}
          >
            Cancel Transaction
          </Button>
          <Button className="w-max self-end" onClick={onConfirm}>
            Confirm Transaction
          </Button>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default ConfirmTransaction;

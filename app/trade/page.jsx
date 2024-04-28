"use client";

import React, { useEffect, useState } from "react";
import Dropdown from "../_components/dropdown";
import Input from "../_components/input";
import Button from "../_components/button";
import CurrencyInput from "react-currency-input-field";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { updateBitcoinAmount } from "../_slices/transaction-slice";

const Page = () => {
  const userInfo = useSelector((state) => state.user);

  const { firstName, lastName, accountType, bitcoin } = userInfo;
  const [commissionAmount, setCommissionAmount] = useState("");
  const [transactionFee, setTransactionFee] = useState("Fiat Currency");
  const [totalTradeAmount, setTotalTradeAmount] = useState("0.00");
  const dispatch = useDispatch();
  const router = useRouter();

  const tradeAmount = () => {
    const parsedTotalTradeAmount = parseFloat(
      totalTradeAmount.replace(/,/g, "")
    );

    if (commissionAmount === "") {
      toast.error("Please enter bitcoin amount");
      return;
    } else if (bitcoin < totalTradeAmount) {
      toast.error("Insufficient bitcoin");
      return;
    }

    console.log("Totla Trade Amount:", parsedTotalTradeAmount);

    dispatch(updateBitcoinAmount(parsedTotalTradeAmount));

    router.push("/confirm-transaction");
  };

  useEffect(() => {
    const fetchUpdateTradeAmount = async () => {
      const response = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
      );
      const multiplier = (await response.json()).bpi.USD.rate_float;

      const tradeAmount =
        transactionFee === "Fiat Currency"
          ? (commissionAmount / multiplier).toFixed(2)
          : commissionAmount.toString();

      console.log("Commision Amount:", commissionAmount);
      console.log("Trade Amount:", tradeAmount);

      setTotalTradeAmount(
        commissionAmount
          ? tradeAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : "0.00"
      );
    };

    fetchUpdateTradeAmount();
  }, [commissionAmount, transactionFee]);

  return (
    <div className="flex flex-col justify-between items-center w-screen h-screen p-16">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col gap-y-[21px]">
          <div className="font-bold text-[40px]">Commission Amount</div>
          <CurrencyInput
            placeholder="Commision Amount"
            defaultValue={0}
            decimalsLimit={2}
            value={commissionAmount}
            onValueChange={(value, name, values) => setCommissionAmount(value)}
            className="bg-[#F1F1F1] rounded-[14px] p-4 outline-none w-[450px]"
            prefix="$"
          />
        </div>
        <div className="flex flex-col gap-y-4 text-center">
          <div className="font-bold text-[60px]">
            {firstName + " " + lastName}
          </div>
          <div className={`font-medium text-[30px] `}>
            Account Type:{" "}
            <span
              className={`${
                accountType === "GOLD" ? "text-yellow-400" : "text-slate-400"
              }`}
            >
              {accountType === "GOLD" ? "Gold" : "Silver"}
            </span>
          </div>
          <div className={`font-medium text-[30px]`}>
            Currency In Account: {bitcoin} Bitcoin
          </div>
          <div className={`font-medium text-[30px]`}>
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col gap-y-[21px]">
          <div className="font-bold text-[40px]">Commission Type</div>
          <Dropdown
            options={["Fiat Currency", "Bitcoin"]}
            selectedValue={transactionFee}
            setSelectedValue={setTransactionFee}
          />
        </div>
        <div className="flex flex-col gap-y-[21px]">
          <div className="font-bold text-[40px]">
            <span className="font-normal">
              Total Trade Amount (In Bitcoin):
            </span>{" "}
            {totalTradeAmount}
          </div>
          <Button className="w-full" onClick={() => tradeAmount()}>
            Trade
          </Button>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default Page;

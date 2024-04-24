"use client";

import React, { useState } from "react";
import Dropdown from "../_components/dropdown";
import Input from "../_components/input";
import Button from "../_components/button";
import CurrencyInput from "react-currency-input-field";

const DUMMY_DATA = {
  name: "Tariq Mahamid",
  accountType: "GOLD",
  balance: 10,
};

const Page = () => {
  const { name, accountType, balance } = DUMMY_DATA;
  const [bitcointAmount, setBitcointAmount] = useState("");
  const [transactionFee, setTransactionFee] = useState("Fiat Currency");
  const [totalTradeAmount, setTotalTradeAmount] = useState("");

  return (
    <div className="flex flex-col justify-between items-center w-screen h-screen p-16">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col gap-y-[21px]">
          <div className="font-bold text-[40px]">Bitcoin Amount</div>
          <input
            className="bg-[#F1F1F1] rounded-[14px] p-4 outline-none w-[450px]"
            placeholder="Bitcoin Amount"
            value={bitcointAmount}
            onChange={(e) => setBitcointAmount(e.target.value)}
            type="number"
          />
        </div>
        <div className="flex flex-col gap-y-4 text-center">
          <div className="font-bold text-[60px]">{name}</div>
          <div
            className={`font-medium text-[30px] ${
              accountType === "GOLD" ? "text-yellow-400" : "text-slate-400"
            }`}
          >
            Account Type: {accountType === "GOLD" ? "Gold" : "Silver"}
          </div>
          <div className={`font-medium text-[30px]`}>
            Currency In Account: ${balance} USD
          </div>
          <div className={`font-medium text-[30px]`}>
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col gap-y-[21px]">
          <div className="font-bold text-[40px]">Transaction Fee</div>
          <Dropdown
            options={["Fiat Currency", "Bitcoin"]}
            selectedValue={transactionFee}
            setSelectedValue={setTransactionFee}
          />
        </div>
        <div className="flex flex-col gap-y-[21px]">
          <div className="font-bold text-[40px]">Total Trade Amount</div>
          <CurrencyInput
            placeholder="Trade Amount"
            defaultValue={1000}
            decimalsLimit={2}
            value={totalTradeAmount}
            onValueChange={(value, name, values) => setTotalTradeAmount(value)}
            className="bg-[#F1F1F1] rounded-[14px] p-4 outline-none w-[450px]"
            prefix="$"
          />
          <Button className="w-full">Trade</Button>
        </div>
      </div>
    </div>
  );
};

export default Page;

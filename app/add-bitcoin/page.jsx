"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addCommas from "../_reusable-functions/add-commas";
import Input from "../_components/input";
import Button from "../_components/button";
import { ToastContainer, toast } from "react-toastify";
import { setTransaction } from "../_slices/view-transaction-slice";
import CurrencyInput from "react-currency-input-field";
import Dropdown from "../_components/dropdown";
import { updateBalance } from "../_slices/user-slice";
import { updateTradingUser } from "../_slices/currently-trading-user-slice";

const PASSWORD = "Test Password";

const AddBitcoin = () => {
  const router = useRouter();
  const tradingUser = useSelector((state) => state.currentlyTradingUser);
  const selectedUser = useSelector((state) => state.selectedUser);
  const accountType = useSelector((state) => state.account.accountType);

  console.log("Tradign User:", tradingUser);

  const [commissionAmount, setCommissionAmount] = useState("");
  const [transactionFee, setTransactionFee] = useState(null);
  const [bitcoinAmount, setBitcoinAmount] = useState("");
  const [password, setPassword] = useState("");
  const { firstName, lastName, traderInfo } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  console.log(useSelector((state) => state.transaction.bitcoinAmount));

  useEffect(() => {
    const fetchUpdateTradeAmount = async () => {
      const response = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
      );
      const data = await response.json();

      console.log("Data:", data);

      const bitcoinPrice = data.bpi.USD.rate_float;

      console.log("Commission Amount:", commissionAmount);
      console.log("commission Type:", transactionFee?.title);

      if (transactionFee && transactionFee.title === "Fiat Currency") {
        setBitcoinAmount((commissionAmount / bitcoinPrice).toFixed(8));
      } else {
        setBitcoinAmount(commissionAmount);
      }

      console.log("Bitcoin Price:", bitcoinPrice);
    };

    fetchUpdateTradeAmount();
  }, [commissionAmount, transactionFee]);

  const onConfirm = () => {
    if (password === "") {
      toast.error("Please enter password");
      return;
    } else if (password !== PASSWORD) {
      toast.error("Incorrect password");
      return;
    }

    // Add Transaction To Cloud
    // Add Bitcoin To Cloud Here

    if (accountType === "Client") {
      dispatch(
        updateTradingUser({
          ...tradingUser,
          bitcoin: tradingUser.bitcoin + bitcoinAmount,
        })
      );

      router.push("/trade");
    } else {
      router.push("/trader");
    }
  };

  return (
    <div className="flex flex-col justify-around items-start w-screen h-screen p-4">
      <div className="flex flex-row w-full justify-between font-bold text-6xl">
        <div>Add Bitcoin to Client</div>
        <div>{new Date().toLocaleDateString()}</div>
      </div>
      <div className="w-full h-full flex-row flex">
        <div className="flex flex-col w-full h-full items-start justify-around">
          <div className="flex flex-col gap-y-[21px]">
            <div className="font-bold text-[40px]">Commission Amount</div>
            <CurrencyInput
              placeholder="Commision Amount"
              defaultValue={0}
              decimalsLimit={2}
              value={commissionAmount}
              onValueChange={(value, name, values) =>
                setCommissionAmount(value)
              }
              className="bg-[#F1F1F1] rounded-[14px] p-4 outline-none w-[450px]"
            />
          </div>
          <div className="flex flex-col gap-y-[21px]">
            <div className="font-bold text-[40px]">Commission Type</div>
            <Dropdown
              options={[
                { id: 1, title: "Fiat Currency" },
                { id: 2, title: "Bitcoin" },
              ]}
              selectedValue={transactionFee}
              setSelectedValue={setTransactionFee}
            />
          </div>
          {transactionFee && transactionFee.title === "Fiat Currency" && (
            <h1 className="text-4xl font-medium">
              Amount in Bitcoin:{" "}
              <span className="font-bold">
                {addCommas(bitcoinAmount.toString())} BTC
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
            Cancel
          </Button>
          <Button className="w-max self-end" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default AddBitcoin;

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addCommas from "../_reusable-functions/add-commas";
import Input from "../_components/input";
import Button from "../_components/button";
import { ToastContainer, toast } from "react-toastify";
import { setTransaction } from "../_slices/view-transaction-slice";
import {
  createTransaction,
  getClientPassword,
  cancelTransaction,
} from "../utils/supabase/dbcalls";
import { updateTradingBalance } from "../_slices/currently-trading-user-slice";

const ConfirmTransaction = () => {
  const router = useRouter();
  const {
    bitcoinAmountBefore,
    usdAmountBefore,
    bitcoinAmountAfter,
    usdAmountAfter,
    transactionType,
    commissionType,
    commissionAmount,
    bitcoinChange,
    usdChange,
  } = useSelector((state) => state.transaction);

  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.currentlyTradingUser);

  const { firstName, lastName, accountType, bitcoin, usd, traderInfo, id } =
    userInfo;

  console.log(useSelector((state) => state.transaction.bitcoinAmount));
  const onCancel = async () => {
    const { transaction_id } = await createTransaction(
      id,
      traderInfo.id,
      transactionType,
      usdAmountAfter,
      bitcoinAmountAfter,
      commissionAmount,
      commissionType,
      bitcoinChange,
      usdChange
    );

    await cancelTransaction(transaction_id, traderInfo.id);

    router.push("/trade");
  };
  const onConfirm = async () => {
    const clientPass = await getClientPassword(id);
    if (password === "") {
      toast.error("Please enter password");
      return;
    } else if (password !== clientPass) {
      toast.error("Incorrect password");
      return;
    }

    const transaction = await createTransaction(
      id,
      traderInfo.id,
      transactionType,
      usdAmountAfter,
      bitcoinAmountAfter,
      commissionAmount,
      commissionType,
      bitcoinChange,
      usdChange
    );
    // Add Transaction To Cloud

    dispatch(
      setTransaction({
        name: firstName + " " + lastName,
        bitcoinAmount: bitcoinChange,
        usdAmount: usdChange,
        traderName: traderInfo.title,
        date: new Date().toLocaleDateString(),
      })
    );

    dispatch(
      updateTradingBalance({ bitcoin: bitcoinAmountAfter, usd: usdAmountAfter })
    );

    router.push("/view-transaction");
  };

  return (
    <div className="flex flex-col justify-around items-start w-screen h-screen p-4">
      <div className="flex flex-row w-full justify-between font-bold text-6xl">
        <div>Transaction In Progress</div>
        <div>{new Date().toLocaleDateString()}</div>
      </div>
      <div className="w-full h-full flex-col flex py-12">
        <div className="grid grid-cols-2 grid-rows-2 w-full h-full items-start justify-around">
          <h1 className="text-4xl font-medium">
            Amount in Account Bitcoin Before:{" "}
            <span className="font-bold">{bitcoinAmountBefore} BTC</span>
          </h1>
          <h1 className="text-4xl font-medium">
            Amount in Account Bitcoin After:{" "}
            <span className="font-bold">{bitcoinAmountAfter} BTC</span>
          </h1>
          <h1 className="text-4xl font-medium">
            Amount in Account USD Before:{" "}
            <span className="font-bold">
              ${addCommas(usdAmountBefore.toFixed(2))}
            </span>
          </h1>
          <h1 className="text-4xl font-medium">
            Amount in Account USD After:{" "}
            <span className="font-bold">
              ${addCommas(usdAmountAfter.toFixed(2))}
            </span>
          </h1>
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
            onClick={onCancel}
            // onClick={() => router.push("/trade")}
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

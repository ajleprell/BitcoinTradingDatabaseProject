"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import Button from "../_components/button";
import addCommas from "../_reusable-functions/add-commas";

const ViewTransaction = () => {
  const transaction = useSelector((state) => state.viewTransaction);
  const accountType = useSelector((state) => state.account.accountType);
  const router = useRouter();

  const { date, bitcoinAmount, usdAmount, name, commissionType, traderName } =
    transaction;

  console.log("Transaction:", transaction);

  return (
    <div className="flex flex-col justify-around items-start w-screen h-screen p-4">
      <div className="flex flex-row w-full justify-between font-bold text-6xl">
        <div>Transaction Info</div>
        <div>{date}</div>
      </div>
      <div className="w-full h-full flex-row flex">
        <div className="flex flex-col w-full h-full items-start justify-around">
          <h1 className="text-4xl font-medium">
            Value of Transaction in Bitcoin:{" "}
            <span className="font-bold">{bitcoinAmount} BTC</span>
          </h1>
          <h1 className="text-4xl font-medium">
            Commission Type: <span className="font-bold">{commissionType}</span>
          </h1>
          {commissionType === "Fiat Currency" && usdAmount && (
            <h1 className="text-4xl font-medium">
              Amount in USD:{" "}
              <span className="font-bold">
                ${addCommas(usdAmount.toString())}
              </span>
            </h1>
          )}
          <h1 className="text-4xl font-medium">
            Client Name: <span className="font-bold">{name}</span>
          </h1>
          <h1 className="text-4xl font-medium">
            Trader: <span className="font-bold">{traderName}</span>
          </h1>
        </div>
        <div className="flex flex-col justify-end gap-y-12">
          <Button
            className="w-max self-end"
            onClick={() =>
              router.push(accountType === "Client" ? "/trade" : "/trader")
            }
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewTransaction;

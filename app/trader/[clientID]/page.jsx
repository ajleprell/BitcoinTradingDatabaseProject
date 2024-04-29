"use client";

import Button from "@/app/_components/button";
import ClientTransactionsList from "@/app/_components/client-transactions-list";
import { updateTradingUser } from "@/app/_slices/currently-trading-user-slice";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CLIENT_INFO = {
  name: "John Doe",
  transactions: [
    {
      id: 1,
      date: "4/10/2024",
      usdAmount: 100,
      type: "Deposit",
      commissionType: "Fiat Currency",
      bitcoinAmount: 0.0001,
      clientName: "Ronald Ralph",
      traderName: "John Doe",
    },
    {
      id: 2,
      date: "4/1/2024",
      usdAmount: 200,
      type: "Withdrawal",
      commissionType: "Bitcoin",
      bitcoinAmount: 0.0002,
      clientName: "Ronald Ralph",
      traderName: "Jane Doe",
    },
    {
      id: 3,
      date: "3/1/2024",
      usdAmount: 300,
      type: "Deposit",
      commissionType: "Fiat Currency",
      bitcoinAmount: 0.0003,
      clientName: "Ronald Ralph",
      traderName: "Steve Smith",
    },
  ],
};

const ViewSpecificClient = () => {
  const { clientID } = useParams();
  const {id, name} = useSelector((state) => state.selectedClient);
  const [client, setClient] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClientInfo = async () => {
      // Fetch Client Info Here

      setClient(CLIENT_INFO);
    };

    fetchClientInfo();
  });

  console.log("Client ID:", clientID);

  if (!client) return <div>Loading...</div>;

  const tradeWithClient = () => {

   initialState: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    cellPhoneNumber: "",
    email: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    accountType: "SILVER",
    traderInfo: {
      id: "",
      title: "",
    },
    bitcoin: 9999,
  },\

    dispatch(updateTradingUser({
      firstName: client.name.split(" ")[0],
      lastName: client.name.split(" ")[1],
      traderInfo: {
        id: clientID,
        title: "Trader",
      },
      bitcoin: 9999,
    
    }));

    router.push(`/trade`);
  };

  return (
    <div className="w-screen h-screen flex flex-col p-8 gap-y-8">
      <div className="font-bold text-5xl">{client.name} Info</div>
      <div className="flex flex-row">
        <ClientTransactionsList transactions={client.transactions} />
      </div>
      <div className="flex flex-col justify-end gap-y-12">
        <Button
          className="w-1/4 self-end bg-red-500 hover:bg-red-600"
          onClick={() => router.push("/trader")}
        >
          Back
        </Button>
        <Button className="w-1/4 self-end" onClick={tradeWithClient}>
          Trade
        </Button>
      </div>
    </div>
  );
};

export default ViewSpecificClient;

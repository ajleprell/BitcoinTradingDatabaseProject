"use client";

import Button from "@/app/_components/button";
import ClientTransactionsList from "@/app/_components/client-transactions-list";
import { updateTradingUser } from "@/app/_slices/currently-trading-user-slice";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientInfo, getClientBalance } from "../../utils/supabase/dbcalls";
// const client = {
//   name: "John Doe",
//   accountType: "SILVER",
//   transactions: [
//     {
//       id: 1,
//       date: "4/10/2024",
//       usdAmount: 100,
//       type: "Deposit",
//       bitcoinAmount: 0.0001,
//       clientName: "Ronald Ralph",
//       traderName: "John Doe",
//     },
//     {
//       id: 2,
//       date: "4/1/2024",
//       usdAmount: 200,
//       type: "Withdrawal",
//       bitcoinAmount: 0.0002,
//       clientName: "Ronald Ralph",
//       traderName: "Jane Doe",
//     },
//     {
//       id: 3,
//       date: "3/1/2024",
//       usdAmount: 300,
//       type: "Deposit",
//       bitcoinAmount: 0.0003,
//       clientName: "Ronald Ralph",
//       traderName: "Steve Smith",
//     },
//   ],
// };

const ViewSpecificClient = () => {
  const { clientID } = useParams();
  const { id, name } = useSelector((state) => state.user);
  const [client, setClient] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClientInfo = async () => {
      // Fetch Client Info Here
      const client_info = await getClientInfo(clientID);

      setClient(client_info);
    };

    fetchClientInfo();
  });

  if (!client) return <div>Loading...</div>;

  const tradeWithClient  = async () => {
    const balance = await getClientBalance(clientID);
    console.log("balance: ", balance)
    dispatch(
      updateTradingUser({
        id: clientID,
        firstName: client.name.split(" ")[0],
        lastName: client.name.split(" ")[1],
        traderInfo: {
          id: id,
          title: name,
        },
        bitcoin: balance.bitcoin_balance,
        usd: balance.fiat_balance,
        accountType: client.accountType,
      })
    );

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

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FilterDropdown from "./filter-dropdown";
import Button from "./button";
import { useDispatch } from "react-redux";
import { setTransaction } from "../_slices/view-transaction-slice";

const ClientTransactionsList = ({ transactions }) => {
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(); // today, week, month, year, all
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedFilter) return setFilteredTransactions(transactions);

    const today = new Date();
    const week = new Date();
    const month = new Date();
    const year = new Date();

    week.setDate(today.getDate() - 7);
    month.setMonth(today.getMonth() - 1);
    year.setFullYear(today.getFullYear() - 1);

    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);

      switch (selectedFilter) {
        case "today":
          return transactionDate.toDateString() === today.toDateString();
        case "week":
          return transactionDate >= week;
        case "month":
          return transactionDate >= month;
        case "year":
          return transactionDate >= year;
        default:
          return true;
      }
    });

    setFilteredTransactions(filtered);
  }, [selectedFilter]);

  const viewTransaction = (selectedTransaction) => {
    console.log("Selected Transgtion:", selectedTransaction);

    dispatch(
      setTransaction({
        date: selectedTransaction.date,
        bitcoinAmount: selectedTransaction.bitcoinAmount,
        usdAmount: selectedTransaction.usdAmount,
        commissionType: selectedTransaction.commissionType,
        traderName: selectedTransaction.traderName,
        name: selectedTransaction.clientName,
      })
    );

    router.push("/view-transaction");
  };

  return (
    <div className="flex flex-row gap-x-12">
      <div className="flex flex-col gap-y-8">
        <div className="font-bold text-4xl">Transactions</div>
        {filteredTransactions.map((transaction, index) => (
          <Button
            key={index}
            className="flex flex-col gap-y-2 w-full"
            onClick={() => viewTransaction(transaction)}
          >
            <div className="font-bold text-2xl">{transaction.date}</div>
            <div className="font-medium text-xl">{transaction.amount} BTC</div>
          </Button>
        ))}
      </div>
      <FilterDropdown
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
    </div>
  );
};

export default ClientTransactionsList;

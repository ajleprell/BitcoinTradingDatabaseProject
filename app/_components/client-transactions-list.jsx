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
    // Reset the time part of today to midnight
    today.setHours(0, 0, 0, 0);

    const week = new Date(today);
    const month = new Date(today);
    const year = new Date(today);

    week.setDate(today.getDate() - 7);
    month.setMonth(today.getMonth() - 1);
    year.setFullYear(today.getFullYear() - 1);

    console.log("Selected Filter:", selectedFilter);

    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      transactionDate.setHours(0, 0, 0, 0); // Reset the time to midnight for comparison

      switch (selectedFilter) {
        case "today":
          return transactionDate.toDateString() === today.toDateString();
        case "this week":
          return transactionDate >= week;
        case "this month":
          return transactionDate >= month;
        case "this year":
          return transactionDate >= year;
        default:
          return true;
      }
    });

    console.log("Filterd", filtered);

    setFilteredTransactions(filtered);
  }, [selectedFilter, transactions]);

  const viewTransaction = (selectedTransaction) => {
    console.log("Selected Transgtion:", selectedTransaction);

    dispatch(
      setTransaction({
        date: selectedTransaction.date,
        bitcoinAmount: selectedTransaction.bitcoinAmount,
        usdAmount: selectedTransaction.usdAmount,
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
            <div className="font-medium text-xl">
              {transaction.bitcoinAmount} BTC
            </div>
            <div className="font-medium text-xl">
              {transaction.usdAmount} USD
            </div>
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

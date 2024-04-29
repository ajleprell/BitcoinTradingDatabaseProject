"use client";

import React, { useState } from "react";
import Button from "../_components/button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Input from "../_components/input";

const CLIENTS = [
  {
    id: 1,
    name: "John Doe",
    city: "New York",
    zipCode: "10001",
  },
  {
    id: 2,
    name: "Jane Roe",
    city: "Los Angeles",
    zipCode: "90001",
  },
  {
    id: 3,
    name: "Steve Smith",
    city: "Chicago",
    zipCode: "60007",
  },
];

const Trader = () => {
  const { firstName, lastName } = useSelector((state) => state.user);
  const accountType = useSelector((state) => state.account.accountType);
  const router = useRouter();
  const [nameSearch, setNameSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [zipCodeSearch, setZipCodeSearch] = useState("");
  const [filteredClients, setFilteredClients] = useState(CLIENTS);

  console.log("First Name:", firstName);
  console.log("last Name:", lastName);

  const search = () => {
    const filtered = CLIENTS.filter(
      (client) =>
        (nameSearch
          ? client.name.toLowerCase().includes(nameSearch.toLowerCase())
          : true) &&
        (citySearch
          ? client.city.toLowerCase().includes(citySearch.toLowerCase())
          : true) &&
        (zipCodeSearch ? client.zipCode.startsWith(zipCodeSearch) : true)
    );
    setFilteredClients(filtered);
  };

  const clearSearch = () => {
    setNameSearch("");
    setCitySearch("");
    setZipCodeSearch("");
    setFilteredClients(CLIENTS);
  };

  return (
    <div className="w-screen h-screen flex flex-row p-8 gap-x-8">
      <div className="flex flex-col w-1/2 gap-y-4">
        <div className="font-bold text-6xl">
          Filtered Clients ({filteredClients.length})
        </div>
        {filteredClients.map((client) => (
          <Button
            key={client.id}
            className="w-full"
            onClick={() => router.push("/trader/" + client.id)}
          >
            {client.name}
          </Button>
        ))}
      </div>
      <div className="flex flex-col justify-around w-1/2">
        <div className="flex flex-col gap-y-4 text-center">
          <div className="font-bold text-[60px]">
            {firstName + " " + lastName}
          </div>
          <div className={`font-medium text-[30px] `}>
            Account Type: {accountType}
          </div>
          <div className={`font-medium text-[30px]`}>
            Clients: {CLIENTS.length}
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <Input
            title="Name"
            value={nameSearch}
            setValue={setNameSearch}
            placeholder="Search by Name"
          />
          <Input
            title="City"
            value={citySearch}
            setValue={setCitySearch}
            placeholder="Search by City"
          />
          <Input
            title="Zip Code"
            value={zipCodeSearch}
            setValue={setZipCodeSearch}
            placeholder="Search by Zip Code"
          />
          <Button className="w-max self-start" onClick={search}>
            Search Clients
          </Button>
          <button
            className="self-start text-red-500 hover:text-red-600 hover:underline cursor-pointer"
            onClick={clearSearch}
          >
            Clear Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trader;

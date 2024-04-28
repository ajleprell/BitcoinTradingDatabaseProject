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
  },
  {
    id: 2,
    name: "Jane Roe",
  },
  {
    id: 3,
    name: "Steve Smith",
  },
];

const DUMMY_NAME = "John Doe";

const Trader = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const { firstName, lastName } = useSelector((state) => state.user);
  const router = useRouter();
  const [nameSearch, setNameSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [zipCodeSearch, setZipCodeSearch] = useState("");

  const [searchForClient, setSearchForClient] = useState("");

  const search = () => {
    const [name, city, zipCode] = searchForClient.split(", ");

    console.log("Name:", name);
    console.log("City:", city);
    console.log("Zip Code:", zipCode);
  };

  return (
    <div className="w-screen h-screen flex flex-row p-8 gap-x-8">
      <div className="flex flex-col w-1/2 gap-y-4">
        <div className="font-bold text-6xl">Clients ({CLIENTS.length})</div>
        {CLIENTS.map((client) => (
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
          <div className="font-bold text-[60px]">{DUMMY_NAME}</div>
          <div className={`font-medium text-[30px] `}>Account Type: Trader</div>
          <div className={`font-medium text-[30px]`}>
            Clients: {CLIENTS.length}
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <Input
            title="Name"
            value={nameSearch}
            setValue={setNameSearch}
            placeholder="Name for Search"
          />
          <Input
            title="City"
            value={citySearch}
            setValue={setCitySearch}
            placeholder="City for Search"
          />
          <Input
            title="Zip Code"
            value={zipCodeSearch}
            setValue={setZipCodeSearch}
            placeholder="Zip Code For Search"
          />
          <Button className="w-max self-start" onClick={search}>
            Search For Client
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Trader;

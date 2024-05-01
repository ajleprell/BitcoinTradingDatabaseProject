"use client";

import React, { useState, useEffect } from "react";
import Button from "../_components/button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Input from "../_components/input";
import {getAllClients} from "../utils/supabase/dbcalls";


const Trader = () => {
  const { firstName, lastName } = useSelector((state) => state.user);

  const accountType = useSelector((state) => state.account.accountType);
  const router = useRouter();
  const [nameSearch, setNameSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [zipCodeSearch, setZipCodeSearch] = useState("");
  const [clients, setClients] = useState([]); // Dynamic list of traders
  const [filteredClients, setFilteredClients] = useState(clients);
  const trader = useSelector((state) => state.user)
  // Fetch traders from the database
  useEffect(() => {
    const fetchClients = async () => {
      let fetchedClients = await getAllClients(trader.id);
      fetchedClients= fetchedClients.map(t => ({ key: t.client_id, ...t }))
      
      setClients(fetchedClients); // Format the fetched traders
      setFilteredClients(fetchedClients)
    };

    fetchClients();
  }, []);
  console.log("First Name:", firstName);
  console.log("last Name:", lastName);

  const search = () => {
    const filtered = clients.filter(
      (client) =>
        (nameSearch
          ? client.first_name.toLowerCase().includes(nameSearch.toLowerCase())
          : true) &&
        (citySearch
          ? client.city.toLowerCase().includes(citySearch.toLowerCase())
          : true) &&
        (zipCodeSearch ? client.zipCode.startsWith(zipCodeSearch) : true)
    );
    console.log("filtered; ", filtered)
    setFilteredClients(filtered);
  };

  const clearSearch = () => {
    setNameSearch("");
    setCitySearch("");
    setZipCodeSearch("");
    setFilteredClients(clients);
  };

  return (
    <div className="w-screen h-screen flex flex-row p-8 gap-x-8">
      <div className="flex flex-col w-1/2 gap-y-4">
        <div className="font-bold text-6xl">
          Filtered Clients ({filteredClients.length})
        </div>
        {filteredClients.map((client) => (
          <Button
            key={client.key}
            className="w-full"
            onClick={() => router.push("/trader/" + client.client_id)}
          >
            {client.first_name + " " + client.last_name}
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
            Clients: {clients.length}
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

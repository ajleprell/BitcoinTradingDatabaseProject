"use client";

import { useParams } from "next/navigation";
import React from "react";

const ViewSpecificClient = () => {
  const { clientID } = useParams();

  console.log("Client ID:", clientID);

  return <div>ViewSpecificClient</div>;
};

export default ViewSpecificClient;

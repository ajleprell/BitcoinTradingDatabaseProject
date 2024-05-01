import { createServerClient } from "./supabase.js";

export async function loginClient(email, inputPassword, accountType) {
  const supabase = createServerClient();
  console.log("accountType: ", accountType);
  if (accountType === "Client") {
    const { data, error } = await supabase
      .from("Clients")
      .select("*")
      .eq("email", email)
      .single();
    const realPass = data.password;
    if (realPass !== inputPassword) {
      return false;
    }
    const traderID = data.trader_id;
    const { data: trader, traderError } = await supabase
      .from("Traders")
      .select("*")
      .eq("trader_id", traderID)
      .single();
    const traderInfo = {
      id: traderID,
      title: trader.first_name + " " + trader.last_name,
    };
    const { data: clientAccount, accError } = await supabase
      .from("Accounts")
      .select("*")
      .eq("client_id", data.client_id)
      .single();
    const signedInUser = {
      id: data.client_id,
      firstName: data.first_name,
      lastName: data.last_name,
      phoneNumber: data.phone_number,
      cellPhoneNumber: data.cell_phone_number,
      email: data.email,
      streetAddress: data.street_address,
      city: data.city,
      state: data.state,
      zipCode: data.zip_code,
      bitcoin: clientAccount.bitcoin_balance,
      traderInfo: traderInfo,
    };

    return signedInUser;
  } else if (accountType === "Manager") {
  } else {
    const { data, error } = await supabase
      .from("Traders")
      .select("*")
      .eq("email", email)
      .single();
    const realPass = data.password;
    if (realPass !== inputPassword) {
      return false;
    }

    const signedInUser = {
      id: data.trader_id,
      firstName: data.first_name,
      lastName: data.last_name,
      phoneNumber: data.phone_number,
      email: data.email,
      streetAddress: data.street_address,
      city: data.city,
      state: data.state,
      zipCode: data.zip_code,
    };

    return signedInUser;
  }
}
export async function createBTCClient(
  first_name,
  last_name,
  phone_number,
  cell_phone_number,
  email,
  street_address,
  city,
  state,
  zip_code,
  password,
  trader_id
) {
  const supabase = createServerClient();
  if (trader_id !== "") {
    const { data: clientResult, error: clientError } = await supabase
      .from("Clients")
      .insert([
        {
          first_name,
          last_name,
          phone_number,
          cell_phone_number,
          email,
          street_address,
          city,
          state,
          zip_code,
          password,
          trader_id,
        },
      ])
      .select("client_id");
    if (clientError) {
      console.error("Error inserting into Clients:", clientError);
      return;
    }

    const client_id = clientResult[0].client_id;

    const { data: accountResult, error: accountError } = await supabase
      .from("Accounts")
      .insert([
        {
          fiat_balance: 0.0,
          bitcoin_balance: 0.0,
          client_id: client_id,
        },
      ]);

    if (accountError) {
      console.error("Error inserting into Accounts:", accountError);
    } else {
      console.log(
        "Successfully created client and account:",
        clientResult,
        accountResult
      );
    }

    return client_id;
  } else {
    const { data: traderResult, error: traderError } = await supabase
      .from("Traders")
      .insert([
        {
          first_name,
          last_name,
          phone_number,
          email,
          street_address,
          city,
          state,
          zip_code,
          password,
        },
      ])
      .select("trader_id");
    if (traderError) {
      console.error("Error inserting into Traders:", traderError);
      return;
    }

    const trader_id = traderResult[0].trader_id;
    return trader_id;
  }
}

export async function getAllTraders() {
  const supabase = createServerClient();
  const { data: traders, error: tradersError } = await supabase
    .from("Traders")
    .select("*");

  return traders;
}

export async function getAllClients(trader_id) {
  const supabase = createServerClient();
  const { data: clients, error } = await supabase
    .from("Clients")
    .select("*")
    .eq("trader_id", trader_id);

  console.log("traders clients: ", clients);
  return clients;
}

export async function getClientInfo(client_id) {
  const supabase = createServerClient();
  // Query the Clients table for the basic client information.
  let { data: clientData, error: clientError } = await supabase
    .from("Clients")
    .select("first_name, last_name, classification_level")
    .eq("client_id", client_id)
    .single();

  if (clientError) {
    console.error("Error fetching client data:", clientError);
    return;
  }

  const clientName = `${clientData.first_name} ${clientData.last_name}`;
  const accountType = clientData.classification_level.toUpperCase();

  // Query the Transactions table for the client's transactions.
  let { data: transactionsData, error: transactionsError } = await supabase
    .from("Transactions")
    .select(
      `
      transaction_id,
      date,
      fiat_amount,
      transaction_type,
      commission,
      commission_type,
      bitcoin_amount,
      trader_id,
      Clients:client_id(first_name, last_name),
      Traders:trader_id(first_name, last_name)
    `
    )
    .eq("client_id", client_id);

  if (transactionsError) {
    console.error("Error fetching transactions data:", transactionsError);
    return;
  }

  // Build the transactions array in the desired format.
  const transactions = transactionsData.map((trans) => ({
    id: trans.transaction_id,
    date: new Date(trans.date).toLocaleDateString(),
    usdAmount: trans.fiat_amount,
    type: trans.transaction_type === "Buy" ? "Deposit" : "Withdrawal",
    commissionType:
      trans.commission_type === "Bitcoin" ? "Bitcoin" : "Fiat Currency",
    bitcoinAmount: trans.bitcoin_amount,
    clientName: `${trans.Clients.first_name} ${trans.Clients.last_name}`,
    traderName: `${trans.Traders.first_name} ${trans.Traders.last_name}`,
  }));

  // Construct the final object.
  const CLIENT_INFO = {
    name: clientName,
    accountType: accountType,
    transactions: transactions,
  };
  return CLIENT_INFO;
  // console.log(CLIENT_INFO);
}

export async function createTransaction({
  client_id,
  trader_id,
  transaction_type,
  fiat_amount,
  bitcoin_amount,
  commission,
  commission_type,
}) {
  // Check if the required inputs are valid.
  if (!client_id || !trader_id || !transaction_type || !commission_type) {
    console.error("Missing required inputs.");
    return;
  }

  // Insert the new transaction.
  const { data, error } = await supabase.from("Transactions").insert([
    {
      client_id: client_id,
      trader_id: trader_id,
      transaction_type: transaction_type,
      fiat_amount: fiat_amount || 0, // Default to 0 if not provided.
      bitcoin_amount: bitcoin_amount || 0, // Default to 0 if not provided.
      commission: commission || 0, // Default to 0 if not provided.
      commission_type: commission_type,
    },
  ]);

  if (error) {
    console.error("Error inserting transaction:", error);
    return;
  }

  console.log("Transaction created successfully:", data);
}

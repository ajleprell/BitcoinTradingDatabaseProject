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
      usd: clientAccount.fiat_balance,
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

export async function deposit(
  client_id,
  password,
  amount,
  deposit_type,
  trader_id
) {
  const supabase = createServerClient();

  // Step 1: Verify the client's identity
  const { data: clients, error: clientError } = await supabase
    .from("Clients")
    .select("password")
    .eq("client_id", client_id)
    .single();
  console.log("here!: ", clients);
  if (clientError || !clients) {
    console.error("Client verification failed: ", clientError);
    throw new Error("Invalid client ID or password");
  }

  if (clients.password !== password) {
    throw new Error("Invalid client ID or password");
  }

  // Step 2: Retrieve client's account
  const { data: accounts, error: accountError } = await supabase
    .from("Accounts")
    .select("*")
    .eq("client_id", client_id)
    .single();

  if (accountError || !accounts) {
    console.error("Account retrieval failed: ", accountError);
    throw new Error("Account not found for client");
  }

  // Step 3: Update the appropriate balance based on deposit type
  let balanceUpdate = {};

  if (deposit_type === "Bitcoin") {
    balanceUpdate = { bitcoin_balance: accounts.bitcoin_balance + amount };
  } else if (deposit_type === "Fiat") {
    balanceUpdate = { fiat_balance: accounts.fiat_balance + amount };
  } else {
    throw new Error("Invalid deposit type");
  }

  const { error: balanceError } = await supabase
    .from("Accounts")
    .update(balanceUpdate)
    .eq("account_id", accounts.account_id);

  if (balanceError) {
    console.error("Balance update failed: ", balanceError);
    throw new Error("Failed to update account balance");
  }

  // Step 4: Log the transaction in the Payments table
  const { error: paymentError } = await supabase.from("Payments").insert([
    {
      client_id: client_id,
      amount: amount,
      payment_date: new Date(),
      trader_id: trader_id,
    },
  ]);

  if (paymentError) {
    console.error("Payment logging failed: ", paymentError);
    throw new Error("Failed to log payment transaction");
  }

  console.log("Deposit successful");
  return true;
}

export async function getClientBalance(client_id) {
  const supabase = createServerClient();
  const { data: balance, error } = await supabase
    .from("Accounts")
    .select("fiat_balance, bitcoin_balance")
    .eq("client_id", client_id);

  return balance[0];
}

export async function createTransaction(
  clientId,
  traderId,
  transactionType,
  fiatAmount,
  bitcoinAmount,
  commission,
  commissionType
) {
  const supabase = createServerClient();
  // Insert into the Transactions table
  commissionType = commissionType.includes("Fiat") ? "Fiat" : "Bitcoin";
  const { data: transactionData, error: transactionError } = await supabase
    .from("Transactions")
    .insert([
      {
        client_id: clientId,
        trader_id: traderId,
        fiat_amount: fiatAmount,
        bitcoin_amount: bitcoinAmount,
        commission,
        commission_type: commissionType,
        date: new Date(),
      },
    ])
    .select();

  if (transactionError) {
    console.error("Error creating transaction:", transactionError.message);
    return;
  }

  console.log("Transaction created:", transactionData);

  const accountData = await getClientBalance(clientId);

  const updatedFiatBalance = accountData.fiat_balance - fiatAmount;

  const updatedBitcoinBalance = accountData.bitcoin_balance - bitcoinAmount;

  const { data: accId, error } = await supabase
    .from("Accounts")
    .select("account_id")
    .eq("client_id", clientId);

  // Update the account balance
  const { error: updateError } = await supabase
    .from("Accounts")
    .update({
      fiat_balance: updatedFiatBalance,
      bitcoin_balance: updatedBitcoinBalance,
    })
    .eq("account_id", accId[0].account_id);
  console.log("accid: ", accId);
  if (updateError) {
    console.error("Error updating account:", updateError.message);
  } else {
    console.log("Account updated successfully");
  }
}

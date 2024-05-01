"use client";

import Input from "@/app/_components/input";
import { clientInfoReducer, initialState } from "@/app/_reducers/client";
import { useEffect, useReducer, useState } from "react";
import Button from "../_components/button";
import { useRouter } from "next/navigation";
import { createUser } from "../_slices/user-slice";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../_components/dropdown";
import { updateAccountType } from "../_slices/account-slice";
import { updateTradingUser } from "../_slices/currently-trading-user-slice";
import {createBTCClient, loginClient, getAllTraders} from "../utils/supabase/dbcalls";
import { ToastContainer, toast } from "react-toastify";


export default function Home() {
  const [clientInfo, clientInfoDispatch] = useReducer(
    clientInfoReducer,
    initialState
  );
  const accountType = useSelector((state) => state.account.accountType);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSignInState, setIsSignInState] = useState(accountType === "Manager");
  const [selectedTrader, setSelectedTrader] = useState(null); // {id, title}
  const [traders, setTraders] = useState([]); // Dynamic list of traders

  // Fetch traders from the database
  useEffect(() => {
    const fetchTraders = async () => {
      let fetchedTraders = await getAllTraders();
      fetchedTraders= fetchedTraders.map(t => ({ key: t.trader_id, id: t.trader_id, title: `${t.first_name} ${t.last_name}` }))
      setTraders(fetchedTraders); // Format the fetched traders
    };

    fetchTraders();
  }, []);
  const signUpUser = async () => {

    // Helper function to check if a value is a non-empty string
    const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

    // Helper function to sanitize strings by trimming whitespace
    const sanitizeString = (value) => typeof value === 'string' ? value.trim() : value;

    // Sanitize all fields
    clientInfo.lastName = sanitizeString(clientInfo.lastName);
    clientInfo.phoneNumber = sanitizeString(clientInfo.phoneNumber);
    clientInfo.cellPhoneNumber = sanitizeString(clientInfo.cellPhoneNumber);
    clientInfo.email = sanitizeString(clientInfo.email);
    clientInfo.streetAddress = sanitizeString(clientInfo.streetAddress);
    clientInfo.city = sanitizeString(clientInfo.city);
    clientInfo.state = sanitizeString(clientInfo.state);
    clientInfo.zipCode = sanitizeString(clientInfo.zipCode);
    clientInfo.password = sanitizeString(clientInfo.password);

    // Check if all fields are filled in and are valid strings
    if (!isNonEmptyString(clientInfo.lastName)) {
        toast.error("Error: Last name is missing or invalid.");
        // Replace this with a toast notification or other UI action
        return false;
    }

    if (!isNonEmptyString(clientInfo.phoneNumber)) {
        toast.error("Error: Phone number is missing or invalid.");
        return false;
    }

    if (!isNonEmptyString(clientInfo.cellPhoneNumber)) {
        toast.error("Error: Cell phone number is missing or invalid.");
        return false;
    }

    if (!isNonEmptyString(clientInfo.email)) {
        toast.error("Error: Email is missing or invalid.");
        return false;
    }

    if (!isNonEmptyString(clientInfo.streetAddress)) {
        toast.error("Error: Street address is missing or invalid.");
        return false;
    }

    if (!isNonEmptyString(clientInfo.city)) {
        toast.error("Error: City is missing or invalid.");
        return false;
    }

    if (!isNonEmptyString(clientInfo.state)) {
        toast.error("Error: State is missing or invalid.");
        return false;
    }

    if (!isNonEmptyString(clientInfo.zipCode)) {
        toast.error("Error: Zip code is missing or invalid.");
        return false;
    }

    if (!isNonEmptyString(clientInfo.password)) {
        toast.error("Error: Password is missing or invalid.");
        return false;
    }



    let client_id;
    if(accountType === "Client"){
      client_id = await createBTCClient(clientInfo.firstName,
        clientInfo.lastName,
        clientInfo.phoneNumber,
        clientInfo.cellPhoneNumber,
        clientInfo.email,
        clientInfo.streetAddress,
        clientInfo.city,
        clientInfo.state,
        clientInfo.zipCode,
        clientInfo.password,
        selectedTrader.id)
    }else{
      client_id = await createBTCClient(clientInfo.firstName,
        clientInfo.lastName,
        clientInfo.phoneNumber,
        clientInfo.cellPhoneNumber,
        clientInfo.email,
        clientInfo.streetAddress,
        clientInfo.city,
        clientInfo.state,
        clientInfo.zipCode,
        clientInfo.password,
        "")
    }
     

    const obj = {firstName:clientInfo.firstName ,
      lastName: clientInfo.lastName,
      phoneNumber: clientInfo.phoneNumber,
      cellPhoneNumber:clientInfo.cellPhoneNumber ,
      email: clientInfo.email,
      streetAddress: clientInfo.streetAddress,
      city: clientInfo.city,
      state: clientInfo.state,
      zipCode: clientInfo.zipCode,
      password: clientInfo.password,
      id: client_id}

    // console.log("Test!: ", testing)
    dispatch(createUser({ ...obj, traderInfo: selectedTrader }));

    if (accountType === "Client") {
      dispatch(
        updateTradingUser({
          ...obj,
          traderInfo: selectedTrader,
          bitcoin: 9999,
        })
      ); // User that we are trading with in the trade page

      router.push("/trade");
    } else {
      router.push("/trader");
    }
  };

  const signInUser = async () => {
    const signedInUser = await loginClient(clientInfo.email, clientInfo.password, accountType)

    // console.log("sigiend in user: ", signed)
    if(signedInUser === false){
      toast.error("Wrong email or password. Try again")
    }
    console.log("user? ", signedInUser)

    

    if (accountType === "Client") {
      dispatch(updateTradingUser(signedInUser)); // User that we are trading with in the trade page

      router.push("/trade");
    } else if (accountType==="Manager") {
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
      router.push("/manager")
    }else{
      dispatch(createUser(signedInUser)); // User that is signed in
      router.push("/trader");
    }
  };

  if (isSignInState) {
    return (
      <div className="flex flex-col justify-around items-center w-screen h-screen p-4">
        <h1 className="text-4xl font-bold w-[80%]">Sign In</h1>
        <div className="grid grid-rows-2 grid-cols-2 gap-y-6 w-[80%]">
          <Input
            title="Email Address"
            value={clientInfo.email}
            setValue={(email) =>
              clientInfoDispatch({
                type: "UPDATE",
                payload: { email },
              })
            }
          />
          <Input
            type="password"
            title="Password"
            value={clientInfo.password}
            setValue={(password) =>
              clientInfoDispatch({
                type: "UPDATE",
                payload: { password },
              })
            }
          />
          <div className="flex flex-col gap-y-4 col-span-full">
            <Button
              className="col-span-full w-max justify-self-end"
              onClick={signInUser}
            >
              Sign In
            </Button>
            {accountType !== "Manager" && (
              <div>
                New to Bitcoin Trading Project?{" "}
                <span
                  className="text-blue-500 hover:text-blue-600 hover:underline cursor-pointer"
                  onClick={() => setIsSignInState(false)}
                >
                  Sign Up
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-around items-center w-screen h-screen p-4">
      <h1 className="text-4xl font-bold w-[80%]">
        Create {accountType} Account
      </h1>
      <div className="grid grid-rows-4 grid-cols-2 gap-y-6 w-[80%]">
        <Input
          title="First Name"
          value={clientInfo.firstName}
          setValue={(firstName) =>
            clientInfoDispatch({ type: "UPDATE", payload: { firstName } })
          }
        />
        <Input
          title="Last Name"
          value={clientInfo.lastName}
          setValue={(lastName) =>
            clientInfoDispatch({
              type: "UPDATE",
              payload: { lastName },
            })
          }
        />
        <Input
          title="Phone Number"
          value={clientInfo.phoneNumber}
          setValue={(phoneNumber) =>
            clientInfoDispatch({
              type: "UPDATE",
              payload: { phoneNumber },
            })
          }
        />
        <Input
          title="Cell Phone Number"
          value={clientInfo.cellPhoneNumber}
          setValue={(cellPhoneNumber) =>
            clientInfoDispatch({
              type: "UPDATE",
              payload: { cellPhoneNumber },
            })
          }
        />
        <Input
          title="Email Address"
          value={clientInfo.email}
          setValue={(email) =>
            clientInfoDispatch({
              type: "UPDATE",
              payload: { email },
            })
          }
        />
        <Input
          title="Street Address"
          value={clientInfo.streetAddress}
          setValue={(streetAddress) =>
            clientInfoDispatch({
              type: "UPDATE",
              payload: { streetAddress },
            })
          }
        />
        <Input
          title="City"
          value={clientInfo.city}
          setValue={(city) =>
            clientInfoDispatch({
              type: "UPDATE",
              payload: { city },
            })
          }
        />
        <Input
          title="State"
          value={clientInfo.state}
          setValue={(state) =>
            clientInfoDispatch({
              type: "UPDATE",
              payload: { state },
            })
          }
        />
        <Input
          title="Zip Code"
          value={clientInfo.zipCode}
          setValue={(zipCode) =>
            clientInfoDispatch({
              type: "UPDATE",
              payload: { zipCode },
            })
          }
        />
        <Input
          title="Password"
          value={clientInfo.password}
          setValue={(password) =>
            clientInfoDispatch({
              type: "UPDATE",
              payload: { password },
            })
          }
        />
        {accountType === "Client" && (
          <div className="flex flex-col gap-y-2">
            <div className="font-bold text-xl">Select Trader</div>
            <Dropdown
              options={traders}
              selectedValue={selectedTrader}
              setSelectedValue={setSelectedTrader}
            />
          </div>
        )}
        <div className="flex flex-col gap-y-4 col-span-full">
          <Button className=" w-max justify-self-end" onClick={signUpUser}>
            Create Account
          </Button>
          <div>
            Already Have an Account?{" "}
            <span
              className="text-blue-500 hover:text-blue-600 hover:underline cursor-pointer"
              onClick={() => setIsSignInState(true)}
            >
              Log In
            </span>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
}

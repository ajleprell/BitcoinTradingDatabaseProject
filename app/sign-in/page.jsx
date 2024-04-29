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

const EXISTING_TRADERS = [
  {
    id: 1,
    title: "John Doe",
  },
  {
    id: 2,
    title: "Jane Doe",
  },
  {
    id: 3,
    title: "John Smith",
  },
  {
    id: 4,
    title: "Jane Smith",
  },
  {
    id: 5,
    title: "John Johnson",
  },
  {
    id: 6,
    title: "Jane Johnson",
  },
  {
    id: 7,
    title: "John Brown",
  },
  {
    id: 8,
    title: "Jane Brown",
  },
  {
    id: 9,
    title: "John White",
  },
  {
    id: 10,
    title: "Jane White",
  },
];

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

  const signUpUser = async () => {
    // sign up user here

    dispatch(createUser({ ...clientInfo, traderInfo: selectedTrader }));

    if (accountType === "Client") {
      router.push("/trade");
    } else {
      router.push("/trader");
    }
  };

  const signInUser = async () => {
    const signInUserInfo = {
      email: clientInfo.email,
      password: clientInfo.password,
    };

    // sign in user here
    // Add Dummy Data
    const signedInUser = {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890",
      cellPhoneNumber: "1234567890",
      email: "asd@gmail.com",
      streetAddress: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      bitcoin: 9999,
      traderInfo: {
        id: 1,
        title: "Steve Smith",
      },
    };

    dispatch(createUser(signedInUser));
    dispatch(updateAccountType(accountType));

    if (accountType === "Client") {
      router.push("/trade");
    } else {
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
              options={EXISTING_TRADERS}
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
    </div>
  );
}
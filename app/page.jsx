"use client";

import Input from "@/app/_components/input";
import { clientInfoReducer, initialState } from "@/app/_reducers/client";
import { useReducer } from "react";
import Button from "./_components/button";
import { useRouter } from "next/navigation";
import { createUser } from "./_slices/user-slice";
import { useDispatch } from "react-redux";

export default function Home() {
  const [clientInfo, clientInfoDispatch] = useReducer(
    clientInfoReducer,
    initialState
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const signInUser = async () => {
    // sign in user here

    dispatch(createUser(clientInfo));

    router.push("/trade");
  };

  return (
    <div className="flex flex-col justify-around items-center w-screen h-screen p-4">
      <h1 className="text-4xl font-bold w-[80%]">Create Client Account</h1>
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
        <Button onClick={signInUser}>Create Account</Button>
      </div>
    </div>
  );
}

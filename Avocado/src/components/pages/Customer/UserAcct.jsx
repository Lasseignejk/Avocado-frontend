import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setOwner, setCustomer } from "../../reducers/DashboardSlice";
import CustomerNavBar from "../../Layout/CustomerNavBar";

const UserAcct = () => {
  const userDetails = useSelector((state) => state?.userDetails[0]);
  const dispatch = useDispatch();

  const [updateDetails, setupdateDetails] = useState({});

  const setFormState = (e) => {
    setupdateDetails({
      ...updateDetails,
      [e.target.name]: e.target.value,
      id: userDetails.id,
    });
  };

  const updateUserAccount = async (updateDetails) => {
    const data = await fetch("http://localhost:3060/customer/updateCust", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateDetails),
    });
  };

  return (
    <div className="mb-[55px] md:flex md:mb-0">
      <CustomerNavBar />
      <div className="flex flex-col gap-10 pt-3 md:w-full md:px-16 md:pt-20">
        <div className="flex flex-col gap-3">
          <h1 className="text-center text-4xl font-bold text-green md:text-left">
            {userDetails.CustomerFirstName}'s Account Details
          </h1>
        </div>
        <div className="flex justify-center">
          <form className="px-3 flex flex-col gap-3 mb-3 items-center w-full md:w-1/2 md:mb-5">
            <h1 className="text-2xl font-bold text-center">Update Account</h1>

            <div className="flex flex-col w-full">
              <label className="font-bold" htmlFor="firstName">
                First Name
              </label>
              <input
                className="pl-3"
                type="text"
                id="firstName"
                name="CustomerFirstName"
                placeholder={userDetails.CustomerFirstName}
                onChange={(e) => setFormState(e)}
                value={
                  updateDetails.CustomerFirstName
                    ? updateDetails.CustomerFirstName
                    : ""
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="font-bold" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="pl-3"
                type="text"
                id="lastName"
                name="CustomerLastName"
                placeholder={userDetails.CustomerLastName}
                onChange={(e) => setFormState(e)}
                value={
                  updateDetails.CustomerLastName
                    ? updateDetails.CustomerLastName
                    : ""
                }
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="font-bold" htmlFor="phone">
                Phone Number
              </label>
              <input
                className="pl-3"
                type="text"
                id="phone"
                name="CustomerPhoneNumber"
                placeholder={userDetails.CustomerPhoneNumber}
                onChange={(e) => setFormState(e)}
                value={
                  updateDetails.CustomerPhoneNumber
                    ? updateDetails.CustomerPhoneNumber
                    : ""
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="font-bold" htmlFor="address">
                Address
              </label>
              <input
                className="pl-3"
                type="address"
                id="address"
                name="Address"
                placeholder={userDetails.Address}
                onChange={(e) => setFormState(e)}
                value={updateDetails.Address ? updateDetails.Address : ""}
              />
            </div>

            <div className="flex justify-center">
              <button
                className="bg-green text-gray text-lg px-5 py-1 duration-200 font-bold hover:bg-dkgreen"
                type="button"
                onClick={() => updateUserAccount(updateDetails)}
              >
                Submit Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserAcct;

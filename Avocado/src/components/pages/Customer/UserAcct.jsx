import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setOwner, setCustomer } from "../../reducers/DashboardSlice";
import CustomerNavBar from "../../Layout/CustomerNavBar";

const UserAcct = () => {
  const userDetails = useSelector((state) => state?.userDetails[0]);
  const dispatch = useDispatch();
  console.log(userDetails);

  const [updateDetails, setupdateDetails] = useState({});

  const setFormState = (e) => {
    setupdateDetails({
      ...updateDetails,
      [e.target.name]: e.target.value,
      id: userDetails.id,
    });
  };

  const updateUserAccount = async (updateDetails) => {
    console.log(updateDetails);
    const data = await fetch("http://localhost:3060/customer/updateCust", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateDetails),
    });
    console.log(data);
  };

  return (
    <div className="mb-[55px] md:flex md:mb-0">
      <CustomerNavBar />
      <div>
        <div>
          {userDetails.CustomerFirstName}
          {userDetails.CustomerLastName}
          {userDetails.CustomerPhoneNumber}
          {userDetails.Address}
        
        </div>
        <form>
          <h1>User Account</h1>

          <div>
            <label htmlFor="lastName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="CustomerFirstName"
              onChange={(e) => setFormState(e)}
              value={
                updateDetails.CustomerFirstName
                  ? updateDetails.CustomerFirstName
                  : ""
              }
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="CustomerLastName"
              onChange={(e) => setFormState(e)}
              value={
                updateDetails.CustomerLastName
                  ? updateDetails.CustomerLastName
                  : ""
              }
            />
          </div>

          <div>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="CustomerPhoneNumber"
              onChange={(e) => setFormState(e)}
              value={
                updateDetails.CustomerPhoneNumber
                  ? updateDetails.CustomerPhoneNumber
                  : ""
              }
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="address"
              id="address"
              name="Address"
              onChange={(e) => setFormState(e)}
              value={updateDetails.Address ? updateDetails.Address : ""}
            />
          </div>

          <div>
            <button
              type="button"
              onClick={() => updateUserAccount(updateDetails)}
            >
              Update Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAcct;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminNavBar from "../partials/AdminNavBar";

const Admin = () => {
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
    console.log(updateDetails);
    const data = await fetch("http://localhost:3060/admin/updateAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateDetails),
    });
    
  };

  return (
    <div className="mb-[55px] md:flex md:mb-0">
      <AdminNavBar />
      <div>
        <div className="" >
          {userDetails.OwnerFirstName}
          {userDetails.OwnerLastName}
          {userDetails.OwnerPhoneNumber}
        </div>
        <form>
          <h1>Admin Account</h1>

          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="OwnerFirstName"
              onChange={(e) => setFormState(e)}
              value={
                updateDetails.OwnerFirstName ? updateDetails.OwnerFirstName : ""
              }
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="OwnerLastName"
              onChange={(e) => setFormState(e)}
              value={
                updateDetails.OwnerLastName ? updateDetails.OwnerLastName : ""
              }
            />
          </div>

          <div>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="OwnerPhoneNumber"
              onChange={(e) => setFormState(e)}
              value={
                updateDetails.OwnerPhoneNumber
                  ? updateDetails.OwnerPhoneNumber
                  : ""
              }
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

export default Admin;

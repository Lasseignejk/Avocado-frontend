import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserDetails,
  setLogOut,
  setGuest,
} from "../reducers/DashboardSlice";
import { useNavigate } from "react-router-dom";

//Customer hooks for querying supabase for specific rows

//hook to search for email in  customer/owner database

export function useSignOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return async () => {
    dispatch(setLogOut());
    localStorage.clear();
    let { error } = await supabase.auth.signOut();
    dispatch(setGuest(true));
    return navigate("/");
  };
}

export function useUserData() {
  const dispatch = useDispatch();

  const isCustomer = useSelector((state) => state.isCustomer);
  const userDetails = useSelector((state) => state.userDetails);
  const userEmail = useSelector((state) => state.userEmail);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from(isCustomer ? "Customer" : "Owner")
        .select()
        .eq(isCustomer ? "CustomerEmail" : "OwnerEmail", userEmail);

      if (error) {
        setError(error);
        return;
      }
      if (data) {
        dispatch(setUserDetails(data));
        console.log("userdetails", data);
      }
    };
    if (userEmail) {
      fetchUserData();
    }
  }, [userEmail, isCustomer]);

  return { data: userDetails, error };
}

//hook to search for user in  customer/owner database
export async function queryIsOwner(email) {
  const { data: CustomerData, error: CustomerError } = await supabase
    .from("Customer")
    .select()
    .eq("CustomerEmail", email);

  const { data: OwnerData, error: OwnerError } = await supabase
    .from("Owner")
    .select()
    .eq("OwnerEmail", email);

  if (CustomerData.length > 0 && OwnerData.length == 0) {
    return false;
  }
  if (OwnerData.length > 0 && CustomerData.length == 0) {
    return true;
  }
}

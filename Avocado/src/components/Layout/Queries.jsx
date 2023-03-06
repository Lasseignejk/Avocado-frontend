import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../reducers/DashboardSlice";

//Customer hooks for querying supabase for specific rows

//hook to search for email in  customer/owner database
export function useUserData() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  const isCustomer = useSelector((state) => state.isCustomer);
  const userDetails = useSelector((state) => state.userDetails);

  const [error, setError] = useState(null);

  //parsing email
  const userEmail = token[0]?.user?.email;

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
      }
    };
    if (userEmail) {
      fetchUserData();
    }
  }, [userEmail]);

  return { data: userDetails, error };
}

//hook to search for user in  customer/owner database
export async function queryIsOwner(userEmail) {
  const { data: CustomerData, error: CustomerError } = await supabase
    .from("Customer")
    .select()
    .eq("CustomerEmail", userEmail);

  const { data: OwnerData, error: OwnerError } = await supabase
    .from("Owner")
    .select()
    .eq("OwnerEmail", userEmail);

  if (CustomerData.length > 0 && OwnerData.length == 0) {
    return false;
  }
  if (OwnerData.length > 0 && CustomerData.length == 0) {
    return true;
  }
}

/*
//hook to search for menu items by restaurant id in menuitems database
export function useMenuData() {
  const [data, setUserData] = useState(null);
  const [error, setError] = useState(null);

  //grabs userdetails in state
  const userDetails = useSelector((state) => state.dashboard.userDetails);

  //grabs id from state
  const id = userDetails[0]?.user?.id;

  useEffect(() => {
    const fetchMenubyRestaurant = async () => {
      const { data, error } = await supabase
        .from("MenuItems")
        .select()
        .eq("RestId", id);

      if (error) {
        setError(error);
        return;
      }
      if (data) {
        setUserData(data);
      }
    };
    fetchMenubyRestaurant();
  }, [id]);

  return { data, error };
}

*/

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

//hook to search for email in  customer/owner database
export function useUserData() {
  const userDetails = useSelector((state) => state.dashboard.userDetails);
  const isCustomer = useSelector((state) => state.dashboard.isCustomer);

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  //parsing email
  const userEmail = userDetails[0]?.user?.email;

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
        setUserData(data);
      }
    };
    if (userEmail) {
      fetchUserData();
    }
  }, [userEmail]);

  return { data: userData, error };
}

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

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  menu: [],
};

export const fetchMenu = createAsyncThunk("displaymenu", async () => {
  const response = await client.get("http://localhost:3060/displaymenu");
  return response.data;
});

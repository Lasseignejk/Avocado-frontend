import React from "react";
import { supabase } from "../../../../supabase";
import "../ManageRestaurants.css";

const UpdateMenuItem = ({ item, setOpenModal }) => {
  console.log(item);
  return (
    <div className="w-[300] h-fit m-2">
      <button
        className="bg-green text-gray px-1"
        onClick={() => setOpenModal(false)}
      >
        X
      </button>
      <h1 className="font-bold">Edit Item</h1>
      <form action="" className="flex flex-col gap-2">
        <label htmlFor="input1">First</label>
        <input name="input1" type="text" placeholder="textinput" />
        <label htmlFor="input2">Second</label>
        <input name="input2" type="text" placeholder="textinput" />
      </form>
    </div>
  );
};

export default UpdateMenuItem;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../ManageRestaurants.css";

const UpdateMenuItem = ({ item, setOpenModal }) => {
  const [updateItem, setUpdateItem] = useState({});
  const restaurantId = useSelector((state) => state.currentRestaurant[0]);
  console.log("restaurant id: ", restaurantId);

  const setFormState = (e) => {
    setUpdateItem({
      ...updateItem,
      [e.target.name]: e.target.value,
    });
  };

  const [breakfast, setBreakfast] = useState(false);
  const toggleBreakfast = () => {
    setBreakfast(!breakfast);
  };
  const [lunch, setLunch] = useState(false);
  const toggleLunch = () => {
    setLunch(!lunch);
  };
  const [dinner, setDinner] = useState(false);
  const toggleDinner = () => {
    setDinner(!dinner);
  };
  const [available, setAvailable] = useState(false);
  const toggleAvailable = () => {
    setAvailable(!available);
  };
  const [popular, setPopular] = useState(false);
  const togglePopular = () => {
    setPopular(!popular);
  };

  const sendItemUpdate = async () => {
    const dataTosend = {
      ...updateItem,
      ItemBreakfast: breakfast,
      ItemIsPopular: popular,
      ItemAvailable: available,
      ItemDinner: dinner,
      ItemLunch: lunch,
      RestId: restaurantId,
      id: item.id,
    };
    console.log("Data to send: ", dataTosend);
    const data = await fetch(
      import.meta.env.VITE_BACKEND + "/admin/restaurant/updatemenuitem",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataTosend),
      }
    );
    console.log("UPDATE: ", data);
  };

  return (
    <div className="w-[300px] h-fit bg-gray flex flex-col items-center p-5 gap-10">
      <button
        className="bg-green text-gray px-1"
        onClick={() => setOpenModal(false)}
      >
        Close
      </button>
      <form className="flex flex-col gap-5 font-niveau font-bold">
        <h1>Edit Item</h1>
        <div className="flex flex-col">
          <label htmlFor="ItemName">Item</label>
          <input
            type="text"
            id="ItemName"
            name="ItemName"
            onChange={(e) => setFormState(e)}
            value={updateItem.ItemName ? updateItem.ItemName : ""}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ItemType">Item Type</label>
          <input
            type="text"
            id="ItemType"
            name="ItemType"
            onChange={(e) => setFormState(e)}
            value={updateItem.ItemType ? updateItem.ItemType : ""}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ItemPrice">Price</label>
          <input
            type="text"
            id="ItemPrice"
            name="ItemPrice"
            onChange={(e) => setFormState(e)}
            value={updateItem.ItemPrice ? updateItem.ItemPrice : ""}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ItemDescription">Item Description</label>
          <input
            type="textarea"
            id="ItemDescription"
            name="ItemDescription"
            onChange={(e) => setFormState(e)}
            value={updateItem.ItemDescription ? updateItem.ItemDescription : ""}
          />
        </div>
        <div className="flex flex-row gap-6">
          <div className="flex gap-2">
            <label htmlFor="ItemBreakfast">Breakfast</label>
            <input
              type="checkbox"
              id="ItemBreakfast"
              name="ItemBreakfast"
              checked={breakfast}
              onChange={toggleBreakfast}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="ItemLunch">Lunch</label>
            <input
              type="checkbox"
              id="ItemLunch"
              name="ItemLunch"
              checked={lunch}
              onChange={toggleLunch}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="ItemDinner">Dinner</label>
            <input
              type="checkbox"
              id="ItemDinner"
              name="ItemDinner"
              checked={dinner}
              onChange={toggleDinner}
            />
          </div>
        </div>
        <div className="flex flex-row gap-6">
          <div className="flex gap-2">
            <label htmlFor="ItemAvailable">Available?</label>
            <input
              type="checkbox"
              id="ItemAvailable"
              name="ItemAvailable"
              checked={available}
              onChange={toggleAvailable}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="ItemIsPopular">Popular?</label>
            <input
              type="checkbox"
              id="ItemIsPopular"
              name="ItemIsPopular"
              checked={popular}
              onChange={togglePopular}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="ItemCookTime">Cooking Time</label>
          <input
            type="text"
            id="ItemCookTime"
            name="ItemCookTime"
            onChange={(e) => setFormState(e)}
            value={updateItem.ItemCookTime ? updateItem.ItemCookTime : ""}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ItemImg">Item image URL</label>
          <input
            type="text"
            id="ItemImg"
            name="ItemImg"
            onChange={(e) => setFormState(e)}
            value={updateItem.ItemImg ? updateItem.ItemImg : ""}
          />
        </div>
        <div className="flex justify-between px-10">
          <button
            className="bg-green text-gray tracking-widest py-1 px-2"
            type="button"
            onClick={() => sendItemUpdate()}
          >
            UPDATE
          </button>
          <button
            className="bg-green text-gray tracking-widest py-1 px-2"
            type="button"
            onClick={() => console.log("delete item")}
          >
            DELETE
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMenuItem;

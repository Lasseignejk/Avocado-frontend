import React, { useState } from "react";
import { useSelector } from "react-redux";

const RestaurantAddMenuItemForm = () => {
  const [newItem, setNewItem] = useState({});

  const restaurantId = useSelector((state) => state.currentRestaurant[0]);
  console.log("restaurant id: ", restaurantId);

  ///previously new menu item

  // * expected behavior *
  //Allows admin to edit menu item

  /*
  To do:
  Grab specific menu item (fronm front/backend?) and inject update into backend
  */

  // const [check, setCheck] = useState({
  //   ItemBreakfast: false,
  //   ItemLunch: false,
  //   ItemDinner: false,
  //   ItemAvailable: false,
  //   ItemIsPopular: false,
  // });

  // const setChecked = (e) => {
  //   const value = newItem[e.target.name];
  //   setCheck({
  //     ...check,
  //     [e.target.name]: !value,
  //   });
  // };

  const setFormState = (e) => {
    setNewItem({
      ...newItem,
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

  const sendToSupabase = async () => {
    const dataTosend = {
      ...newItem,
      ItemBreakfast: breakfast,
      ItemIsPopular: popular,
      ItemAvailable: available,
      ItemDinner: dinner,
      ItemLunch: lunch,
      RestId: restaurantId,
    };
    console.log(dataTosend);
    const data = await fetch(
      import.meta.env.VITE_BACKEND + "/admin/restaurant/addtomenu",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataTosend),
      }
    );
    console.log("data from front", data);
  };

  return (
    <div className="w-[300px] h-fit bg-gray flex flex-col items-center p-5 gap-10">
      <form className="flex flex-col gap-5 font-niveau font-bold">
        <h1>New Item</h1>
        <div className="flex flex-col">
          <label htmlFor="ItemName">Item</label>
          <input
            type="text"
            id="ItemName"
            name="ItemName"
            onChange={(e) => setFormState(e)}
            value={newItem.ItemName ? newItem.ItemName : ""}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ItemType">Item Type</label>
          <input
            type="text"
            id="ItemType"
            name="ItemType"
            onChange={(e) => setFormState(e)}
            value={newItem.ItemType ? newItem.ItemType : ""}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ItemPrice">Price</label>
          <input
            type="text"
            id="ItemPrice"
            name="ItemPrice"
            onChange={(e) => setFormState(e)}
            value={newItem.ItemPrice ? newItem.ItemPrice : ""}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ItemDescription">Item Description</label>
          <input
            type="textarea"
            id="ItemDescription"
            name="ItemDescription"
            onChange={(e) => setFormState(e)}
            value={newItem.ItemDescription ? newItem.ItemDescription : ""}
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
            value={newItem.ItemCookTime ? newItem.ItemCookTime : ""}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ItemImg">Item image URL</label>
          <input
            type="text"
            id="ItemImg"
            name="ItemImg"
            onChange={(e) => setFormState(e)}
            value={newItem.ItemImg ? newItem.ItemImg : ""}
          />
        </div>
        <div>
          <button
            className="bg-green text-gray tracking-widest py-1 px-2"
            type="button"
            onClick={() => sendToSupabase()}
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default RestaurantAddMenuItemForm;

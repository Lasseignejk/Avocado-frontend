import React, { useState } from "react";

const NewMenuItem = () => {
  const [newItem, setNewItem] = useState({});

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
    };
    console.log(dataTosend);
    const data = await fetch("http://localhost:3060/addtomenu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataTosend),
    });
    console.log(data);
  };

  return (
    <div>
      <form>
        <h1>New Item</h1>
        <div>
          <label htmlFor="ItemName">Item</label>
          <input
            type="text"
            id="ItemName"
            name="ItemName"
            onChange={(e) => setFormState(e)}
            value={newItem.ItemName ? newItem.ItemName : ""}
          />
        </div>
        <div>
          <label htmlFor="ItemType">Item Type</label>
          <input
            type="text"
            id="ItemType"
            name="ItemType"
            onChange={(e) => setFormState(e)}
            value={newItem.ItemType ? newItem.ItemType : ""}
          />
        </div>
        <div>
          <label htmlFor="ItemPrice">Price</label>
          <input
            type="text"
            id="ItemPrice"
            name="ItemPrice"
            onChange={(e) => setFormState(e)}
            value={newItem.ItemPrice ? newItem.ItemPrice : ""}
          />
        </div>
        <div>
          <label htmlFor="ItemDescription">Item Description</label>
          <input
            type="textarea"
            id="ItemDescription"
            name="ItemDescription"
            onChange={(e) => setFormState(e)}
            value={newItem.ItemDescription ? newItem.ItemDescription : ""}
          />
        </div>
        <div>
          <div>
            <label htmlFor="ItemBreakfast">Breakfast</label>
            <input
              type="checkbox"
              id="ItemBreakfast"
              name="ItemBreakfast"
              checked={breakfast}
              onChange={toggleBreakfast}
            />
          </div>
          <div>
            <label htmlFor="ItemLunch">Lunch</label>
            <input
              type="checkbox"
              id="ItemLunch"
              name="ItemLunch"
              checked={lunch}
              onChange={toggleLunch}
            />
          </div>
          <div>
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
        <div>
          <div>
            <label htmlFor="ItemAvailable">Available?</label>
            <input
              type="checkbox"
              id="ItemAvailable"
              name="ItemAvailable"
              checked={available}
              onChange={toggleAvailable}
            />
          </div>
          <div>
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
        <div>
          <label htmlFor="ItemCookTime">Cooking Time</label>
          <input
            type="text"
            id="ItemCookTime"
            name="ItemCookTime"
            onChange={(e) => setFormState(e)}
            value={newItem.ItemCookTime ? newItem.ItemCookTime : ""}
          />
        </div>
        <div>
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
            type="button"
            onClick={() => sendToSupabase(newItem, breakfast)}
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewMenuItem;

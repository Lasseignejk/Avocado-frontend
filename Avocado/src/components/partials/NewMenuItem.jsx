import React, { useState } from "react";

const NewMenuItem = () => {
  const [newItem, setNewItem] = useState({});

  const setFormState = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };

  const sendToSupabase = async (newItem) => {
    const data = await fetch("http://localhost:3060/addmenuitem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    console.log(newItem);
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
              onChange={(e) => setFormState(e)}
              value={newItem.ItemBreakfast ? newItem.ItemBreakfast : ""}
            />
          </div>
          <div>
            <label htmlFor="ItemLunch">Lunch</label>
            <input
              type="checkbox"
              id="ItemLunch"
              name="ItemLunch"
              onChange={(e) => setFormState(e)}
              value={newItem.ItemLunch ? newItem.ItemLunch : ""}
            />
          </div>
          <div>
            <label htmlFor="ItemDinner">Dinner</label>
            <input
              type="checkbox"
              id="ItemDinner"
              name="ItemDinner"
              onChange={(e) => setFormState(e)}
              value={newItem.ItemDinner ? newItem.ItemDinner : ""}
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
              onChange={(e) => setFormState(e)}
              value={newItem.ItemAvailable ? newItem.ItemAvailable : ""}
            />
          </div>
          <div>
            <label htmlFor="ItemIsPopular">Popular?</label>
            <input
              type="checkbox"
              id="ItemIsPopular"
              name="ItemIsPopular"
              onChange={(e) => setFormState(e)}
              value={newItem.ItemIsPopular ? newItem.ItemIsPopular : ""}
            />
          </div>
        </div>
        <div>
          <label htmlFor="ItemCookTime">Cooking Time</label>
          <input
            type="ItemCookTime"
            id="ItemCookTime"
            name="ItemCookTime"
            onChange={(e) => setFormState(e)}
            value={newItem.ItemCookTime ? newItem.ItemCookTime : ""}
          />
        </div>
        <div>
          <label htmlFor="ItemImg">Item image URL</label>
          <input
            type="ItemImg"
            id="ItemImg"
            name="ItemImg"
            onChange={(e) => setFormState(e)}
            value={newItem.ItemImg ? newItem.ItemImg : ""}
          />
        </div>
        <div>
          <button type="button" onClick={() => sendToSupabase(newItem)}>
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewMenuItem;

import React from "react";

const CustomerMenuItem = (item) => {
  //previously menu item

  // * expected behavior *
  //showcases the specific menu item details pulled from backend

  /*
  To do:
  Update button to sent to cart state
  */

  return (
    <div>
      <div>
        <h1>{item.ItemName}</h1>
        <h1>{item.ItemType}</h1>
        <h1>{item.ItemDescription}</h1>
        <h1>{item.ItemPrice}</h1>
      </div>
      <div>
        <img src={item.ItemImg} alt="" />
      </div>
      <div>
        <button>Add to cart</button>
      </div>
    </div>
  );
};

export default CustomerMenuItem;

import React from "react";

const MenuItem = (item) => {
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

export default MenuItem;

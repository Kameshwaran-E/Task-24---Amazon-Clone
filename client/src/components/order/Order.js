import React, { useState } from 'react';
import './Order.css';

const Order = ({ id, items, total, createdAt }) => {
  const [showProducts, setShowProducts] = useState(false);
  return (
    <div className="order">
      <img
        className="order_image"
        src="https://img.freepik.com/free-vector/shopping-cart-realistic_1284-6011.jpg?w=2000"
        alt=""
      />
      <div className="order_info">
        <p className="order_title">Order Id:{id}</p>
        <p className="order_price">
          <small>€</small>
          <strong>{total}</strong>
        </p>
        <div className="order_showProuducts">
          <p>Number of prodect orders:{items.length}</p>
          <button onClick={() => setShowProducts((curr) => !curr)}></button>
          {showProducts ? 'Hide All' : 'Show All'}
        </div>
        <p>
          Order At:{''}
          <strong>{new Date(createdAt).toString().slice(0, 25)}</strong>
          {showProducts && (
            <div className="order_products">
              {items.map((item, index) => {
                return (
                  <div key={index} className="order_product">
                    <img src={item.image} alt="" />
                    <div className="order_productTop">
                      <h4>{item.price}</h4>
                      <p>
                        <small>€</small>
                        <strong>{item.price}</strong>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </p>
      </div>
    </div>
  );
};

export default Order;

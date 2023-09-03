import React, { useEffect, useState } from 'react';
import axios from '../../axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await axios.get('/checkout/orders', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      setOrders(data);
    };

    getOrders();
  }, []);

  console.log(orders);

  return (
    <div className="checkout">
      <div className="checkout_left">
        <img className="checkout_ad" src="" alt="" />
        {orders.length === 0 ? (
          <div>
            <h2>Your Orders is empty</h2>
            <p>You have not made any orders. First make an order.</p>
          </div>
        ) : (
          <div>
            <h2 className="checkout_title">Your Orders</h2>
            {orders.map((order, index) => {
              <Orders
                key={index}
                id={order.order_id}
                items={order.item}
                total={order.total}
                createdAt={order.createdAt}
              />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

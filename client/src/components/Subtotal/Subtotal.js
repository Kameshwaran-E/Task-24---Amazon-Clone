import React, { useEffect, useState } from 'react';
import './Subtotal.css';
import * as CurrencyFormat from 'react-currency-format';

import { useSelector } from 'react-redux';
import { getBasket } from '../../slices/basketSlice';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

const Subtotal = () => {
  const basket = useSelector(getBasket);
  const [basketTotal, setBasketTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getBasketTotal = () => {
      setBasketTotal.basket.reduce((amount, item) => item.price + amount, 0);
    };
    getBasketTotal();
  }, [basket]);

  const handleCheckout = async () => {
    const response = await axios.post(
      '/checkout/create-payment-intent',
      {
        items: basket,
        total: basketTotal,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
    navigate(`/pay/${response.data.clientSecret}`);
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => {
          return (
            <>
              <p>
                Subtotal ({basket.length} items): <strong>{`${value}`}</strong>
              </p>
              <small className="subtotal__gift">
                <input type="checkbox" />
                This order contains a gift
              </small>
            </>
          );
        }}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'₹'}
      />
      <button onClick={handleCheckout}>Proceed to checkout</button>
    </div>
  );
};

export default Subtotal;

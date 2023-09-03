import React from 'react';
import './CheckoutProduct.css';
import { removeFromBasket } from '../../slices/basketSlice';
import { useDispatch } from 'react-redux';

const CheckoutProduct = ({ id, title, image, price, rating }) => {
  const dispatch = useDispatch();
  const remove = () => {
    dispatch(removeFromBasket(id));
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt="" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_) => (
              <span role="img" aria-label="rating">
                ⭐
              </span>
            ))}
        </div>
        <button onClick={remove}>Remove from basket</button>
      </div>
    </div>
  );
};

export default CheckoutProduct;

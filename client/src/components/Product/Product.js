import React from 'react';
import './Product.css';
import { useDispatch } from 'react-redux';

const Product = ({ id, title, image, price, rating }) => {
  const dispatch = useDispatch();
  const addToBas = () => {
    dispatch(
      addToBasket({
        id,
        title,
        image,
        price,
        rating,
      })
    );
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_) => (
              <span role="img" aria-label="rating">
                ⭐
              </span>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToBas}>Add to basket</button>
    </div>
  );
};

export default Product;

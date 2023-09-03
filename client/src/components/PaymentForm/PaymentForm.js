import React, { useEffect, useState } from 'react';
import './PaymentForm.css';

import {
  paymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

const PaymentForm = ({ secretkey }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [clienSecret, setClientSecret] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setClientSecret(secretkey);
  }, [secretkey]);

  useEffect(() => {
    if (!stript) {
      return;
    }
    if (!clienSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clienSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('payment succeeded!');
          break;
        case 'processing':
          setErrorMessage(true);
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setErrorMessage(false);
          setMessage('Your payment was not successful, please try again');
          break;
        default:
          setErrorMessage(true);
          setMessage('Something went wrong');
          break;
      }
    });
  }, [stripe, clienSecret]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const (error) = await stripe.confirmPayment({
        elements,
        confirmParams:{
            return_url:"https://localhost:3000"
        },
    });
    if(error.type === 'card_error' || error.type === 'validation_error'){
        setMessage(error.message);
    }else{
        setMessage("An unexpected error occured.")
    }
    setIsLoading(false)

  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <paymentElement id="payment-element" />
      <button
        className="payment-button"
        disabled={isLoading || !stripe || !elements}
      >
        <span id="payment-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay Now'}
        </span>
      </button>
      {errorMessage && message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default PaymentForm;

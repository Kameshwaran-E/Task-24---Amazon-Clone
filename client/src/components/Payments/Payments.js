import { Navigate, useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../PaymentForm/PaymentForm';
import './Payment.css';

const stripePromise = loadStripe(
  'pk_test_51NeItFSHNxp4T5HBEk6KAMk5ZqFoKBoxpGbvXyohI6u7fR7WYXMhFKIdvxz8FXlJ7oQA7JTAcHRlv0Pz7UkLl1Cb00lpztcUMR'
);

const Payment = () => {
  const { id } = useParams();

  const options = {
    clienSecret: id,
    appearance: {
      theme: 'stripe',
    },
  };
  if (!id) {
    return <Navigate to="/" />;
  }
  return (
    <div className="payment">
      <Elements options={options} stripe={stripePromise}>
        <PaymentForm secretkey={id} />
      </Elements>
    </div>
  );
};

export default Payment;

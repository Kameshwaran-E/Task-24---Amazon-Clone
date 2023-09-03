import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Verify.css';
import axios from '../../axios';

const Verify = () => {
  const { token } = useParams();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyUser = async () => {
    try {
      const response = await axios.get(`/user/verify/${token}`);
      alert(response.data.msg);
      setSuccess(response.data.success);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      verifyUser();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="verify__loading">
        <img
          src="https://usagif.com/wp-content/uploads/loading-1.gif"
          alt="loading"
        />
      </div>
    );
  }

  return (
    <div className="verify">
      <h1>Verified Successfully</h1>
      <img
        className="verified"
        src="https://i.pinimg.com/originals/35/f3/23/35f323bc5b41dc4269001529e3ff1278.gif"
        alt=""
      />
      <Link to="/login">
        <button>Log In Now</button>
      </Link>
    </div>
  );
};

export default Verify;

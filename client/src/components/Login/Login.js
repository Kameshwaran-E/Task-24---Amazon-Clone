import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase';
import { handleLogin } from '../../slices/userSlice';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    const response = await axios.post('/user/login', {
      email,
      password,
    });
    localStorage.setItem('token', response.data.token);
    dispatch(handleLogin(response.data.token));
    navigate('/');
  };
  const register = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/user/signup', {
        email,
        password,
      });
      alert(response?.data?.msg);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login__container">
        <h1>Sign in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login__signInButton" onClick={login}>
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to Amazon's Conditions of Use & Sale. Please
          see our Privacy Noticy, our Cookies Notice and our Internet-Based Ads
          Notice.
        </p>
        <button className="login__registerButton" onClick={register}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
};

export default Login;

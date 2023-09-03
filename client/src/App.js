import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Orders from './components/Orders/Orders';
import Header from './components/Header/Header';
import Home from './Pages/Home/Home';
import Checkout from './Pages/Checkout/Checkout';
import Login from './components/Login/Login';
import Payments from './components/Payments/Payments';
import { useStateValue } from './components/StateProvider/StateProvider';
import { auth } from './firebase';
import Verify from './components/Verify/Verify';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [{ basket }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route
            path="/user/verify/:token"
            element={
              <>
                <Header />
                <Verify />
              </>
            }
          />
          <Route
            path="/pay/:id"
            element={
              <>
                <Header />
                <Payments />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

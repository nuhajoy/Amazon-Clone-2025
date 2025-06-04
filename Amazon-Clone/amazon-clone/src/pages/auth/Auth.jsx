import React, { useState, useContext } from 'react';
import Layout from '../../components/layout/Layout';
import { Link, useNavigate, useLocation} from "react-router-dom";

import classes from "./Signup.module.css"
import { auth } from '../../utiltiy/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { DataContext } from '../../components/DataProvider/DataProvider';
import { Type } from '../../utiltiy/ActionType';
import { ClipLoader } from 'react-spinners';

export default function Auth() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // console.log(password,email)

  
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false
  });
  const { user, dispatch } = useContext(DataContext);
  const navigate = useNavigate();
  const navData = useLocation()

  console.log(user)

  const authHandler = async (e) => {
    e.preventDefault();

    const redirectPath = navData.state?.redirect || "/"; //  Default to `/` if no redirect exists

    if (e.target.name === "signin") {
      setLoading({ ...loading, signIn: true });

      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(redirectPath); //  Redirect users to the page they intended to visit
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });

      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(redirectPath); //  Redirect users to the page they intended to visit
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };
  
  return (
    <section className={classes.login}>
      {/* logo */}

      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt=""
        />
      </Link>

      {/*  form  */}

      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {navData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navData?.state.msg}
          </small>
        )}

        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.signin_button}
          >
            {loading.signIn ? <ClipLoader size={15} /> : "Sign In"}
          </button>
        </form>

        {/* Agreement */}
        <p>
          By signing in you agree to the AMAZON FAKE CLONE Condithions of use &
          Sale. Pleas see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice
        </p>

        {/* create acount button  */}

        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className={classes.register_button}
        >
          {loading.signUp ? (
            <ClipLoader size={15} />
          ) : (
            "Create Your Amazon Account"
          )}
        </button>

        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

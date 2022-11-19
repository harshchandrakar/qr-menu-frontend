import React, { useRef, useState } from "react";
import classes from "../Style/Utils.module.css";
import { useDispatch } from "react-redux";
import { registerRestaurant, sendLoginRequest } from "../../actions/auth";

function Login() {
  const passwordRef = useRef();
  const emailRef = useRef();
  const confirmPasswordRef = useRef();
  const address = useRef();
  const pincodeRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const restnameRef = useRef();
  const countryRef = useRef();
  const logoRef = useRef();
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const [register, setRegister] = useState(false);
  const handleSubmit = () => {
    console.log(passwordRef.current.value, emailRef);
    dispatch(
      sendLoginRequest(emailRef.current.value, passwordRef.current.value)
    );
  };
  const handleRegister = () => {
    if (passwordRef.current.value == confirmPasswordRef.current.value) {
      const data = {
        restname: restnameRef.current.value,
        email: emailRef.current.value,
        city: cityRef.current.value,
        country: countryRef.current.value,
        password: passwordRef.current.value,
        address: address.current.value,
        state: stateRef.current.value,
        pincode: pincodeRef.current.value,
      };
      dispatch(registerRestaurant(data, file));
      setRegister(false);
    }
  };
  return (
    <div
      className={`${classes.Login} animate__animated animate__rotateInUpLeft animate__delay-1s `}
    >
      {register ? (
        <>
          <h1>Register</h1>
          <h4>Get yourself registered</h4>
          <form>
            <input
              placeholder="Restaurant name"
              className={classes.input}
              ref={restnameRef}
              required
            />
            <br />
            <label for="files">Select logo</label>
            <input
              type="file"
              id="files"
              accept="image/*"
              ref={logoRef}
              onChange={(e) => {
                setFile(e.target.files);
              }}
              className={classes.file}
            />

            <input
              placeholder="Country"
              ref={countryRef}
              className={classes.input}
              required
            />
            <input
              placeholder="State"
              ref={stateRef}
              className={classes.input}
              required
            />
            <input
              placeholder="City"
              ref={cityRef}
              className={classes.input}
              required
            />
            <input
              placeholder="Pincode"
              ref={pincodeRef}
              className={classes.input}
            />
            <input
              placeholder="Address"
              ref={address}
              className={classes.input}
              required
            />
            <input
              type="email"
              placeholder="Email"
              ref={emailRef}
              className={classes.input}
              required
            />
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              className={classes.input}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              className={classes.input}
              ref={confirmPasswordRef}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
            />
          </form>
        </>
      ) : (
        <>
          <h1>Login</h1>
          <h4>Enter your credentials</h4>
          <input placeholder="Email" className={classes.input} ref={emailRef} />
          <input
            type="password"
            placeholder="Password"
            className={classes.input}
            ref={passwordRef}
          />
        </>
      )}
      <button
        className={classes.btn}
        onClick={register ? handleRegister : handleSubmit}
      >
        {register ? "Register" : "Login"}
      </button>
      <button
        className={classes.btn1}
        onClick={() => {
          document.documentElement.scrollTop = 0;
          setRegister((prev) => {
            return !prev;
          });
        }}
      >
        {register ? "Login" : "Register"}
      </button>
      <a href="/">Go back to home</a>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/login-slice";

const Login = (props) => {
  const router = useRouter();
  const { user, login } = useAuth();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(data.email, data.password);

      dispatch(loginActions.showSignInModal());
      router.push(router.asPath);
    } catch (err) {
      console.log(err);
      alert("Invalid email or password");
      // clear input fields
      setData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <StyledLogin>
      <div className="header">
        <h1>Hi there!</h1>
        <p>Welcome back! Please enter your details.</p>
      </div>
      <div className="form">
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="example@college.edu.au"
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="********"
              value={data.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <div className="footer">
        <p>
          Don&apos;t have an account?{" "}
          <span>
            <a
              onClick={() => {
                props.signIn();
              }}
            >
              Sign up for free
            </a>
          </span>
        </p>
      </div>
    </StyledLogin>
  );
};

const StyledLogin = styled.div`
  margin-top: 100px;
  margin-right: 100px;

  .header {
    margin-left: 100px;
    h1 {
      /* Hi there! */

      font-style: normal;
      font-weight: 600;
      font-size: 50px;
      margin-bottom: -25px;

      color: #000000;
    }

    p {
      /* Welcome back! Please enter your details. */

      font-style: normal;
      font-weight: 600;
      font-size: 13px;

      color: #979797;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    margin-left: 100px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    input {
      /* Rectangle 22 */

      box-sizing: border-box;

      width: 300px;
      height: 32px;
      left: 175px;
      top: 430px;

      border: 2px solid #d9d9d9;
      border-radius: 3px;
    }

    button {
      margin-top: 20px;
      background-color: #357f7f;
      border-radius: 5px;
      font-weight: 550;
      cursor: pointer;

      /* on hover darken with ease*/
      &:hover {
        background-color: #2d6a6a;
        transition: 0.3s ease;
      }
    }
  }

  .footer {
    margin-left: 120px;

    p {
      /* Welcome back! Please enter your details. */

      font-style: normal;
      font-weight: 600;
      font-size: 13px;

      color: #979797;

      span {
        font-weight: 700;
        color: #000000;

        &:hover {
          color: #2d6a6a;
          transition: 0.3s ease;
        }

        cursor: pointer;
      }
    }
  }
`;

export default Login;

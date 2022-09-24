import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/login-slice";
import { useRouter } from "next/router";

const SignUp = (props) => {

  const router = useRouter();
  const { user, signup } = useAuth();
  const dispatch = useDispatch();
  
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signup(data.email, data.password);

      //console.log(user);

      dispatch(loginActions.showSignInModal());
      router.push('/');
    } catch (err) {
      console.log(err);
      alert("Invalid email or password");
      setData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <StyledLogin>
      <div className="header">
        <h1>Hi! Sign Up!</h1>
        <p>Coming soon, but feel free to sign up!.</p>
      </div>
      <div className="form">
        <form onSubmit={handleSignUp}>
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
            <button type="submit">Sign up</button>
          </div>
        </form>
      </div>
      <div className="footer">
        <p>
          Already have an account?{" "}
          <span>
            <a
              onClick={() => {
                props.signIn();
              }}
            >
              Sign in!
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

    @media (max-width: 950px) {
      margin-left: 0;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    margin-left: 100px;

    @media (max-width: 950px) {
      margin-left: 0;
    }
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

      @media (max-width: 950px) {
        height: 42px;
      }
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

      @media (max-width: 950px) {
        height: 42px;
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

    @media (max-width: 950px) {
      margin-left: 0;
      text-align: center;
    }
  }

  @media (max-width: 950px) {
    margin-top: 0;
    margin-right: 0;
  }
`;

export default SignUp;

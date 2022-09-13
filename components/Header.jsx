import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import Modal from "./Modal";

import { useAuth } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/login-slice";

const Header = () => {
  const dispatch = useDispatch();

  const { user, logout } = useAuth();

  return (
    <div>
      <StyledHeader>
        <div>
          <Image
            src="/logo.png"
            alt="RateMyCollegeDubai Logo"
            width={44}
            height={46}
          />
        </div>
        <div className="signin">
          {/* sign in opens load modal component */}

          {!user ? (
            <p
              onClick={() => {
                dispatch(loginActions.showSignInModal());
              }}
            >
              Sign In
            </p>
          ) : (
            <button
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          )}
        </div>
      </StyledHeader>
    </div>
  );
};

const StyledHeader = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 46px;

  /* mouse cursur on p  */
  p {

    font-weight: 600;
    &:hover {
      color: #2d6a6a;
      transition: 0.3s ease;
    }
    cursor: pointer;
  }

  .signin {
    margin-right: 10px;
  }

  button {
    margin-top: 10px;
    width: 100px;
    height: 30px;
    background-color: #357f7f;
    border-radius: 5px;
    border: none;
    font-weight: 500;
    color: white;
  }
`;

export default Header;

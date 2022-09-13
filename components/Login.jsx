import React from "react";
import styled from "styled-components";

const Login = () => {
  return (
    <StyledLogin>
      <h1>Hi there!</h1>
      <p>Welcome back! Please enter your details.</p>
    </StyledLogin>
  );
};

const StyledLogin = styled.div`


  h1 {
    /* Hi there! */

    font-style: normal;
    font-weight: 600;
    font-size: 50px;
    line-height: 20px;

    color: #000000;
  }

  p {
    /* Welcome back! Please enter your details. */

    font-style: normal;
    font-weight: 600;
    font-size: 13px;

    color: #979797;
  }
`;

export default Login;

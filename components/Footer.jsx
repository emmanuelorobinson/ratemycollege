import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <StyledFooter>
      <footer>
        <p>2022 RateMyCollegeDubai. All Rights Reserved.</p>
      </footer>
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 120px;
  justify-content: center;
  align-items: center;

  p {
    font-size: 13px;
    color: #3b3b3b;
  }

  
`;

export default Footer;

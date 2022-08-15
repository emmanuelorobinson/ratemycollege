import React from "react";
import styled from "styled-components";
import Image from "next/image";

const Header = () => {
  return (
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
        <p>Coming Soon...</p>
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 46px;

  .signin {
    margin-right: 10px;
  }

`;

export default Header;

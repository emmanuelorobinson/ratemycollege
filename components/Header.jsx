import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

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
        {/* sign in opens load modal component */}
        
        {/* <Link href="/signin">
          <p>Sign In</p>
        </Link> */}


        
        
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

  /* mouse cursur on p  */
  p {
    cursor: pointer;
  }

  .signin {
    margin-right: 10px;
  }

`;

export default Header;

import React from "react";
import Image from "next/image";
import styled from "styled-components";
import isMobile from "../utils/isMobile";

const Search = () => {
  return (
    <StyledSearch>
      <h1>The #1 student focused site for college reviews</h1>
      <div>
        <form action="">
          <div className="img">
            <Image
              src="/svgs/searchicon.svg"
              alt="Search Icon"
              width={22}
              height={26}
            />
          </div>
          <input type="text" placeholder="Search" />
        </form>
      </div>
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 422px;
  background-color: #262626;
  background-image: url("/search.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  align-items: center;
  justify-content: center;


  h1 {
    /* The #1 student focused site for college reviews */
    font-style: normal;
    font-weight: 800;
    font-size: 32px;
    color: #ffffff;
    text-align: center;

    @media screen and (max-width: ${isMobile ? "600px" : "1024px"}) {
      font-size:3.2vh
    }
  }

  form {
    display: flex;

    box-sizing: border-box;
    width: 400px;
    height: 40px;

    background: #fffcfc;
    border: 1px solid #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    @media screen and (max-width: ${isMobile ? "600px" : "1024px"}) {
      width: 48.7vh
    }
  }

  .img {
    display: flex;
    margin-left: 10px;
    margin-right: 10px;
  }

  input {
    /* Rectangle 1 */
    box-sizing: border-box;
    background-color: transparent;
    width: inherit;
    height: inherit;
    border: none;
    outline: none;
    font-size: 16px;
    color: #262626;

    @media screen and (max-width: ${isMobile ? "600px" : "1024px"}) {
      width: inherit
    }
  }
`;

export default Search;

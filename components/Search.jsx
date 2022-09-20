import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import isMobile from "../utils/isMobile";
import { useRouter,  } from "next/router";



const Search = (props) => {
  const { options, onInputChange } = props;

  const router = useRouter();

  const ulRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.addEventListener("click", (event) => {
      event.stopPropagation();
      ulRef.current.style.display = "flex";
      onInputChange(event);
    });

    


    // document.addEventListener("click", (event) => {
    //   ulRef.current.style.display = "none";
    // });
    
  }, []);

  const handleClickOutside = (event) => {
    if (ulRef.current && !ulRef.current.contains(event.target)) {
      ulRef.current.style.display = "none";
    }
  };

  return (
    <StyledSearch onClick={handleClickOutside}>
      <div className="back-img" ></div>
      <h1>The #1 student focused site for college reviews</h1>
      <div>
        <form>
          <div className="img">
            <Image
              src="/svgs/searchicon.svg"
              alt="Search Icon"
              width={22}
              height={26}
            />
          </div>
          <input
            type="text"
            placeholder="Search"
            ref={inputRef}
            onChange={onInputChange}
          />
          <ul id="results" className="list-group" ref={ulRef}>
            {options.map((option, index) => {
              return (
                <button
                  type="button"
                  key={index}
                  onClick={(e) => {
                    inputRef.current.value = option;
                    
                    // // navigate to the college page
                    // window.location.href = `/university/${option}`;
                    // use router
                    router.push(`/university/${option}`);
                  }}
                  className="list-group-item list-group-item-action"
                >
                  {option}
                </button>
              );
            })}
          </ul>
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

  align-items: center;
  justify-content: center;

  .back-img {
    position: absolute;

    width: 100%;
    height: 422px;
    overflow: hidden;

    background-color: #262626;
    background-image: url("/search.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    //filter: blur(3px);
  }

  h1 {
    /* The #1 student focused site for college reviews */
    position: relative;

    font-style: normal;
    font-weight: 800;
    font-size: 32px;
    color: #ffffff;
    text-align: center;

    @media screen and (max-width: ${isMobile ? "600px" : "1024px"}) {
      font-size: 5vw;
    }
  }

  form {
    display: flex;
    position: relative;

    box-sizing: border-box;
    width: 400px;
    height: 40px;

    background: #fffcfc;
    border: 1px solid #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    @media screen and (max-width: ${isMobile ? "600px" : "1024px"}) {
      width: 80vw;
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
      width: inherit;
    }
  }

  .list-group {
    position: absolute;
    margin-top: 10px;
    top: 100%;
    left: 0;
    z-index: 1;
    display: none;
    flex-direction: column;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    background-color: #ffffff;
    border: 1px solid #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    align-items: center;
    justify-content: center;
  }

  .list-group-item {
    
    margin-right: 30px;

    width: 400px;

    padding: 10px;
    font-size: 16px;
    color: #262626;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .list-group-item-action{
    &:hover{
      background-color: #f2f2f2;
    }
  }
  
`;

export default Search;

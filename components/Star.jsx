import React, { useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import StarIcon from "../public/svgs/starIcon";

const Star = (props) => {
  return (
    <Container>
      <h2>{props.title}</h2>

      <div className="wrapper">
        {[...Array(5)].map((item, index) => {
          const givenRating = index + 1;
          return (
            <label key={index}>
              <Radio
                type="radio"
                value={givenRating}
                onClick={() => {
                  props.setRate(givenRating);
                }}
              />
              <Rating>
                <StarIcon
                  color={
                    givenRating < props.rate || givenRating === props.rate
                      ? "#357F7F"
                      : "rgb(192,192,192)"
                  }
                />
              </Rating>
            </label>
          );
        })}
      </div>
      <div className="scale">
        <p>1 - Awful</p>
        <p>5 - Excellent</p>
      </div>
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  width: 800px;
  height: 170px;
  background: #ffffff;
  border: 1px solid #c0c0c0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 50px;

  margin-top: 100px;
  margin-bottom: -50px;

  .wrapper {
    display: flex;
    flex-direction: row;
  }

  h2 {
    /* Rate the campus */

    position: relative;

    left: -280px;
    top: 10px;

    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;

    color: #000000;
  }

  .scale {
    position: relative;
    display: flex;
    justify-content: space-between;
    top: -20px;
    align-items: center;
    width: 400px;

    p {
      /* 1 - Awful */

      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 22px;

      color: #727272;
    }
  }
`;
const Radio = styled.input`
  display: none;
`;
const Rating = styled.div`
  cursor: pointer;
  margin: 0 10px;
`;

export default Star;

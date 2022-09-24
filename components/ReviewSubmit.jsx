import React from "react";
import styled from "styled-components";

const ReviewSubmit = (props) => {
  return (
    <Container>
      <h2>
        By clicking the &quot;Submit&quot; button. I acknowledge that I have
        agreed to Rate My College Dubai Site Guidelines. Submitted dat becomes
        the property of RateMyCollegeDubai.com
      </h2>
      <button
        onClick={(e) => {
          e.preventDefault();
          props.submitReview();
        }}
      >
        Submit rating
      </button>
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  width: 700px;
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

  margin-top: -20px;
  margin-bottom: 50px;

  

  h2 {
    margin-top: -10px;
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 24px;
    width: 600px;
    font-weight: 500;
  }

  button {
    width: 240px;
    height: 50px;
    border-radius: 30px;

    font-style: normal;
    font-weight: 700;
    font-size: 16px;

    /* on hover make lighter */
    &:hover {
      background-color: #2d6a6a;
      transition: 0.3s ease;
    }
  }

  @media (max-width: 950px) {
    width: 90%;
    height: 250px;

    h2 {
      width: 90%;
    }
  }
`;

export default ReviewSubmit;

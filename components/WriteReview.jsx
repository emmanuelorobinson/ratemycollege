import React from "react";
import styled from "styled-components";
import Image from "next/image";

const WriteReview = (props) => {
  return (
    <Container>
      <h2>Write a review*</h2>
      <h3>
        Talk about your university, your likes and dislikes, and the ability of
        the university to meet student requirements
      </h3>
      <Guidelines>
        <h2>
          <Image
            src={"/svgs/exclamation.svg"}
            alt="Exclamation"
            width={18}
            height={18}
          />
          Guidelines
        </h2>
        <ul>
          <li>
            Your review could be removed if you use inappropriate language.
          </li>
          <li>Keep your review objective and factual.</li>
          <li>Do not use your review to promote your business or service.</li>
          <li>Don&apos;t forget to proofread!</li>
        </ul>
        <Input
          type={"text"}
          placeholder={"What do you want others to know about your university?"}
          onChange={(e) => props.setReview(e.target.value)}
        />
      </Guidelines>
    </Container>
  );
};

const Container = styled.div`
  /* Rectangle 18 */

  box-sizing: border-box;

  width: 700px;
  height: 600px;

  background: #ffffff;
  border: 1px solid #c0c0c0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;

  margin-top: 100px;
  margin-bottom: 50px;

  h2 {
    /* Rate the campus */

    position: relative;

    margin-left: 30px;

    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;

    color: #000000;
  }

  h3 {
    /* Talk about your university, your likes and dislikes, and the ability of the university to meet student requirements */

    width: 650px;
    height: 56px;

    margin-left: 30px;

    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;

    color: #000000;
  }
`;

const Guidelines = styled.div`
  /* Rectangle 19 */

  width: 640px;
  height: 148px;

  background: #f7f7f7;
  border-radius: 6px;

  margin-left: 30px;

  h2 {
    margin-left: 20px;
    font-size: 18px;
    top: 10px;
  }

  li {
    font-weight: 500;
    height: 22px;
  }
`;

const Input = styled.textarea`
  /* Rectangle 20 */

  box-sizing: border-box;

  margin-top: 30px;

  width: 640px;
  height: 240px;
  left: 142px;
  top: 1175px;

  background: #ffffff;
  border: 1px solid #d3d3d3;
  border-radius: 5px;

  font-style: normal;
  font-weight: 550;
  font-size: 15px;
  color: #7B7B7B;
  text-indent: 10px;
`;

export default WriteReview;

import React from "react";
import Image from "next/image";
import styled from "styled-components";

const Feature = () => {
  return (
    <StyledFeature>
      <div>
        <div className="mainsvg">
          <div className="points">
            <Image
              src="/svgs/campus.svg"
              alt="Campus SVG"
              width={146}
              height={134}
            />
            <p>Rate the <span>campus</span></p>
          </div>
          <div className="points">
            <Image
              src="/svgs/faculty.svg"
              alt="Campus SVG"
              width={146}
              height={134}
            />
            <p>Rate the <span>faculty</span></p>
          </div>
          <div className="points">
            <Image
              src="/svgs/community.svg"
              alt="Campus SVG"
              width={146}
              height={134}
            />
            <p>Rate the <span>community</span></p>
          </div>
        </div>
        <div className="sample-review">
          <h2>📃 Write an anonymous review</h2>
          <p>
            How has your experience been at your college? You can help incoming
            freshmen decide their next big step in life by writing a completely
            anonymous review and adding photos. We just require that you sign in
            with your email.
          </p>
        </div>
        <div className="ranger">
          <Image
            src="/svgs/rangerwitharrow.svg"
            alt="Space ranger with arrow"
            width={517}
            height={220}
          />
        </div>
      </div>
      <div className="img">
        <Image src="/svgs/review.svg" alt="Reviews" width={459} height={445} />
      </div>
    </StyledFeature>
  );
};

const StyledFeature = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 70px;

  .mainsvg {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-left: 80px;
    margin-right: 120px;
  }

  .points {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      font-weight: 500px;
      font-size: 18px;
      font-weight: 500;

      span {
        color: #357F7F
      }
    }
  }
  .sample-review {
    /* Group 16 */

    width: 659px;
    height: 168px;
    margin-left: 120px;
    margin-top: 80px;

    h2 {
      font-size: 32px;
    }

    p {
      font-size: 20px;
    }

    color: #000000;
  }

  .ranger {
    margin-left: 400px;
  }

  .img {
    margin-right: 90px;
  }
`;

export default Feature;

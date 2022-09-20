import React from "react";
import Image from "next/image";

import styled from "styled-components";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsPhone, BsGlobe } from "react-icons/bs";
import {IoStarSharp} from "react-icons/io5"

const UniversityInfo = ({ universityInfo }) => {
  return (
    <StyledUniversityInfo>
      <div className="img-holder">
        <Image
          src={"/defaultimage.jpg"}
          width={300}
          height={200}
          alt={` ${universityInfo.name} image`}
          style={{ borderRadius: "21px" }}
        />
        <h1>{universityInfo.name}</h1>
      </div>
      <div className="info-wrapper">
        <div className="info">
          <HiOutlineLocationMarker className="img-hold" />
          <p>{universityInfo.address}</p>
        </div>
        <div className="info">
          <BsPhone className="img-hold" />
          <p>{universityInfo.phone}</p>
        </div>
        <div className="info">
          <BsGlobe className="img-hold" />
          <p>{universityInfo.website}</p>
        </div>
        <div className="star">
          <p>{universityInfo.rating ? universityInfo.rating : 0 }</p>
          {/* number of stars */}
          {
            Array.from({length: 5}, (_, i) => {

              if (i < universityInfo.rating) {
                return <IoStarSharp size={20} style={{color: "#357F7F"}} key={i} />
              }
              return <IoStarSharp size={20} style={{color: "rgb(192,192,192)"}} key={i}/>
            }
            )
          }
        </div>
      </div>
    </StyledUniversityInfo>
  );
};

const StyledUniversityInfo = styled.div`
  /* image 9 */

  .img-holder {
    display: flex;
    flex-direction: column;

    width: 300px;
  }

  h1 {
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: 520;
    font-size: 24px;
    line-height: 36px;

    text-align: center;
  }

  p {
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
  }

  .info-wrapper {
    line-height: 10px;
  }

  .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 300px;
  }

  .img-hold {
    margin-right: 10px;
    color: #357F7F;
  }

  .star {

    margin-top: 5px;

    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;

    width: 300px;

    p {
      font-size: 18px;

      margin-right: 10px;
    }
  }
`;

export default UniversityInfo;

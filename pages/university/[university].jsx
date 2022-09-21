import React from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import UniversityInfo from "../../components/UniversityInfo";
import Review from "../../components/Review";
import StudentReviews from "../../components/StudentReviews";

import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

import {
  addDoc,
  collection,
  updateDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../../config/firebase";

import Image from "next/image";

import { reviewActions } from "../../store/review-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal";
import { useEffect } from "react";
import { loginActions } from "../../store/login-slice";

const University = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const [universityDetails, setUniversityDetails] = React.useState({});

  const showReview = useSelector((state) => state.review.showReview);
  const showLogin = useSelector((state) => state.login.showSignInModal);

  useEffect(() => {
    getAllUniversities();
  }, []);

  const { university } = router.query;

  async function getAllUniversities() {
    const querySnapshot = await getDocs(collection(db, "university"));

    // for university with name = university
    const universityDoc = querySnapshot.docs.find(
      (doc) => doc.data().universityName === university
    );
    const universityData = universityDoc.data();

    setUniversityDetails({
      name: universityData.universityName,
      address: universityData.address,
      latitude: universityData.location._lat,
      longitude: universityData.location._long,
      website: universityData.website,
      phone: universityData.phoneNumber,
    });

    console.log(universityDetails);
  }

  const handleReview = (e) => {
    e.preventDefault();

    if (user) {
      dispatch(reviewActions.showReviewModal());
    } else {
      dispatch(loginActions.showSignInModal());
    }
  };

  const map = `https://maps.google.com/maps?q=${universityDetails.latitude},${universityDetails.longitude}&z=15&output=embed
  `;

  return (
    <StyledUniversity>
      <Header />
      <div className="map-head">
        <iframe src={map} frameBorder="1" height="330px" width="100%"></iframe>
      </div>
      <div className="write-review">
        <div className="left">
          <Image
            src={"/svgs/backarrow.svg"}
            width={50}
            height={39}
            alt="back arrow to homepage"
          />
          <h4>Back to Home</h4>
        </div>
        <div>
          <button onClick={handleReview}>Write a review</button>
        </div>
      </div>
      <div className="university-details">
        <div className="left">
          <UniversityInfo universityInfo={universityDetails} />
        </div>
        <div className="right">
          <h2>All Reviews</h2>
          <StudentReviews />
        </div>
      </div>

      <Review showReview={showReview} university={universityDetails.name} />
      <Modal showModal={showLogin} />
    </StyledUniversity>
  );
};

const StyledUniversity = styled.div`
  .write-review {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;

    width: 100%;

    .left {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 170px;
    }

    button {
      background-color: #357f7f;
      border: 1px solid #f5f5f5;
      border-radius: 20px;
      padding: 10px 20px;
      font-size: 16px;
      margin-top: 5px;

      cursor: pointer;

      &:hover {
        background-color: #f5f5f5;
        color: #357f7f;
      }
    }
  }

  .university-details {
    display: flex;
    flex-direction: row;
    padding: 0 20px;
    margin-top: 20px;
    margin-left: 20px;
    justify-content: space-between;

    .left {
      display: flex;
      flex-direction: row;
      width: 35%;
    }

    .right {
      display: flex;
      flex-direction: column;
      width: 65%;
      margin-top: -20px
    }
  }
`;

export default University;

import React from "react";
import Head from "next/head";
import Header from "../../components/Header";
import styled from "styled-components";
import UniversityInfo from "../../components/UniversityInfo";
import Review from "../../components/Review";
import StudentReviews from "../../components/StudentReviews";

import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { IoStarSharp } from "react-icons/io5";

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

  const [reviews, setReviews] = React.useState({
    campus: 0,
    faculty: 0,
    community: 0,
    commulative: 0,
  });

  async function getAllAverageRating() {
    const querySnapshot = await getDocs(collection(db, "student_review"));

    const reviews = querySnapshot.docs.filter(
      (doc) => doc.data().universityName === university
    );

    const reviewsData = reviews.map((review) => review.data());

    console.log(reviewsData);

    const temp = {
      campus: 0,
      faculty: 0,
      community: 0,
      commulative: 0,
    };

    for (let review of reviewsData) {
      temp.campus += review.campus;
      temp.faculty += review.faculty;
      temp.community += review.community;
      temp.commulative += review.average ? review.average : 0;
    }

    temp.campus = temp.campus / reviewsData.length;
    temp.faculty = temp.faculty / reviewsData.length;
    temp.community = temp.community / reviewsData.length;
    temp.commulative = temp.commulative / reviewsData.length;

    setReviews(temp);
  }

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
      image: universityData.image ? universityData.image : null,
    });

    getAllAverageRating();
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
      <Head>
        <title>{`university/${university}`}</title>
        <meta name="description" content={`review page for ${university}`} />
        <link rel="icon" href="/logo.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta property="og:type" content={`website`} />
        <meta property="og:description" content={`review page for ${university}`} />
        <meta property="og:title" content={`university/${university}`} />
        <meta property="og:image" content={`/logo/png`} />
        {/* add alternate titles */}
      </Head>
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
            style={{ cursor: "pointer" }}

            onClick={() => router.push("/")}
          />
          <h4>Back to Home</h4>
        </div>
        <div>
          <button onClick={handleReview}>Write a review</button>
        </div>
      </div>
      <div className="university-details">
        <div className="left">
          <UniversityInfo
            universityInfo={universityDetails}
            rating={reviews.commulative}
          />

          <h3>Rating Breakdown</h3>
          <div className="rating-breakdown">
            <p>Campus</p>
            <div className="star">
              {Array.from({ length: 5 }, (_, i) => {
                if (i < Math.round(reviews.campus)) {
                  return (
                    <IoStarSharp
                      size={20}
                      style={{ color: "#357F7F" }}
                      key={i}
                    />
                  );
                }
                return (
                  <IoStarSharp
                    size={20}
                    style={{ color: "rgb(192,192,192)" }}
                    key={i}
                  />
                );
              })}
            </div>
          </div>
          <div className="rating-breakdown">
            <p>Faculty</p>
            <div className="star">
              {Array.from({ length: 5 }, (_, i) => {
                if (i < Math.round(reviews.faculty)) {
                  return (
                    <IoStarSharp
                      size={20}
                      style={{ color: "#357F7F" }}
                      key={i}
                    />
                  );
                }
                return (
                  <IoStarSharp
                    size={20}
                    style={{ color: "rgb(192,192,192)" }}
                    key={i}
                  />
                );
              })}
            </div>
          </div>
          <div className="rating-breakdown">
            <p>Community</p>
            <div className="star">
              {Array.from({ length: 5 }, (_, i) => {
                if (i < Math.round(reviews.community)) {
                  return (
                    <IoStarSharp
                      size={20}
                      style={{ color: "#357F7F" }}
                      key={i}
                    />
                  );
                }
                return (
                  <IoStarSharp
                    size={20}
                    style={{ color: "rgb(192,192,192)" }}
                    key={i}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="right">
          <h2>All Reviews</h2>
          <StudentReviews universityName={universityDetails.name} />
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
      color: white;
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

    /* change flex to column on mobile */
    @media (max-width: 950px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .left {
      display: flex;
      flex-direction: column;
      width: 35%;
      margin-bottom: 20px;
      margin-left: 40px;
      margin-right: -40px;

      h3 {
        text-align: center;
        width: 300px;

      }

      @media (max-width: 950px) {
        width: 100%;
        margin-bottom: 50px;
        margin-left: 0px;
        margin-right: 0px;

        justify-content: center;
        align-items: center;

      }
    }

    .rating-breakdown {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 250px;
      align-items: center;
      margin-left: 15px;
      margin-bottom: 10px;

      p {
        line-height: 0px;
        margin-top: 10px;
        font-weight: 700;
      }

      @media (max-width: 950px) {
        width: 90%;
        margin-left: 0px;
        margin-right: 0px;

        justify-content: space-between;
        align-items: center;
        
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      width: 65%;
      margin-top: -20px;

      h2 {
        @media (max-width: 950px) {
          text-align: center;
        }
      }

      @media (max-width: 950px) {
        width: 100%;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

export default University;

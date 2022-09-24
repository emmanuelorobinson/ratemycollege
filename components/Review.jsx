import React, { useRef, useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import Star from "./Star";
import WriteReview from "./WriteReview";
import ReviewSubmit from "./ReviewSubmit";
import { useDispatch, useSelector } from "react-redux";
import { reviewActions } from "../store/review-slice";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

import {
  addDoc,
  collection,
  updateDoc,
  getDocs,
  doc,
} from "firebase/firestore";

const Review = ({ showReview, setShowReview, university }) => {
  const { user } = useAuth();

  // console.log(user.email);

  const dispatch = useDispatch();

  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showReview ? 1 : 0,
    transform: showReview ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      dispatch(reviewActions.showReviewModal());
    }
  };

  const keyPress = useCallback((e) => {
    if (e.key === "Escape" && showReview) {
      dispatch(reviewActions.showReviewModal());
      console.log("I pressed");
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  const [campus, rateCampus] = useState(0);
  const [faculty, rateFaculty] = useState(0);
  const [community, rateCommunity] = useState(0);
  const [writeReview, setWriteReview] = useState("");

  const submitReview = async () => {
    if (
      campus === 0 ||
      faculty === 0 ||
      community === 0 ||
      writeReview === ""
    ) {
      alert("Please rate all the categories");
    } else {
      const rating = {
        user: user.email,
        universityName: university,
        campus: campus,
        faculty: faculty,
        community: community,
        review: writeReview,
        // store date and time in yyyy-mm-dd hh:mm format
        date: new Date().toLocaleString(),
        likes: 0,
        average: (campus + faculty + community) / 3,
      };

      // add rating to firestore
      const docRef = await addDoc(collection(db, "student_review"), rating);

      // close modal
      dispatch(reviewActions.showReviewModal());
    }
  };

  return (
    <>
      {showReview ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation} className="animated">
            <ModalWrapper showReview={showReview}>
              {/* <ModalImg src={require('./modal.jpg')} alt='camera' /> */}
              <ModalContent>
                <Star
                  rate={campus}
                  setRate={rateCampus}
                  title={"Rate the campus"}
                />
                <Star
                  rate={faculty}
                  setRate={rateFaculty}
                  title={"Rate the faculty"}
                />
                <Star
                  rate={community}
                  setRate={rateCommunity}
                  title={"Rate the community"}
                />
                <WriteReview setReview={setWriteReview} />
                <ReviewSubmit submitReview={submitReview} />
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => dispatch(reviewActions.showReviewModal())}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;

  @media (max-width: 950px) {
    /* set width to page width */

    width: 100%;
    height: 100%;

    .animated {
    width: 100%;
    height: 100%;
  }


  }
`;

const ModalWrapper = styled.div`
  width: 850px;
  height: 800px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;

  //allow for scrolling and show scroll within modal
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  @media (max-width: 950px) {
    /* set width to page width */
    width: 100%;
    height: 100%;
    border-radius: 0;
    display: flex;
    flex-direction: column;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.8;
  color: #141414;

  p {
    margin-bottom: 1rem;
    font-size: 1.6rem;
    color: #292929;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }

  @media (max-width: 950px) {
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 28px;
  height: 28px;
  padding: 0;
  z-index: 10;
`;

export default Review;

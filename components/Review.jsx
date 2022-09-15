import React, { useRef, useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import Star from "./Star";
import WriteReview from "./WriteReview";
import { useDispatch, useSelector } from "react-redux";
import { reviewActions } from "../store/review-slice";

const Review = ({ showReview, setShowReview }) => {
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
      dispatch(reviewActions.showReview());
    }
  };

  const keyPress = useCallback((e) => {
    if (e.key === "Escape" && showReview) {
      dispatch(reviewActions.showReview());
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
  const [writeReview, setWriteReview] = useState(false);

  const setCampus = (value) => {
    rateCampus(value);

    console.log(campus);
    console.log(faculty);
    console.log(community);
    c
  };


  return (
    <>
      {showReview ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showReview={showReview}>
              {/* <ModalImg src={require('./modal.jpg')} alt='camera' /> */}
              <ModalContent>
                <Star rate={campus} setRate={rateCampus} title={"Rate the campus"}/>
                <Star rate={faculty} setRate={rateFaculty} title={"Rate the faculty"}/>
                <Star rate={community} setRate={rateCommunity} title={"Rate the community"}/>
                <WriteReview setReview={setWriteReview} />
                
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => dispatch(reviewActions.showReview())}
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
`;

const ModalWrapper = styled.div`
  width: 950px;
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

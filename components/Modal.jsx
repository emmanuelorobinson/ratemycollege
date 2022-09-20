import React, { useRef, useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import Login from "./Login";
import SignUp from "./SignUp";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/login-slice";

const Modal = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();

  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      //setShowModal(false);
      dispatch(loginActions.showSignInModal());
    }
    //window.location.reload();
  };

  const keyPress = useCallback((e) => {
    if (e.key === "Escape" && showModal) {
      // setShowModal(false);
      dispatch(loginActions.showSignInModal());
    }
  });

  const [signIn, setSignIn] = useState(true);

  const isSignIn = () => {
    const signed = !signIn;

    setSignIn(signed);
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              {/* <ModalImg src={require('./modal.jpg')} alt='camera' /> */}
              <ModalContent>
                {signIn ? (
                  <Login signIn={isSignIn} />
                ) : (
                  <SignUp signIn={isSignIn} />
                )}
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => dispatch(loginActions.showSignInModal())}
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
  width: 500px;
  height: 700px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  z-index: 10;
  border-radius: 5px;
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

export default Modal;

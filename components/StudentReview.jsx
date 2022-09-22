import React from "react";
import styled from "styled-components";

import { BsPersonCircle } from "react-icons/bs";
import { IoStarSharp } from "react-icons/io5";
import { GiChewedHeart } from "react-icons/gi";
import { useAuth } from "../context/AuthContext";
var Filter = require('bad-words')

import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  updateDoc,
  getDocs,
  doc,
} from "firebase/firestore";

const StudentReview = (props) => {

  const { user } = useAuth();

  const filter = new Filter();

  const cleanReview = filter.clean(props.review.review);

  //get date part from date string
  const date = props.review.date.split(",")[0];


  const updateLikes = async () => {
    //update likes in database

    // for review where email == props.review.email && review == props.review.review
    // update likes by 1

    //update likes in state
    // if signed in 
    if (user) {
      props.review.likes += 1;

      const querySnapshot = await getDocs(collection(db, "student_review"));
      const reviews = querySnapshot.docs.filter(
        (doc) => doc.data().email === props.review.email && doc.data().review === props.review.review
      );

      const review = querySnapshot.docs[0];
      const reviewId = review.id;

      const reviewRef = doc(db, "student_review", reviewId);
      await updateDoc(reviewRef, {
        likes: props.review.likes,
      });
    }
    else {
      alert("Please sign in to like this review.");
    }


  };

  return (
    <ReviewContainer>
      <div className="review-header">
        <BsPersonCircle
          size={40}
          style={{
            color: "#357F7F",
          }}
        />
        <div className="review-sub-info">
          <div className="stars">
          {Array.from({ length: 5 }, (_, i) => {
            if (i < Math.round(props.review.average)) {
              return (
                <IoStarSharp size={20} style={{ color: "#357F7F" }} key={i} />
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
          <p>{date}</p>
        </div>
      </div>
      <div>
        <p>{cleanReview}</p>
      </div>
      <div className="review-footer">
        <p>{props.review.likes}</p>
        <GiChewedHeart size={20} style={{ color: "#a83f39 ", cursor: "pointer" }} onClick = {
          () => {
            updateLikes(props.review.likes + 1);
          }
        } />
      </div>
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #c0c0c0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  padding: 20px;
  width: 95%;
  margin-bottom: 30px;

  .review-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 160px;

  }

  .review-sub-info {
    display: flex;
    flex-direction: column;
  }

  .stars {
    display: flex;
    flex-direction: row;
    margin-bottom: -10px;
  }

  .review-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 40px;
    margin-top: 10px;

    p {
      line-height: 0;
      margin-top: 10px
    }
  }
`;

export default StudentReview;

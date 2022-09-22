import React, {useEffect} from "react";
import StudentReview from "./StudentReview";
import styled from "styled-components";

import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  updateDoc,
  getDocs,
  doc,
} from "firebase/firestore";



const StudentReviews = (props) => {

  const [reviews, setReviews] = React.useState([]);



  useEffect(() => {

    console.log(props.university);

    getReviews(props.universityName);
  }, [props.universityName]);

  const getReviews = async () => {
    // get reviews where universityName = university
  
    const querySnapshot = await getDocs(collection(db, "student_review"));
    const reviews = querySnapshot.docs.filter(
      (doc) => doc.data().universityName === props.universityName
    );
  

    const reviewsData = reviews.map((review) => review.data());
    setReviews(reviewsData);
  };

  return (
    <div>
      {reviews.map((review) => (
        <StudentReview review={review} key={review.id} />
      ))}

      {/* if reviews empty */}
      {reviews.length === 0 && (
         (
          <div>
            <p style={{
              fontSize: "20px",
            }}>No reviews yet...</p>
          </div>
        )
      )}
      
    </div>

  );
};

export default StudentReviews;

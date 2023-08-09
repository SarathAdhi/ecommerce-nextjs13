"use client";

import React from "react";
import { Rating, RatingProps } from "react-simple-star-rating";

const StarRating = (props: RatingProps) => {
  return <Rating allowFraction transition {...props} />;
};

export default StarRating;

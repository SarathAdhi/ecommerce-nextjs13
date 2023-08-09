"use client";

import StarRating from "@components/StarRating";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

type Props = {
  title: string;
  ratings: number;
  description: string;
};

const ReviewRenderer: React.FC<Props> = ({ title, ratings, description }) => {
  const [readmore, setReadmore] = useState(false);

  return (
    <div className="w-full border-b pb-4 last:pb-0 last:border-none space-y-2">
      <div>
        <h5>{title}</h5>

        <StarRating size={20} initialValue={ratings} readonly />
      </div>

      <div className="space-y-2">
        <p className={readmore ? "" : "line-clamp-5"}>{description}</p>

        <button
          className="text-sm underline flex items-center gap-1"
          onClick={() => setReadmore(!readmore)}
        >
          <span>Read {readmore ? "Less" : "More"}</span>

          {readmore ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
    </div>
  );
};

export default ReviewRenderer;

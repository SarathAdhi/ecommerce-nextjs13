"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const InvalidSession = ({ message = "", redirect = "/" }) => {
  const { replace } = useRouter();

  const [redirectSeconds, setRedirectSeconds] = useState(5);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (redirectSeconds > 0) {
        setRedirectSeconds(redirectSeconds - 1);
      } else {
        replace(redirect);
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [redirectSeconds]);

  return (
    <div className="text-center mt-10 space-y-1">
      <h4>{message}</h4>
      <p>Redirecting in {redirectSeconds}...</p>
    </div>
  );
};

export default InvalidSession;

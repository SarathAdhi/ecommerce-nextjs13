import React from "react";

type Props = {
  children: React.ReactNode;
};

const Grid: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
      {children}
    </div>
  );
};

export default Grid;

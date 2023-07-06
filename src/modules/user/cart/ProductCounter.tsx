"use client";

import { Input } from "@components/ui/input";
import { MinusCircle, PlusCircle } from "lucide-react";
import React, { useState } from "react";

const ProductCounter = () => {
  const [count, setCount] = useState(1);

  const increment = () => setCount(count < 10 ? count + 1 : count);
  const decrement = () => setCount(count > 1 ? count - 1 : count);

  return (
    <div className="flex items-center justify-between gap-2">
      <button onClick={decrement}>
        <MinusCircle />
      </button>

      <Input
        className="mx-auto text-center w-10 h-8"
        value={count}
        min={1}
        max={10}
        onChange={() => {}}
        readOnly
      />

      <button onClick={increment}>
        <PlusCircle />
      </button>
    </div>
  );
};

export default ProductCounter;

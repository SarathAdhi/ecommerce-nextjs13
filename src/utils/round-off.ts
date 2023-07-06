// export const roundOff = (number: number) => number.toPrecision(5);
export const roundOff = (number: number) =>
  number.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  });

"use client";

import * as React from "react";

import CarouselRMC, {
  CarouselProps,
  ResponsiveType,
} from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Props extends Omit<CarouselProps, "responsive"> {
  children: React.ReactNode;
  responsive?: ResponsiveType;
}

export const Carousel: React.FC<Props> = ({
  children,
  responsive,
  ...rest
}) => {
  const _responsive = responsive || {
    mobile: {
      breakpoint: { max: 5000, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <CarouselRMC
      containerClass="!space-x-4"
      responsive={_responsive}
      ssr
      itemClass="p-2 sm:p-4"
      {...rest}
    >
      {children}
    </CarouselRMC>
  );
};

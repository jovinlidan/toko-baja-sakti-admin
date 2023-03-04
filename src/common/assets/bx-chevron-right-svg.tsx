import * as React from "react";
import { SVGProps } from "react";

const BxChevronRightSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.16 17.707 16.867 12 11.16 6.293 9.746 7.707 14.04 12l-4.293 4.293 1.414 1.414Z"
      fill={props.color}
      fillOpacity={0.87}
    />
  </svg>
);

export default BxChevronRightSVG;

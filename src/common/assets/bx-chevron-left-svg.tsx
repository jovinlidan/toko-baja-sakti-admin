import * as React from "react";
import { SVGProps } from "react";

const BxChevronLeftSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.255 6.293 8.548 12l5.707 5.707 1.414-1.414L11.376 12l4.293-4.293-1.414-1.414Z"
      fill={props.color}
      fillOpacity={0.54}
    />
  </svg>
);

export default BxChevronLeftSVG;

import * as React from "react";
import { SVGProps } from "react";

const PlusSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    height={10}
    width={10}
    viewBox="0 0 50 50"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h50v50H0z" />
    <path
      fill="none"
      stroke={props.color}
      strokeMiterlimit={10}
      strokeWidth={4}
      d="M9 25h32M25 9v32"
    />
  </svg>
);

export default PlusSVG;

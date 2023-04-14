import * as React from "react";
import { SVGProps } from "react";
const LogoutSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 15 15"
    {...props}
  >
    <path
      fill={props.color}
      fillRule="evenodd"
      d="M1 1h7v1H2v11h6v1H1V1Zm9.854 3.146 3.34 3.34-3.327 3.603-.734-.678L12.358 8H4V7h8.293l-2.147-2.146.708-.708Z"
      clipRule="evenodd"
    />
  </svg>
);
export default LogoutSVG;

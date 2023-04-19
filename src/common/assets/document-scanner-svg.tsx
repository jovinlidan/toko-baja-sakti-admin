import * as React from "react";
import { SVGProps } from "react";
const DocumentScannerSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#32475C"
      fillOpacity={0.87}
      d="M7 3H4v3H2V1h5v2Zm15 3V1h-5v2h3v3h2ZM7 21H4v-3H2v5h5v-2Zm13-3v3h-3v2h5v-5h-2Zm-1 0c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v12ZM15 8H9v2h6V8Zm0 3H9v2h6v-2Zm0 3H9v2h6v-2Z"
    />
  </svg>
);
export default DocumentScannerSVG;

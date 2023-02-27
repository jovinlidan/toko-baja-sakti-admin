import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "@/config/stitches/theme.stitches";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            dangerouslySetInnerHTML={{
              __html: `
             ${getCssText() + resetStyle}
            `,
            }}
          />
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="id">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;700&family=Roboto&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

const resetStyle = `
:root{
  color-scheme : light only;
}

a {
  text-decoration : none;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
}
html {
  font-size: 16px;
  clear: both;
  box-shadow: none;
  font-family: 'Public Sans', sans-serif;
}

* {
  box-sizing: border-box;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: darkgrey transparent;
}
*::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
*::-webkit-scrollbar-track {
  background: none;
  border-radius: 50%;
}
*::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  border-radius: 24px;
}
::-webkit-scrollbar-corner {
  background: rgba(0,0,0,0);
  visibility : hidden;
}

.no-scrollbar::-webkit-scrollbar{
  width: 0;
  height: 0;
}


input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
    -webkit-transition-delay: 9999s;
}

*::before {
  box-sizing: border-box;
}
*::after {
  box-sizing: border-box;
}
ul[class] {
  margin: 0;
  list-style: none;
}
ol[class] {
  margin: 0;
  list-style: none;
}
body {
  max-width: 100vw;
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  margin: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
}
body > div#__next {
  height: 100vh;
}
figure {
  margin: 0;
}
blockquote {
  margin: 0;
}
dl {
  margin: 0;
}
dd {
  margin: 0;
}
a:not([class]) {
  text-decoration-skip-ink: auto;
}
img {
  max-width: 100%;
  display: block;
}
input {
  font: inherit;
}
input:focus {
  outline : none;
}

button {
  font: inherit;
}
textarea {
  font: inherit;
}
select {
  font: inherit;
}
img:not([alt]) {
  filter: blur(10px);
}
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms;
    animation-iteration-count: 1 ;
    transition-duration: 0.01ms ;
    scroll-behavior: auto ;
  }
}

`;

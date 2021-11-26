import * as React from "react";
import styled from "styled-components";
import breakpoint from "./styles/globalStyle";

import ZonesColors from "./components/zonesColors";


const MainWrapper = styled.div`
  /* @import url("https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,200;0,300;0,400;0,700;0,900;1,300&display=swap"); */

  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  font-family: "Overpass", sans-serif !important;
  margin: auto !important;
  background-color: #222222 !important;
  color: #f2f2f2 !important;

  a {
    color: #f2f2f2 !important;
  }

  .row {
    display: flex !important;
  }
  margin: auto;
  @media only screen and ${breakpoint.device.xs} {
    margin: auto;
    width: 95vw;
  }
  @media only screen and ${breakpoint.device.sm} {
  }
  @media only screen and ${breakpoint.device.lg} {
    padding: 30px 30px;
    max-height: 98vh;
  }
`;

// markup
const App = () => {
  return (
    <MainWrapper>
      <ZonesColors />
    </MainWrapper>
  );
};

export default App;

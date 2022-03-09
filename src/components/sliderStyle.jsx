import styled from "styled-components";
import breakpoint from "../styles/globalStyle";

export const sliderStyle = {
    marginTop: "auto",
    marginBottom: "auto",
};

const Button = styled.div`
  display: none;
  @media only screen and ${breakpoint.device.sm} {
    z-index: 100;
    border-radius: 3px;
    padding: 0.5rem 0.5rem;
    margin: 0.5rem 0rem 0.5rem 1rem;
    min-width: 40px;
    height: 24px;
    background: darkblue;
    color: white;
    cursor: pointer;
    align-self: flex-end;
    justify-content: center;
    text-align: center;
  }
`;
export const Row = styled.div`
  display: flex;
  /* margin: 0px; */
  max-width: 600px;
`;
export const TopComponent = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and ${breakpoint.device.xs} {
    flex-direction: column;
  }
  @media only screen and ${breakpoint.device.sm} {
    flex-direction: row;
  }
  @media only screen and ${breakpoint.device.lg} {
    flex-direction: row;
    justify-content: space-around;
    width: 95%;
  }
`;
export const LegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and ${breakpoint.device.xs} {
    flex-direction: row;
    max-width: 95vw;
    margin: auto;
  }
  @media only screen and ${breakpoint.device.sm} {
    flex-direction: column;
    margin: 50px 10px;
  }
  /* @media only screen and ${breakpoint.device.lg} {
    flex-direction: column;
    margin: 20px 0px;
  } */
`;
export const Legend = styled.div`
  display: flex;
  flex-direction: row;
  @media only screen and ${breakpoint.device.xs} {
    flex-direction: column;
    align-items: center;
    margin: 0px 10px;
    font-size: 12px;
  }
  @media only screen and ${breakpoint.device.sm} {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  @media only screen and ${breakpoint.device.lg} {
    display: flex;
    flex-direction: row;
    margin: 10px 0px;
    width: 20%;
    justify-content: space-between;
  }
`;
export const Metrics = styled.div`
  margin: 0px;
  @media only screen and ${breakpoint.device.xs} {
    font-size: 16px;
  }
  @media only screen and ${breakpoint.device.sm} {
    font-size: 24px;
  }
`;
export const DataLayers = styled.div`
  display: none;
  @media only screen and ${breakpoint.device.sm} {
    display: block;
  }
`;
export const DataLabel = styled.div`
  display: none;
  font-size: 10px;
  @media only screen and ${breakpoint.device.sm} {
    display: block;
    width: 30px;
    margin-right: 10px;
  }
`;
export const VerticalNeedle = styled.div`
  display: none;

  @media only screen and ${breakpoint.device.sm} {
    display: block;
    width: 1px;
    height: 40px;
    background-color: white;
    margin: auto;
    margin-top: -40px;
  }
`;

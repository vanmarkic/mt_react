import React, { useEffect, useState } from "react";

import Slider, { Handle } from "rc-slider";

import styled from "styled-components";
import * as d3Array from "d3-array";
import { scaleLinear } from "d3-scale";

import breakpoint from "../styles/globalStyle";

import camData from "../content/oneyearfourcamsbyday.json";
import densityPeakPerDay from "../content/density_day.json";

import weatherData from "../content/schiphol_weather.json";

import remarkableDates from "./remarkableDates";

import Picnic from "./Map/ZonesWithDots/picnic";
import Water from "./Map/ZonesWithDots/water";
import Fitness from "./Map/ZonesWithDots/fitness";
import Gate from "./Map/ZonesWithDots/gate";
import BarChart from "./BarChart";
import MtMap from "./Map/Map";

const weatherDataDates = weatherData.map((el) => el.date.substring(0, 10));
const weatherDataAverageTemp = weatherData.map((el) => el.TG / 10);

const markPoints = {};

remarkableDates.forEach((el, idx) => {
  markPoints[weatherDataDates.indexOf(el.date)] = {
    style: {
      display: "none",
    },
    label: el.title,
    undertitle: el.undertitle,
    link: el.link,
    date: el.date,
  };
});

const temperatureMin = d3Array.min(weatherDataAverageTemp);
const temperatureMax = d3Array.max(weatherDataAverageTemp);

const tempColors = scaleLinear()
  .domain([temperatureMin, 10, temperatureMax])
  .range(["cyan", "white", "red"]);

const temperatureColors = weatherDataAverageTemp.map((t) => {
  return tempColors(t);
});

const totalAmountOfVisitors = weatherDataDates.map((el, idx) => {
  const picnicAmount =
    camData.content.picnic[el] === undefined ? 10 : camData.content.picnic[el];
  const fitnessAmount =
    camData.content.fitness[el] === undefined
      ? 10
      : camData.content.fitness[el];
  const waterAmount =
    camData.content.water[el] === undefined ? 10 : camData.content.water[el];
  const gateAmount =
    camData.content.gate[el] === undefined ? 10 : camData.content.gate[el];
  return Math.round(picnicAmount + waterAmount + fitnessAmount + gateAmount);
});

const sliderStyle = {
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
const Row = styled.div`
  display: flex;
  /* margin: 0px; */
`;

const Wrapper = styled.div`
  .rc-slider {
    position: relative;
    height: 14px;
    padding: 5px 0;
    width: 100%;
    border-radius: 6px;
    touch-action: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .rc-slider * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .rc-slider-rail {
    position: absolute;
    width: 100%;
    background-color: #e9e9e9;
    height: 4px;
    border-radius: 6px;
  }
  .rc-slider-track {
    position: absolute;
    left: 0;
    height: 4px;
    border-radius: 6px;
    background-color: #abe2fb;
  }
  .rc-slider-handle {
    position: absolute;
    width: 14px;
    height: 14px;
    cursor: pointer;
    cursor: -webkit-grab;
    margin-top: -5px;
    cursor: grab;
    border-radius: 50%;
    border: solid 2px #96dbfa;
    background-color: #fff;
    touch-action: pan-x;
  }
  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color: #57c5f7;
    box-shadow: 0 0 0 5px #96dbfa;
  }
  .rc-slider-handle:focus {
    outline: none;
  }
  .rc-slider-handle-click-focused:focus {
    border-color: #96dbfa;
    box-shadow: unset;
  }
  .rc-slider-handle:hover {
    border-color: #57c5f7;
  }
  .rc-slider-handle:active {
    border-color: #57c5f7;
    box-shadow: 0 0 5px #57c5f7;
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
  .rc-slider-mark {
    position: absolute;
    top: 18px;
    left: 0;
    width: 100%;
    font-size: 12px;
  }
  .rc-slider-mark-text {
    position: absolute;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
    color: #999;
  }
  .rc-slider-mark-text-active {
    color: #666;
  }
  .rc-slider-step {
    position: absolute;
    width: 100%;
    height: 4px;
    background: transparent;
  }
  .rc-slider-dot {
    position: absolute;
    bottom: -2px;
    margin-left: -4px;
    width: 8px;
    height: 8px;
    border: 2px solid #e9e9e9;
    background-color: #fff;
    cursor: pointer;
    border-radius: 50%;
    vertical-align: middle;
  }
  .rc-slider-dot-active {
    border-color: #96dbfa;
  }
  .rc-slider-dot-reverse {
    margin-right: -4px;
  }
  .rc-slider-disabled {
    background-color: #e9e9e9;
  }
  .rc-slider-disabled .rc-slider-track {
    background-color: #ccc;
  }
  .rc-slider-disabled .rc-slider-handle,
  .rc-slider-disabled .rc-slider-dot {
    border-color: #ccc;
    box-shadow: none;
    background-color: #fff;
    cursor: not-allowed;
  }
  .rc-slider-disabled .rc-slider-mark-text,
  .rc-slider-disabled .rc-slider-dot {
    cursor: not-allowed !important;
  }
  .rc-slider-vertical {
    width: 14px;
    height: 100%;
    padding: 0 5px;
  }
  .rc-slider-vertical .rc-slider-rail {
    height: 100%;
    width: 4px;
  }
  .rc-slider-vertical .rc-slider-track {
    left: 5px;
    bottom: 0;
    width: 4px;
  }
  .rc-slider-vertical .rc-slider-handle {
    margin-left: -5px;
    touch-action: pan-y;
  }
  .rc-slider-vertical .rc-slider-mark {
    top: 0;
    left: 18px;
    height: 100%;
  }
  .rc-slider-vertical .rc-slider-step {
    height: 100%;
    width: 4px;
  }
  .rc-slider-vertical .rc-slider-dot {
    left: 2px;
    margin-bottom: -4px;
  }
  .rc-slider-vertical .rc-slider-dot:first-child {
    margin-bottom: -4px;
  }
  .rc-slider-vertical .rc-slider-dot:last-child {
    margin-bottom: -4px;
  }
  .rc-slider-tooltip-zoom-down-enter,
  .rc-slider-tooltip-zoom-down-appear {
    animation-duration: 0.3s;
    animation-fill-mode: both;
    display: block !important;
    animation-play-state: paused;
  }
  .rc-slider-tooltip-zoom-down-leave {
    animation-duration: 0.3s;
    animation-fill-mode: both;
    display: block !important;
    animation-play-state: paused;
  }
  .rc-slider-tooltip-zoom-down-enter.rc-slider-tooltip-zoom-down-enter-active,
  .rc-slider-tooltip-zoom-down-appear.rc-slider-tooltip-zoom-down-appear-active {
    animation-name: rcSliderTooltipZoomDownIn;
    animation-play-state: running;
  }
  .rc-slider-tooltip-zoom-down-leave.rc-slider-tooltip-zoom-down-leave-active {
    animation-name: rcSliderTooltipZoomDownOut;
    animation-play-state: running;
  }
  .rc-slider-tooltip-zoom-down-enter,
  .rc-slider-tooltip-zoom-down-appear {
    transform: scale(0, 0);
    animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  }
  .rc-slider-tooltip-zoom-down-leave {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  }
  @keyframes rcSliderTooltipZoomDownIn {
    0% {
      opacity: 0;
      transform-origin: 50% 100%;
      transform: scale(0, 0);
    }
    100% {
      transform-origin: 50% 100%;
      transform: scale(1, 1);
    }
  }
  @keyframes rcSliderTooltipZoomDownOut {
    0% {
      transform-origin: 50% 100%;
      transform: scale(1, 1);
    }
    100% {
      opacity: 0;
      transform-origin: 50% 100%;
      transform: scale(0, 0);
    }
  }
  .rc-slider-tooltip {
    position: absolute;
    left: -9999px;
    top: -9999px;
    visibility: visible;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .rc-slider-tooltip * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .rc-slider-tooltip-hidden {
    display: none;
  }
  .rc-slider-tooltip-placement-top {
    padding: 4px 0 8px 0;
  }
  .rc-slider-tooltip-inner {
    padding: 6px 2px;
    min-width: 24px;
    height: 24px;
    font-size: 12px;
    line-height: 1;
    color: #fff;
    text-align: center;
    text-decoration: none;
    background-color: #6c6c6c;
    border-radius: 6px;
    box-shadow: 0 0 4px #d9d9d9;
  }
  .rc-slider-tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }
  .rc-slider-tooltip-placement-top .rc-slider-tooltip-arrow {
    bottom: 4px;
    left: 50%;
    margin-left: -4px;
    border-width: 4px 4px 0;
    border-top-color: #6c6c6c;
  }

  display: flex;

  flex-direction: column;
  align-items: center;

  display: flex;
  flex-direction: column;
  @media only screen and ${breakpoint.device.xs} {
    height: 85vh;
    justify-content: space-between;
    width: 85vw;
    margin: 15px auto;
    div#map {
      order: 1;
      height: 50vh !important;
    }
    div#colors {
      order: 2;
    }
    div#infos {
      height: 100px;
      order: 3;
      width: 300px;
    }
  }
  @media only screen and ${breakpoint.device.sm} {
    justify-content: space-between;
    padding: 20px;
    div#map {
      order: 2;
      justify-content: flex-end;
      width: 50%;
    }
    div#colors {
      order: 1;
      width: 25%;
    }
    div#infos {
      order: 3;
      width: 220px;
      align-self: end;
    }
  }
  @media only screen and ${breakpoint.device.lg} {
    justify-content: space-around;
    padding: 20px;
    padding: 100px, 0px;
  }
`;
const TopComponent = styled.div`
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
    width: 95vw;
  }
`;
const LegendWrapper = styled.div`
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

const Legend = styled.div`
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
    width: 20vw;
    justify-content: space-between;
  }
`;

const Metrics = styled.h2`
  margin: 0px;
  @media only screen and ${breakpoint.device.xs} {
    font-size: 16px;
  }
  @media only screen and ${breakpoint.device.sm} {
    font-size: 24px;
  }
`;
const DataLayers = styled.div`
  display: none;
  @media only screen and ${breakpoint.device.sm} {
    display: block;
  }
`;
const DataLabel = styled.div`
  display: none;
  font-size: 10px;
  @media only screen and ${breakpoint.device.sm} {
    display: block;
    width: 30px;
    margin-right: 10px;
  }
`;

// const Bar = styled.div`
//   width: ${props => props.ratio * 100}%;
//   background-color: darkblue;
//   height: 20px;
// `

const VerticalNeedle = styled.div`
  display: none;

  @media only screen and ${breakpoint.device.sm} {
    display: block;
    width: 1px;
    height: 10vh;
    background-color: white;
    margin: auto;
    margin-top: -10vh;
  }
`;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Handle value={value} {...restProps}>
      <VerticalNeedle />
    </Handle>
  );
};

const TempStrip = () => {
  return (
    <svg height="10" width="100%">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          {temperatureColors.map((color, idx) => {
            return (
              <stop
                key={idx}
                offset={idx / (temperatureColors.length - 1)}
                style={{
                  stopColor: color,
                  stopOpacity: 1,
                }}
              />
            );
          })}
        </linearGradient>
      </defs>
      <rect width="100%" height="15" fill="url('#grad1')" />
    </svg>
  );
};

const ZonesColors = () => {
  const [dateIndex, setDateIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  const getDensity = (areaName) => {
    return densityPeakPerDay[weatherDataDates[dateIndex]] &&
      densityPeakPerDay[weatherDataDates[dateIndex]][areaName] !== ""
      ? Math.round(
          parseFloat(densityPeakPerDay[weatherDataDates[dateIndex]][areaName])
        ) * 6
      : undefined;
  };

  useEffect(() => {
    if (dateIndex === weatherDataDates.length - 1) clearInterval(intervalId);
  }, [dateIndex, intervalId]);

  useEffect(() => {
    playSlider();
  }, []);

  const playSlider = () => {
    if (isPlaying && intervalId) {
      clearInterval(intervalId);
      setIsPlaying(false);
      return;
    }
    let intervalIds = setInterval(
      () => setDateIndex((dateIndex) => dateIndex + 1),
      200
    );
    setIntervalId(intervalIds);
    setIsPlaying(true);
  };

  const stopSlider = () => {
    if (isPlaying && intervalId) {
      clearInterval(intervalId);
      setIsPlaying(false);
      return;
    }
  };

  return (
    <Wrapper>
      <TopComponent>
        <LegendWrapper
          id="colors"
          style={{
            justifyContent: "center",
            alignItems: "end",
            minWidth: "100px",
            margin: "15px auto",
          }}
        >
          <Legend style={{ color: "lightblue" }}>Water</Legend>
          <Legend style={{ color: "red" }}>Gate</Legend>
          <Legend style={{ color: "white" }}>Fitnesstuin</Legend>
          <Legend style={{ color: "yellow" }}>Picnic</Legend>
        </LegendWrapper>

        <Row id="map">
          <MtMap>
            <Picnic amount={getDensity("Picnic")} />
            <Water amount={getDensity("SwimmingArea")} />
            <Fitness amount={getDensity("Fitness")} />
            <Gate amount={getDensity("Terrace")} />
          </MtMap>
        </Row>

        <LegendWrapper
          id="infos"
          style={{
            flexDirection: "column",
            justifyContent: "end",
            width: "220px",
            maxWidth: "300px",
            margin: "15px auto",
          }}
        >
          {markPoints[dateIndex] && (
            <>
              <Metrics>
                <a href={markPoints[dateIndex].link}>
                  {markPoints[dateIndex].label}
                </a>
              </Metrics>
              <Legend>{markPoints[dateIndex].undertitle}</Legend>
            </>
          )}
        </LegendWrapper>
      </TopComponent>

      <Row style={{ justifyContent: "space-evenly", width: "100%" }}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>temperature</div>
          <Metrics>{weatherDataAverageTemp[dateIndex]}°C</Metrics>
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            width: "200px",
          }}
        >
          <div>date</div>
          <Row>
            <Metrics style={{ width: "40px" }}>
              {weatherDataDates[dateIndex].substring(8, 11)}-
            </Metrics>
            <Metrics style={{ width: "40px" }}>
              {weatherDataDates[dateIndex].substring(5, 7)}-
            </Metrics>
            <Metrics>{weatherDataDates[dateIndex].substring(0, 4)}</Metrics>
          </Row>
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>visitors</div>
          <Metrics>{totalAmountOfVisitors[dateIndex]}</Metrics>
        </div>
      </Row>

      <Row>
        <div
          style={{
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            KhtmlUserSelect: "none",
            MozUserSelect: "none",
            MsUserSelect: "none",
            UserSelect: "none",
            WebkitTapHighlightColor: "rgba(0,0,0,0)",
            display: "flex",
            flexDirection: "column",
            width: "80vw",
          }}
        >
          <DataLayers>
            <Row style={sliderStyle}>
              <DataLabel>Crowd</DataLabel>
              <BarChart
                data={totalAmountOfVisitors}
                height="100"
                width="4000"
              />
            </Row>
            <Row style={sliderStyle}>
              <DataLabel>Temp</DataLabel>
              <TempStrip />
            </Row>
          </DataLayers>

          <Row
            onClick={stopSlider}
            style={{ ...sliderStyle, marginTop: "30px" }}
          >
            <DataLabel></DataLabel>
            <Slider
              style={{ width: "100%" }}
              marks={markPoints}
              min={0}
              max={weatherDataDates.length - 1}
              included={false}
              onChange={(value) => setDateIndex(value)}
              value={dateIndex}
              railStyle={{ backgroundColor: "darkgrey", height: 2 }}
              handleStyle={{
                borderColor: "darkgrey",
                height: 28,
                width: 28,
                marginLeft: 0,
                marginTop: -13,
                backgroundColor: "rgba(0,0,0,0)",
              }}
              dotStyle={{
                borderColor: "black",
                backgroundColor: "white",
                height: "20px",
                width: "20px",
                marginLeft: "-10px",
                bottom: "-7px",
              }}
              handle={handle}
            />
          </Row>
        </div>
        <Button onClick={playSlider}>{isPlaying ? "pause" : "play"}</Button>
      </Row>
    </Wrapper>
  );
};
export default ZonesColors;

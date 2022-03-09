import React, { useEffect, useState } from "react";
import style from "./Map/ZonesWithDots/styles";

import Slider, { Handle } from "rc-slider";

import * as d3Array from "d3-array";
import { scaleLinear } from "d3-scale";


import camData from "../content/oneyearfourcamsbyday.json";
import densityPeakPerDay from "../content/density_day.json";

import weatherData from "../content/schiphol_weather.json";

import remarkableDates, {
  isAutoPlaying,
  startingDate,
} from "../remarkableDates";

import Park from "./Map/ZonesWithDots/Park";
import Binnenhaven from "./Map/ZonesWithDots/Binnenhaven";
import Fitness from "./Map/ZonesWithDots/Fitness";
import Kade from "./Map/ZonesWithDots/Kade";
import BarChart from "./BarChart";
import SvgMapWrapper from "./Map/Map";
import { Wrapper } from "./Wrapper";
import { TempStrip } from "./TempStrip";
import { VerticalNeedle, TopComponent, LegendWrapper, Legend, Row, Metrics, DataLayers, sliderStyle, DataLabel } from "./sliderStyle";

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

export const temperatureColors = weatherDataAverageTemp.map((t) => {
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

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Handle value={value} {...restProps}>
      <VerticalNeedle />
    </Handle>
  );
};

const ZonesColors = () => {
  const [dateIndex, setDateIndex] = useState(
    startingDate ? weatherDataDates.indexOf(startingDate) : 0
  );
  const [intervalId, setIntervalId] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(isAutoPlaying);

  const getDensity = (areaName) => {
    if (
      densityPeakPerDay[weatherDataDates[dateIndex]] &&
      densityPeakPerDay[weatherDataDates[dateIndex]][areaName] !== "" &&
      densityPeakPerDay[weatherDataDates[dateIndex]][areaName] !== 0
    ) {
      const isString =
        typeof densityPeakPerDay[weatherDataDates[dateIndex]][areaName] ===
        "string";
      const amount =
        Math.ceil(
          isString
            ? parseFloat(
                densityPeakPerDay[weatherDataDates[dateIndex]][
                  areaName
                ].replace(",", ".")
              )
            : densityPeakPerDay[weatherDataDates[dateIndex]][areaName]
        ) * 6;
      return amount;
    } else {
      return undefined;
    }
  };

  useEffect(() => {
    if (dateIndex === weatherDataDates.length - 1) clearInterval(intervalId);
  }, [dateIndex, intervalId]);

  useEffect(() => {
    if (isAutoPlaying === true) {
      let intervalIds = setInterval(
        () => setDateIndex((dateIndex) => dateIndex + 1),
        200
      );
      setIntervalId(intervalIds);
      setIsPlaying(true);
    }
  }, []);

  //   const playSlider = () => {
  //     if (isPlaying === true && intervalId) {
  //       clearInterval(intervalId);
  //       setIsPlaying(false);
  //       return;
  //     }
  //     let intervalIds = setInterval(
  //       () => setDateIndex((dateIndex) => dateIndex + 1),
  //       200
  //     );
  //     setIntervalId(intervalIds);
  //     setIsPlaying(true);
  //   };

  const stopSlider = () => {
    if (isPlaying === true && intervalId) {
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
            alignItems: "start",
            minWidth: "100px",
            margin: "15px auto",
          }}
        >
          <Legend style={{ color: "lightblue" }}>Binnenhaven</Legend>
          <Legend style={{ color: "orange" }}>Kade</Legend>
          <Legend style={{ color: "yellow" }}>Fitnesstuin</Legend>
          <Legend style={{ color: "lightgreen" }}>Park / Voowerf</Legend>
        </LegendWrapper>

        <Row id="map">
          <SvgMapWrapper>
            <Binnenhaven
              amount={getDensity("SwimmingArea")}
              date={dateIndex}
            ></Binnenhaven>
            <Kade
              amount={getDensity("Terrace")}
              polygonPoints="M249.65 293.65l13.2-4.8 56.3 135.9 260 240-13.3 14.1-9-8.4v-.6h-1.2l-15 8.4-74.4-75 6.6-7.2-31.8-31.2-6.6 6.6-100.2-98.4-26.4-30-57.6-149.4"
              date={dateIndex}
            >
              <path
                id="gate"
                d="M249.65 293.65l13.2-4.8 56.3 135.9 260 240-13.3 14.1-9-8.4v-.6h-1.2l-15 8.4-74.4-75 6.6-7.2-31.8-31.2-6.6 6.6-100.2-98.4-26.4-30-57.6-149.4"
                style={style.zones}
              />
            </Kade>
            <Fitness amount={getDensity("Fitness")} date={dateIndex}></Fitness>
            <Park amount={getDensity("Picnic")} date={dateIndex}></Park>
          </SvgMapWrapper>
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
            marginBottom: "5%",
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
        {/* <Button onClick={playSlider}>{isPlaying ? "pause" : "play"}</Button> */}
      </Row>
    </Wrapper>
  );
};
export default ZonesColors;

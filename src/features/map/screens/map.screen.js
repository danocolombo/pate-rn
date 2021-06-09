import React, { useState, useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import MapView from "react-native-maps";
import styled from "styled-components/native";
import { Search } from "../components/search.component";
import { EventsContext } from "../../../services/events/events.context";
import { LocationContext } from "../../../services/location/location.context";

const window = Dimensions.get("window");
const { width, height } = window;
const LAT_DELTA = 0.922;
const LNG_DELTA = LAT_DELTA * (width / height);

console.log("LAT_DELTA: " + LAT_DELTA);
console.log("LNG_DELTA: " + LNG_DELTA);

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = () => {
  const { location } = useContext(LocationContext);
  const { events } = useContext(EventsContext);
  const [latDelta, setLatDelta] = useState(0);
  // const { viewport } = location;
  // console.log("VIEWPORT:", viewport);
  // useEffect(() => {
  // const northeastLat = viewport?.norteast?.lat;
  // const southwestLat = viewport?.southwest?.lat;
  // }, [location, viewport]);
  return (
    <>
      <Search />
      <Map>
        {events.map((event) => {
          return null;
        })}
      </Map>
    </>
  );
};

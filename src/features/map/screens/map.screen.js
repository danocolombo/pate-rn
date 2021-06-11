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
  const { lat, lng, viewport } = location;
  // console.log("VIEWPORT:", viewport);
  useEffect(() => {
    if (viewport) {
      console.log("VIEWPORT:", viewport);
      const northeastLat = viewport?.northeast?.lat;
      const southwestLat = viewport?.southwest?.lat;
      console.log("northeastLat:" + northeastLat);
      console.log("southwestLat:" + southwestLat);
      setLatDelta(northeastLat - southwestLat);
    } else {
      setLatDelta(0);
    }
  }, [location, viewport]);
  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {events.map((event) => {
          console.log("LATDELTA:" + latDelta);
          console.log("EVENT:\n", event);
          return null;
        })}
      </Map>
    </>
  );
};
{
  /*
  

*/
}

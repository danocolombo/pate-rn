import camelize from "camelize";

import { locations } from "./p8.location.mock";

export const locationRequest = (searchTerm) => {
  return new Promise((resolve, reject) => {
    console.log("location.services::locationRequest(" + searchTerm + ")");
    const locationMock = locations[searchTerm];
    if (!locationMock) {
      reject("not found");
    }
    console.log("we found it");
    console.log("locationMock:", locationMock);
    resolve(locationMock);
  });
};

export const locationTransform = (result) => {
  // console.log("result to be transformed", result);
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;
  // console.log("LAT:" + lat);
  // console.log("LNG:" + lng);
  // return geometry;
  return { lat, lng };
};

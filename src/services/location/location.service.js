import camelize from "camelize";

import { locations } from "./p8.location.mock";

export const locationRequest = (searchTerm) => {
  return new Promise((resolve, reject) => {
    // console.log("location.services::locationRequest(" + searchTerm + ")");
    const locationMock = locations[searchTerm];
    if (!locationMock) {
      reject("not found");
    }
    //==========================
    //value from p8.locations search
    //===============================
    console.log(
      "location.service - p8.location search results\n",
      locationMock
    );
    resolve(locationMock);
  });
};

export const locationTransform = (result) => {
  console.log("result to be transformed:", result);
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;
  console.log("location.service LAT:" + lat);
  console.log("location.service LNG:" + lng);
  // return geometry;
  return { lat, lng };
};

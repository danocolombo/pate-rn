import React, { useState, useEffect } from "react";

import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = React.createContext();

export const LocationContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("getActiveProjects");
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };
  useEffect(() => {
    if (!keyword.length) {
      // don't do anything
      //-----------------------------------
      // load all activeEvents
      //-----------------------------------
      // console.log("location.context::useEffect, !keyword.length");
      // locationRequest("getActiveEvents")
      //   .then(locationTransform)
      //   .then((result) => {
      //     setIsLoading(false);
      //     setLocation(result);
      //     console.log("result:", result);
      //   })
      //   .catch((err) => {
      //     setIsLoading(false);
      //     setError(err);
      //     console.log("err:" + err);
      //   });
      return;
    }
    // console.log("location.service:: we got keyword (" + keyword + ")");
    locationRequest(keyword.trim().toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setIsLoading(false);
        setLocation(result);
        console.log("location.context::locationRequest.result:", result);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        console.log("err:" + err);
      });
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        location,
        search: onSearch,
        keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

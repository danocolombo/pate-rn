import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
//import { getEventImages } from "./location.service";

export const StorageContext = React.createContext();

export const StorageContextProvider = ({ children }) => {
  const [eventImages, setEventImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //-----------------------------
  // tutorial: https://www.youtube.com/watch?v=LWhnS5elz4o
  //-----------------------------
  //this can move to services once functioning....
  const getS3EventImages = async () => {
    let imageKeys = await Storage.list("");
    imageKeys = await Promise.all(
      imageKeys.map(async (k) => {
        const signedUrl = await Storage.get(k.key);
        return signedUrl;
      })
    );
    console.log("[--imageKeys[1]--]\n", imageKeys[1]);
    setEventImages(imageKeys);
    // console.log("[==eventImages count===] " + eventImages.length);
  };
  useEffect(() => {
    getS3EventImages();
  }, []);

  return (
    <StorageContext.Provider
      value={{
        isLoading,
        error,
        eventImages,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
//import { getEventImages } from "./location.service";

export const StorageContext = React.createContext();

export const StorageContextProvider = ({ children }) => {
  const [eventImages, setEventImages] = useState([]);
  const [eventImage, setEventImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //-----------------------------
  // tutorial: https://www.youtube.com/watch?v=LWhnS5elz4o
  //-----------------------------
  //this can move to services once functioning....
  //sample of img
  // "public/events/7c720d14382cde084f03be60d398a0c6EventSample2Day.png"
  const getS3EventImage = async (img) => {
    let tempImage =
      "public/events/7c720d14382cde084f03be60d398a0c6EventSample2Day.png";
    let signedUrl = "";
    await Storage.get(tempImage).then((data) => {
      console.log("DATA:", data);
      signedUrl = data;
    });
    console.log("SIGNED-SIGNED....\n", signedUrl);
    setEventImage(signedUrl);
  };
  const getS3EventImages2 = async () => {
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
    //getS3EventImages();
    getS3EventImage();
  }, []);

  return (
    <StorageContext.Provider
      value={{
        isLoading,
        error,
        eventImages,
        eventImage,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

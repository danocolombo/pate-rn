import React, { useState, createContext, useEffect, useContext } from "react";

import {
  registrationsRequest,
  registrationsTransform,
} from "./registrations.service";
import { LocationContext } from "../location/location.context";
// import { locations } from "../location/p8.location.mock";

export const RegistrationsContext = createContext();

//the 3 values for the context.
// 1. the events
// 2. indicator whether it is loading or not
// 3. any errors that might be experienced.
export const RegistrationsContextProvider = ({ children }) => {
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  const retrieveRegistrations = (loc) => {
    setIsLoading(true);
    setRegistrations([]);
    // console.log("events.context::retrieveActiveEvents(" + loc + ")");
    //setTimeout is only simulating API call, not necessary when using API
    setTimeout(() => {
      registrationsRequest(loc)
        .then(registrationsTransform)
        .then((results) => {
          setIsLoading(false);
          setRegistrations(results);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 2000);
  };
  // ON MOUNT....
  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      console.log(
        "registrations.context::useEffect.locationString: " + locationString
      );
      retrieveRegistrations(locationString);
    } else {
      //no location defined, display all activeEvents
      console.log("registrations.context - defaulting to Blue Ridge");
      const locationString = "34.8941975,-84.3483716";
      retrieveRegistrations(locationString);
    }
  }, [location]);

  return (
    <RegistrationsContext.Provider
      value={{
        registrations,
        isLoading,
        error,
      }}
    >
      {children}
    </RegistrationsContext.Provider>
  );
};
// events: [
//     { id: 1, name: "Jones" },
//     { id: 2, name: "Smith" },
//     { id: 3, name: "Wills" },
//   ],

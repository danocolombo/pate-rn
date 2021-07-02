import React, { useState, createContext, useEffect, useContext } from "react";

import {
  registrationsRequest,
  registrationsTransform,
} from "./registrations.service";
import { AuthenticationContext } from "../authentication/authentication.context";
//import { LocationContext } from "../location/location.context";
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
  //const { location } = useContext(LocationContext);
  const { user } = useContext(AuthenticationContext);

  const retrieveRegistrations = (u) => {
    setIsLoading(true);
    setRegistrations([]);
    console.log(
      "registrations.context::retrieveRegistrations for " + u.user.uid
    );
    //setTimeout is only simulating API call, not necessary when using API
    setTimeout(() => {
      registrationsRequest(u.user.uid)
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
    // get the registrations for the current user
    retrieveRegistrations(user);
  }, []);

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

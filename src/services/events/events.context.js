import React, { useState, createContext, useEffect, useContext } from "react";

import { eventsRequest, eventsTransform } from "./events.service";
import { LocationContext } from "../location/location.context";
// import { locations } from "../location/p8.location.mock";

export const EventsContext = createContext();

//the 3 values for the context.
// 1. the events
// 2. indicator whether it is loading or not
// 3. any errors that might be experienced.
export const EventsContextProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  const retrieveActiveEvents = (loc) => {
    setIsLoading(true);
    setEvents([]);
    // console.log("events.context::retrieveActiveEvents(" + loc + ")");
    //setTimeout is only simulating API call, not necessary when using API
    setTimeout(() => {
      eventsRequest(loc)
        .then(eventsTransform)
        .then((results) => {
          setIsLoading(false);
          setEvents(results);
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
      console.log("event.context::useEffect.locationString: " + locationString);
      retrieveActiveEvents(locationString);
    } else {
      //no location defined, display all activeEvents
      console.log("events.context - defaulting to Blue Ridge");
      const locationString = "34.8941975,-84.3483716";
      retrieveActiveEvents(locationString);
    }
  }, [location]);

  return (
    <EventsContext.Provider
      value={{
        events,
        isLoading,
        error,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
// events: [
//     { id: 1, name: "Jones" },
//     { id: 2, name: "Smith" },
//     { id: 3, name: "Wills" },
//   ],

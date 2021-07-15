import React, { useState, createContext, useEffect, useContext } from "react";

import { getSignedUrls, eventsActive } from "./events.service";
import { LocationContext } from "../location/location.context";

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

  const getActiveEvents = async () => {
    // get all the active events to display
    // we want to add .then(getSignedUrls)
    setIsLoading(true);
    eventsActive()
      .then(async (results) => {
        setIsLoading(false);
        setEvents(results);
        await getSignedUrls(events);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };
  // ON MOUNT....
  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      console.log(
        "event.context::useEffect.locationString: " +
          locationString +
          " NOT IMPLEMENTED"
      );
    } else {
      //no location defined, display all activeEvents
      getActiveEvents();
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

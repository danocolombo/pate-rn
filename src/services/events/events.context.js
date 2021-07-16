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
   const loadNoEvents = async () => {
     //-------------------------------------
     // this loads the generic "no events"
     // into the events array
     //-------------------------------------
     const noEvents = {
       graphic: "NoEvents.png",
       churchName: "Check back again"
     }
     setEvents(noEvents);
   }
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
      //check the number of events active. If zero, set
      //graphic to display "No Events"
      console.log("[--0000--] events count: ", events.length);
      console.log("[--0001--] events type: " + typeof events);
      console.log("[--0002--] events:\n", events);
    }
  }, [location]);

  return (
    <EventsContext.Provider
      value={{
        events,
        isLoading,
        loadNoEvents,
        error,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

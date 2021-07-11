import React, { useState, createContext, useEffect, useContext } from "react";

import {
  eventsRequest,
  eventsTransform,
  eventsActive,
  eventsTransform0,
} from "./events.service";
import { LocationContext } from "../location/location.context";
// import { locations } from "../location/p8.location.mock";

export const EventsContext = createContext();

//the 3 values for the context.
// 1. the events
// 2. indicator whether it is loading or not
// 3. any errors that might be experienced.
export const EventsContextProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [p8Events, setP8Events] = useState([]);
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
        .then(eventsTransform0)
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
  const getActiveEvents = async () => {
    // get all the active events to display
    setIsLoading(true);
    const pe = await eventsActive();
    console.log("pe results:", pe);
    // eventsActive()
    //   .then((results) => {
    //     console.log("made it past transform");
    //     console.log("############################");
    //     console.log(results);
    //     console.log("############################");
    //     setP8Events(results);
    //     p8Events.map((pe) => {
    //       console.log("p8Events.eventDate", pe.eventDate);
    //     });
    //     setIsLoading(false);
    //     setEvents(results);
    //     events.map((ev) => {
    //       console.log("event::eventDate: ", ev.eventDate);
    //     });
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     setError(err);
    //   });
  };
  // ON MOUNT....
  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      console.log("event.context::useEffect.locationString: " + locationString);
      retrieveActiveEvents(locationString);
    } else {
      //no location defined, display all activeEvents
      getActiveEvents();
      //const locationString = "34.8941975,-84.3483716";
      // retrieveActiveEvents(locationString);
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

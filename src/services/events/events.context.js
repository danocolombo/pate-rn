import React, { useState, createContext, useEffect, useMemo } from "react";

import { eventsRequest, eventsTransform } from "./events.service";

export const EventsContext = createContext();

//the 3 values for the context.
// 1. the events
// 2. indicator whether it is loading or not
// 3. any errors that might be experienced.
export const EventsContextProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const retrieveActiveEvents = () => {
    setIsLoading(true);
    //setTimeout is only simulating API call, not necessary when using API
    setTimeout(() => {
      eventsRequest("34.1724388,-83.8384051")
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
    retrieveActiveEvents();
  }, []);

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

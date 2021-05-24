import React, { useState, createContext, useEffect, useMemo } from "react";

import { eventsRequest, eventsTransform } from "./events.service";

export const EventsContext = createContext();

export const EventsContextProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const retrieveEvents = () => {
    setIsLoading(true);
    setTimeout(() => {
      eventsRequest()
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
  useEffect(() => {
    retrieveEvents();
  }, []);
  //   console.log("===============vvvvv==============");
  //   console.log(events);
  //   console.log("----------------^^^^^^^^^^^--------------");
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

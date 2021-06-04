import React from "react";

import { EventInfoCard } from "../components/event-card.component";

import { SafeArea } from "../../../components/utility/safe-area.component";

export const EventDetailScreen = ({ route }) => {
  const { rally } = route.params;
  return (
    <SafeArea>
      <EventInfoCard rally={rally} />
    </SafeArea>
  );
};

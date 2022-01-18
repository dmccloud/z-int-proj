import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";

import { EventTile, Header, Loading } from "../components";

export const GET_EVENTS = gql`
  query GetEvents($pageNum: Int) {
    events(pageNum: $pageNum) {
      id
      name
      url
      image
      start
      Venue {
        name
        city
        address
      }
      isBooked
    }
  }
`;

interface EventsProps {}

const Events: React.FC<EventsProps> = () => {
  const { data, loading, error } = useQuery<any>(GET_EVENTS);

  if (loading) return <Loading />;
  if (error || !data) return <p>ERROR</p>;

  return (
    <>
      <Header />
      {data.events &&
        data.events.map((event: any) => (
          <EventTile key={event.id} event={event} />
        ))}
    </>
  );
};

export default Events;

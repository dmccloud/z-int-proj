import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";

import { Loading, Header, EventDetail } from "../components";
import { ActionButton } from "../containers";
import { useParams } from "react-router-dom";

export const GET_EVENT_DETAILS = gql`
  query GetEvent($eventId: ID!) {
    event(id: $eventId) {
      name
      start
      Venue {
        name
        city
        address
        lat
        lon
      }
      id
      url
      image
      isBooked
    }
  }
`;

interface EventProps {
  eventId?: any;
}

const Event: React.FC<EventProps> = (props?: any) => {
  const { id } = useParams();
  const eventId = id;
  const { data, loading, error } = useQuery<any>(GET_EVENT_DETAILS, {
    variables: { eventId },
  });

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      <Header image={data.event.image}></Header>
      <div className="block m-auto items-center">
        <EventDetail {...data.event} />
        <ActionButton {...data.event} />
      </div>
    </Fragment>
  );
};

export default Event;

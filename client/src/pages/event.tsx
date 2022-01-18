import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";

import { Loading, Header, EventDetail } from "../components";
import { ActionButton } from "../containers";
import { RouteComponentProps } from "@reach/router";

export const GET_EVENT_DETAILS = gql`
  query Event($eventId: ID!) {
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

interface EventProps extends RouteComponentProps {
  eventId?: any;
}

const Launch: React.FC<EventProps> = ({ eventId }) => {
  const { data, loading, error } = useQuery<any>(GET_EVENT_DETAILS, {
    variables: { eventId },
  });

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;
  console.log(data.event);

  return (
    <Fragment>
      <Header image={data.image}>
        {data && data.event && data.event.name && data.event.Venue.name}
      </Header>
      <EventDetail {...data.event} />
      <ActionButton {...data.event} />
    </Fragment>
  );
};

export default Launch;

import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";
import { Loading, Header, EventTile } from "../components";
import { RouteComponentProps } from "@reach/router";

export const GET_MY_EVENTS = gql`
  query GetMyevents {
    me {
      id
      email
      token
      events {
        id
        name
        url
        image
        start
        Venue {
          name
          city
          address
          lat
          lon
        }
        isBooked
      }
    }
  }
`;

interface ProfileProps extends RouteComponentProps {}

const Profile: React.FC<ProfileProps> = () => {
  const { data, loading, error } = useQuery<any>(GET_MY_EVENTS, {
    fetchPolicy: "network-only",
  });
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data === undefined) return <p>ERROR</p>;

  return (
    <Fragment>
      <Header>My Events</Header>
      {data.me && data.me.events.length ? (
        data.me.events.map((event: any) => (
          <EventTile key={event.id} event={event} />
        ))
      ) : (
        <p>You haven't booked any events</p>
      )}
    </Fragment>
  );
};

export default Profile;

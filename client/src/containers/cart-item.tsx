import React from "react";
import { gql, useQuery } from "@apollo/client";
import EventTile from "../components/event-tile";

export const GET_EVENT = gql`
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

interface CartItemProps {
  eventId: string;
}

const CartItem: React.FC<CartItemProps> = ({ eventId }) => {
  const { data, loading, error } = useQuery<any>(GET_EVENT, {
    variables: { eventId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;
  return data.event && <EventTile event={data.event} />;
};

export default CartItem;

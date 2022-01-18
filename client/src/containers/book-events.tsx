import React from "react";
import { gql, useMutation } from "@apollo/client";

import Button from "../components/button";
import { cartItemsVar } from "../cache";

export const BOOK_EVENTS = gql`
  mutation Mutation($eventIds: [ID]!) {
    bookEvents(eventIds: $eventIds) {
      success
      message
      events {
        name
        id
        isBooked
      }
    }
  }
`;

const BookEvents: React.FC<any> = ({ cartItems }) => {
  const [bookEvents, { data }] = useMutation<any>(BOOK_EVENTS, {
    variables: { eventIds: cartItems },
  });

  return data && data.bookEvents && !data.bookEvents.success ? (
    <p data-testid="message">{data.bookEvents.message}</p>
  ) : (
    <Button
      onClick={async () => {
        await bookEvents();
        cartItemsVar([]);
      }}
      data-testid="book-button"
    >
      Book All
    </Button>
  );
};

export default BookEvents;

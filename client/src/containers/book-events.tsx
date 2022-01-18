import React from "react";
import { gql, useMutation } from "@apollo/client";

import { cartItemsVar } from "../cache";

export const BOOK_EVENTS = gql`
  mutation BookEvents($eventIds: [ID]!) {
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

interface BookEventsProps {
  cartItems: any;
}

const BookEvents: React.FC<BookEventsProps> = ({ cartItems }) => {
  const [bookEvents, { data }] = useMutation<any>(BOOK_EVENTS, {
    variables: { eventIds: cartItems },
  });

  return data && data.bookEvents && !data.bookEvents.success ? (
    <p data-testid="message">{data.bookEvents.message}</p>
  ) : (
    <button
      className=" mb-5 h-10 px-10 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
      onClick={async () => {
        await bookEvents();
        cartItemsVar([]);
      }}
      data-testid="book-button"
    >
      Book All
    </button>
  );
};

export default BookEvents;

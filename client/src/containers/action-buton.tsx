import React from "react";
import { gql, useMutation, useReactiveVar, Reference } from "@apollo/client";
import { cartItemsVar } from "../cache";

export const CANCEL_EVENT = gql`
  mutation CancelEvent($eventId: ID!) {
    cancelEvent(eventId: $eventId) {
      success
      message
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

interface ActionButtonProps {
  id: any;
}

const CancelEventButton: React.FC<ActionButtonProps> = ({ id }) => {
  const [mutate, { loading, error }] = useMutation(CANCEL_EVENT, {
    variables: { eventId: id },
    update(cache, { data: { cancelEvent } }) {
      // Update the user's cached list of events to remove the events that
      // was just canceled.
      const event = cancelEvent.events[0];
      cache.modify({
        id: cache.identify({
          __typename: "User",
          id: localStorage.getItem("userId"),
        }),
        fields: {
          events(existingEvents: Reference[], { readField }) {
            return existingEvents.filter(
              (eventRef) => readField("id", eventRef) !== event.id
            );
          },
        },
      });
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <div>
      <button
        className=" mb-5 h-10 px-10 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
        onClick={() => mutate()}
        data-testid={"action-button"}
      >
        Cancel This Event
      </button>
    </div>
  );
};

const ToggleEventButton: React.FC<ActionButtonProps> = ({ id }) => {
  const cartItems = useReactiveVar(cartItemsVar);
  const isInCart = id ? cartItems.includes(id) : false;
  return (
    <div>
      <button
        className=" mb-5 h-10 px-10 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
        onClick={() => {
          if (id) {
            cartItemsVar(
              isInCart
                ? cartItems.filter((itemId) => itemId !== id)
                : [...cartItems, id]
            );
          }
        }}
        data-testid={"action-button"}
      >
        {isInCart ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

const ActionButton: React.FC<any> = ({ isBooked, id }) =>
  isBooked ? <CancelEventButton id={id} /> : <ToggleEventButton id={id} />;

export default ActionButton;

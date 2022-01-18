import React, { useContext } from "react";
import { gql, useMutation, Reference, useReactiveVar } from "@apollo/client";
import Button from "../components/button";
import { cartItemsVar } from "../cache";
import { CartContext } from "../CartContext";

export const CANCEL_EVENT = gql`
  mutation Cancel($eventId: ID!) {
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

interface ActionButtonProps extends Partial<any> {}

const CancelEventButton: React.FC<ActionButtonProps> = ({ id }) => {
  const [mutate, { loading, error }] = useMutation(CANCEL_EVENT, {
    variables: { eventId: id },
    update(cache, { data: { cancelTrip } }) {
      // Update the user's cached list of trips to remove the trip that
      // was just canceled.
      const launch = cancelTrip.events[0];
      cache.modify({
        id: cache.identify({
          __typename: "User",
          id: localStorage.getItem("userId"),
        }),
        fields: {
          events(existingEvents: Reference[], { readField }) {
            return existingEvents.filter(
              (eventRef) => readField("id", eventRef) !== launch.id
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
      <Button onClick={() => mutate()} data-testid={"action-button"}>
        Cancel This Event
      </Button>
    </div>
  );
};

const ToggleEventButton: React.FC<ActionButtonProps> = ({ id }) => {
  const cartItems = useReactiveVar(cartItemsVar);
  const isInCart = id ? cartItems.includes(id) : false;

  return (
    <div>
      <button
        onClick={() => {
          if (id) {
            cartItemsVar(
              isInCart
                ? cartItems.filter((itemId: any) => itemId !== id)
                : [...cartItems, id]
            );
          }
          console.log(cartItems);
        }}
        data-testid={"action-button"}
      >
        {isInCart ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

const ActionButton: React.FC<ActionButtonProps> = ({ isBooked, id }) =>
  isBooked ? <CancelEventButton id={id} /> : <ToggleEventButton id={id} />;

export default ActionButton;

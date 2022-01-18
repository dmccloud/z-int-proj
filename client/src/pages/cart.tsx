import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";

import { Header, Loading } from "../components";
import { CartItem, BookEvents } from "../containers";

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

interface CartProps {}

const Cart: React.FC<CartProps> = () => {
  const { data, loading, error } = useQuery<any>(GET_CART_ITEMS);

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <Fragment>
      <Header>My Cart</Header>
      {data?.cartItems.length === 0 ? (
        <p data-testid="empty-message">No items in your cart</p>
      ) : (
        <Fragment>
          {data?.cartItems.map((eventId: any) => (
            <CartItem key={eventId} eventId={eventId} />
          ))}
          <BookEvents cartItems={data?.cartItems || []} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;

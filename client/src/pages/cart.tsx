import React, { Fragment, useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { Header, Loading } from "../components";
import { CartItem, BookEvents } from "../containers";
import { RouteComponentProps } from "@reach/router";
import { CartContext } from "../CartContext";

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

interface CartProps extends RouteComponentProps {}

const Cart: React.FC<CartProps> = () => {
  const { data, loading, error } = useQuery<any>(GET_CART_ITEMS);
  console.log(data);
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

import React, { Fragment, useMemo, useState } from "react";
import { Router } from "@reach/router";

import Event from "./event";
import Events from "./events";
import Cart from "./cart";
import Profile from "./profile";
import { Footer, PageContainer } from "../components";
import { CartContext } from "../CartContext";

export default function Pages() {
  const [cart, setCart] = useState([]);
  const ContextProvider = useMemo<any>(
    () => ({ cart, setCart }),
    [cart, setCart]
  );
  return (
    <CartContext.Provider value={ContextProvider}>
      <Fragment>
        <PageContainer>
          <Router primary={false} component={Fragment}>
            <Events path="/" />
            <Event path="event/:eventId" />
            <Cart path="cart" />
            <Profile path="profile" />
          </Router>
        </PageContainer>
        <Footer />
      </Fragment>
    </CartContext.Provider>
  );
}

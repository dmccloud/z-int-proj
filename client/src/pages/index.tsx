import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Event from "./event";
import Events from "./events";
import Cart from "./cart";
import Profile from "./profile";
import { Footer, PageContainer } from "../components";

export default function Pages(props: any) {
  return (
    <BrowserRouter>
      <Fragment>
        <PageContainer>
          <Routes>
            <Route path="/" element={<Events />} />
            <Route path="/event/:id" element={<Event />} />

            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </PageContainer>

        <Footer />
      </Fragment>
    </BrowserRouter>
  );
}

import React from "react";
import { useApolloClient } from "@apollo/client";

import { isLoggedInVar } from "../cache";
import { ReactComponent as ExitIcon } from "../assets/icons/exit.svg";

const LogoutButton = () => {
  const client = useApolloClient();
  return (
    <button
      className=" grow w-0 uppercase text-center bg-none border-none p-0 items-center"
      data-testid="logout-button"
      onClick={() => {
        // Since we're logging out, remove all traces of the current from the cache.
        client.cache.evict({ fieldName: "me" });
        // extra garbage collection
        client.cache.gc();

        // Remove user details from localStorage.
        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        // Let other parts of the application that are relying on logged in
        // state know we're now logged out.
        isLoggedInVar(false);
      }}
    >
      <svg className="h-24">
        <ExitIcon />
      </svg>
    </button>
  );
};

export default LogoutButton;

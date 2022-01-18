import { InMemoryCache, Reference, makeVar } from "@apollo/client";
import { persistCache } from "apollo-cache-persist";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        cartItems: {
          read() {
            return cartItemsVar();
          },
        },
        events: {
          keyArgs: false,
          merge(existing, incoming) {
            let events: Reference[] = [];
            if (existing && existing.events) {
              events = events.concat(existing.events);
            }
            if (incoming && incoming.events) {
              events = events.concat(incoming.events);
            }
            return {
              ...incoming,
              events,
            };
          },
        },
      },
    },
  },
});

persistCache<any>({
  cache,
  storage: window.localStorage,
});

export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem("token"));
export const cartItemsVar = makeVar<string[]>([]);

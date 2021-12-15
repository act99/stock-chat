import {
  split,
  HttpLink,
  makeVar,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { userInfo } from "os";
import { SubscriptionClient } from "subscriptions-transport-ws";
import ws from "ws";

export const isLoggedInVar = makeVar(false);

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

// const wsLink = new WebSocketLink({
//   uri: "ws://localhost:4000/graphql",
//   options: {
//     reconnect: true,
//     connectionParams: () => ({}),
//   },
// });

// const wsLink = new WebSocketLink({
//   uri: "ws://localhost:4000/graphql",
//   options: {
//     reconnect: true,
//     connectionParams: {},
//   },
// });

// const splitLink = process.browser
//   ? split(
//       ({ query }) => {
//         const definition = getMainDefinition(query);
//         return (
//           definition.kind === "OperationDefinition" &&
//           definition.operation === "subscription"
//         );
//       },
//       wsLink,
//       httpLink
//     )
//   : httpLink;

// export const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });

export const client = new ApolloClient({
  // link: link,

  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return false;
              // Boolean(localStorage.getItem("token"));
            },
          },
        },
      },
    },
  }),
});

import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

export const isLoggedInVar = makeVar(false);

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000/graphql/subscriptions`,
//   options: {
//     reconnect: true,
//   },
// });

// const wsLink = process.browser
//   ? new WebSocketLink({
//       uri: "ws://localhost:4000/graphql/subscriptions",
//       options: {
//         reconnect: true,
//       },
//     })
//   : null;
// if (wsLink) {
//   console.log("connected");
// }

export const client = new ApolloClient({
  // link: link,
  uri: "http://localhost:4000/graphql",
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

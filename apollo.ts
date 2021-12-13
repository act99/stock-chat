import {
  ApolloClient,
  createHttpLink,
  HttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

export const isLoggedInVar = makeVar(false);

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000/graphql`,
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

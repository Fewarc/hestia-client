import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
  from,
} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';

import App from './App';
import reducers from './reducers';

import './i18n';
import './index.css';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
});

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_URL as string
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription' 
    );
  },
  wsLink,
  httpLink,
);

const links = from([
  splitLink, uploadLink
]);

const client = new ApolloClient({
  link: links,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

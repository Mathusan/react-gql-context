import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import './styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { ApolloProvider } from '@apollo/client';
import apolloClient from './graphql/apolloClient';
import {AuthProvider} from './context/AuthProvider'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={apolloClient}>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
    </ApolloProvider>
);



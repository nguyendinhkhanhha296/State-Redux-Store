import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import OrderHistory from "./pages/OrderHistory";
import Success from "./pages/Success";

// importing redux provider and store 
import { Provider } from 'react-redux';
import store from './utils/store';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
        <Provider store={store}>
          <Nav />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/orderHistory" element={<OrderHistory />} />
            <Route exact path="/products/:id" element={<Detail />} />
            <Route exact path="/success" element={<Success />} />
            <Route element={<NoMatch />} />
          </Routes>
          </Provider>
        </div>
      </Router>
    </ApolloProvider>

  );
}

export default App;
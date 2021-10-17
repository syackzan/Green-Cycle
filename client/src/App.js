// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // createHttpLink,
} from '@apollo/client'
// import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route} from 'react-router-dom';

//Importing All Components & Pages
import GreenCycle from './components/GreenCycle/GreenCycle'

// const httpLink = createHttpLink({
//   uri: './graphql',
// });

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <GreenCycle />
      </Router>
    </ApolloProvider>
  );
}

export default App;

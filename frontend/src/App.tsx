import React, { useMemo } from 'react';
import { ChakraProvider, Heading } from '@chakra-ui/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Users from './pages/Users';
import Questions from './pages/Questions';

const App = () => {
    const client = useMemo(
        () =>
            new ApolloClient({
                uri: `http://${window.location.hostname}:4000/graphql`,
                cache: new InMemoryCache(),
            }),
        [],
    );
    return (
        <ChakraProvider>
            <ApolloProvider client={client}>
                <Heading as="h1">Users</Heading>
                <Users />
                <Heading as="h1">Questions</Heading>
                <Questions />
            </ApolloProvider>
        </ChakraProvider>
    );
};

export default App;

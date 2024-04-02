import React, { useMemo } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AppPageProvider from './contexts/AppPageContext';
import AppContents from './AppContents';

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
                <AppPageProvider>
                    <AppContents />
                </AppPageProvider>
            </ApolloProvider>
        </ChakraProvider>
    );
};

export default App;

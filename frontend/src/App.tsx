import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';

const App = () => {
    return (
        <ChakraProvider>
            <Box p={4}>Test</Box>
        </ChakraProvider>
    );
};

export default App;

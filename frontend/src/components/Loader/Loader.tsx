import React from 'react';
import { Flex } from '@chakra-ui/react';
import { DNA } from 'react-loader-spinner';

// TODO: fix type error
// @ts-ignore: For some reason this has "'DNA' cannot be used as a JSX component."
const Loader = () => (
    <Flex justifyContent="center">
        <DNA visible height="80" width="80" ariaLabel="loading" />
    </Flex>
);

export default Loader;

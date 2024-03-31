import React from 'react';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';

const Error = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => (
    <Alert status="error">
        <AlertIcon />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
    </Alert>
);

export default Error;

import React from 'react';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
    CloseButton,
} from '@chakra-ui/react';

const Error = ({
    title,
    description,
    showClose = false,
    onClose = () => {},
}: {
    title: string;
    description: string;
    showClose?: boolean;
    onClose?: () => void;
}) => (
    <Alert status="error">
        <AlertIcon />
        <Box flexGrow={1}>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Box>
        {showClose && (
            <CloseButton
                alignSelf="flex-start"
                position="relative"
                right={-1}
                top={-1}
                onClick={onClose}
            />
        )}
    </Alert>
);

export default Error;

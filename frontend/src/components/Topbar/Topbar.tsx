import { Button, Container, Flex } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { AppPageContext } from '../../contexts/AppPageContext';

const Topbar = () => {
    const { setPage } = useContext(AppPageContext);
    return (
        <Container size="lg">
            <Flex my={2}>
                <Button mx={2} onClick={() => setPage('users')}>
                    Users
                </Button>
                <Button mx={2} onClick={() => setPage('questions')}>
                    Questions
                </Button>
            </Flex>
        </Container>
    );
};

export default Topbar;

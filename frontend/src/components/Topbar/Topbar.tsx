import { Button, Container, Flex, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { AppPageContext } from '../../contexts/AppPageContext';

const Topbar = () => {
    const { setPage } = useContext(AppPageContext);
    return (
        <Container size="lg" my={2}>
            <Flex justifyContent="space-between" alignItems="center">
                <Text my={2} fontWeight="bold">
                    Questions Answers App
                </Text>
                <Flex my={2}>
                    <Button mx={2} onClick={() => setPage('users')}>
                        Users
                    </Button>
                    <Button mx={2} onClick={() => setPage('questions')}>
                        Questions
                    </Button>
                </Flex>
            </Flex>
        </Container>
    );
};

export default Topbar;

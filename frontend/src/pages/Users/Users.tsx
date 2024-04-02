import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { VStack, Box, Heading } from '@chakra-ui/react';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import { GetUsersQuery } from '../../__generated__/types/graphql';

export const getUsersQuery = gql`
    query GetUsers {
        users {
            id
            name
        }
    }
`;

const Users = () => {
    const { loading, error, data } = useQuery<GetUsersQuery>(getUsersQuery);

    if (loading) {
        return <Loader />;
    }
    if (error) {
        return (
            <Error title="Error loading users" description={error.message} />
        );
    }

    return (
        <>
            <Heading as="h1" mb={3}>
                Users
            </Heading>
            <VStack
                alignItems="flex-start"
                sx={{
                    '& > div:nth-of-type(even)': {
                        bg: 'blackAlpha.100',
                    },
                }}
            >
                {data?.users.map(({ id, name }) => (
                    <Box key={id} p={2} w="100%">
                        {name}
                    </Box>
                ))}
            </VStack>
        </>
    );
};

export default Users;

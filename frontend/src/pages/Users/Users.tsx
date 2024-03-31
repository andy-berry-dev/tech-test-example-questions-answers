import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { VStack, Box } from '@chakra-ui/react';
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
        <VStack px={3} py={4} alignItems="flex-start">
            {data?.users.map(({ id, name }) => <Box key={id}>{name}</Box>)}
        </VStack>
    );
};

export default Users;

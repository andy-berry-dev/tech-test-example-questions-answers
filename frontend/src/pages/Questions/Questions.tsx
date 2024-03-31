import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { VStack, Box } from '@chakra-ui/react';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import { GetQuestionsQuery } from '../../__generated__/types/graphql';

export const getQuestionsQuery = gql`
    query GetQuestions {
        questions {
            id
            text
        }
    }
`;

const Questions = () => {
    const { loading, error, data } =
        useQuery<GetQuestionsQuery>(getQuestionsQuery);

    if (loading) {
        return <Loader />;
    }
    if (error) {
        return (
            <Error
                title="Error loading questions"
                description={error.message}
            />
        );
    }

    return (
        <VStack px={3} py={4} alignItems="flex-start">
            {data?.questions.map(({ id, text }) => <Box key={id}>{text}</Box>)}
        </VStack>
    );
};

export default Questions;

import React, { useCallback, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import {
    VStack,
    Box,
    Heading,
    Flex,
    Input,
    Button,
    Text,
} from '@chakra-ui/react';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import {
    GetQuestionsQuery,
    AddQuestionMutation,
    AddQuestionMutationVariables,
} from '../../__generated__/types/graphql';

export const getQuestionsQuery = gql`
    query GetQuestions {
        questions {
            id
            text
        }
    }
`;
export const addQuestionMutation = gql`
    mutation AddQuestion($text: String!) {
        addQuestion(text: $text) {
            id
            text
        }
    }
`;

const Questions = () => {
    const { loading, error, data } = useQuery<GetQuestionsQuery>(
        getQuestionsQuery,
        { notifyOnNetworkStatusChange: true },
    );
    const [
        addQuestion,
        {
            data: addQuestionData,
            loading: addQuestionLoading,
            error: addQuestionError,
            reset: resetAddQuestionMutation,
        },
    ] = useMutation<AddQuestionMutation, AddQuestionMutationVariables>(
        addQuestionMutation,
        {
            // TODO: this would be a nicer UX if we changed the local cache instead of refetching
            refetchQueries: [getQuestionsQuery],
        },
    );
    const [newQuestionText, setNewQuestionText] = useState<string>('');

    const addQuestionCallback = useCallback(async () => {
        if (newQuestionText.length < 1) {
            return;
        }
        await addQuestion({ variables: { text: newQuestionText } });
        setNewQuestionText('');
    }, [addQuestion, newQuestionText]);

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
        <>
            <Flex justifyContent="space-between">
                <Heading as="h1">Questions</Heading>
            </Flex>
            <VStack px={3} py={4} alignItems="flex-start">
                {data?.questions.map(({ id, text }) => (
                    <Box key={id}>{text}</Box>
                ))}
                <Flex>
                    <Input
                        value={newQuestionText}
                        onChange={(e) => setNewQuestionText(e.target.value)}
                        data-testid="question-input"
                    />
                    <Button
                        onClick={addQuestionCallback}
                        isLoading={addQuestionLoading}
                        loadingText="Adding question..."
                        isDisabled={newQuestionText.length < 1}
                    >
                        Add Question
                    </Button>
                </Flex>
                {addQuestionData && (
                    <Text as="i">A new question was added!</Text>
                )}
                {addQuestionLoading && <Text as="i">Adding question...</Text>}
                {addQuestionError && (
                    <Error
                        title="Error adding a question"
                        description={addQuestionError.message}
                        showClose
                        onClose={() => resetAddQuestionMutation()}
                    />
                )}
            </VStack>
        </>
    );
};

export default Questions;

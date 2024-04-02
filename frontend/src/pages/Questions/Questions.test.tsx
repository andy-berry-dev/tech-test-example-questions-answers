import React from 'react';
import {
    act,
    getByText,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider, MockedProviderProps } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';
import Questions, { addQuestionMutation, getQuestionsQuery } from './Questions';
import { GetQuestionsQuery } from '../../__generated__/types/graphql';

describe('Questions page', () => {
    it('renders a list of questions', async () => {
        const graphlMocks: MockedProviderProps['mocks'] = [
            {
                request: {
                    query: getQuestionsQuery,
                },
                result: {
                    data: {
                        questions: [
                            { id: '1', text: 'what is your favourite colour?' },
                            { id: '2', text: 'what is your favourite food?' },
                        ],
                    } as GetQuestionsQuery,
                },
            },
        ];
        render(
            <MockedProvider mocks={graphlMocks} addTypename={false}>
                <Questions />
            </MockedProvider>,
        );
        await waitFor(() => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
        });
        expect(
            screen.getByText('what is your favourite colour?'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('what is your favourite food?'),
        ).toBeInTheDocument();
    });

    it('renders a spinner while loading', async () => {
        const graphlMocks: MockedProviderProps['mocks'] = [
            {
                request: {
                    query: getQuestionsQuery,
                },
                result: {
                    data: {
                        questions: [],
                    } as GetQuestionsQuery,
                },
                delay: 500,
            },
        ];
        render(
            <MockedProvider mocks={graphlMocks} addTypename={false}>
                <Questions />
            </MockedProvider>,
        );
        expect(screen.queryByRole('progressbar')).toBeInTheDocument();
    });

    it('handles server errors', async () => {
        const graphlMocks: MockedProviderProps['mocks'] = [
            {
                request: {
                    query: getQuestionsQuery,
                },
                result: {
                    data: [],
                    errors: [new GraphQLError('Something went wrong')],
                },
                delay: 500,
            },
        ];
        render(
            <MockedProvider mocks={graphlMocks} addTypename={false}>
                <Questions />
            </MockedProvider>,
        );
        await waitFor(() => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
        });
        const errorDialog = await screen.findByRole('alert');

        expect(
            getByText(errorDialog, 'Error loading questions'),
        ).toBeInTheDocument();
        expect(
            getByText(errorDialog, 'Something went wrong'),
        ).toBeInTheDocument();
    });

    it('can add a new question', async () => {
        const graphlMocks: MockedProviderProps['mocks'] = [
            {
                request: {
                    query: getQuestionsQuery,
                },
                result: {
                    data: {
                        questions: [],
                    },
                },
            },
            {
                request: {
                    query: addQuestionMutation,
                    variables: { text: 'my new question' },
                },
                result: {
                    data: {
                        addQuestion: { id: '1234', text: 'my new question' },
                    },
                },
            },
            {
                request: {
                    query: getQuestionsQuery,
                },
                result: {
                    data: {
                        questions: [{ id: '1234', text: 'my new question' }],
                    },
                },
            },
        ];
        render(
            <MockedProvider mocks={graphlMocks} addTypename={false}>
                <Questions />
            </MockedProvider>,
        );
        await waitFor(() => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
        });
        await act(async () => {
            await userEvent.type(
                screen.getByTestId('question-input'),
                'my new question',
            );
            await userEvent.click(
                screen.getByRole('button', { name: 'Add Question' }),
            );
        });
        await waitFor(() => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
            expect(
                screen.queryByText('Adding question...'),
            ).not.toBeInTheDocument();
        });
        expect(
            screen.getByText('A new question was added!'),
        ).toBeInTheDocument();
        expect(screen.getByText('my new question')).toBeInTheDocument();
    });
});

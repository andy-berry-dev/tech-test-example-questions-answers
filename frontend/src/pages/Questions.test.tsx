import React from 'react';
import { getByText, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider, MockedProviderProps } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';
import Questions, { getQuestionsQuery } from './Questions';
import { GetQuestionsQuery } from '../__generated__/types/graphql';

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
});

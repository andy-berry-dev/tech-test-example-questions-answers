import React from 'react';
import { getByText, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider, MockedProviderProps } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';
import Users, { getUsersQuery } from './Users';
import { GetUsersQuery } from '../../__generated__/types/graphql';

describe('Users page', () => {
    it('renders a list of users', async () => {
        const graphlMocks: MockedProviderProps['mocks'] = [
            {
                request: {
                    query: getUsersQuery,
                },
                result: {
                    data: {
                        users: [
                            { id: '1', name: 'user 1' },
                            { id: '2', name: 'user 2' },
                        ],
                    } as GetUsersQuery,
                },
            },
        ];
        render(
            <MockedProvider mocks={graphlMocks} addTypename={false}>
                <Users />
            </MockedProvider>,
        );
        await waitFor(() => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
        });
        expect(screen.getByText('user 1')).toBeInTheDocument();
        expect(screen.getByText('user 2')).toBeInTheDocument();
    });

    it('renders a spinner while loading', async () => {
        const graphlMocks: MockedProviderProps['mocks'] = [
            {
                request: {
                    query: getUsersQuery,
                },
                result: {
                    data: {
                        users: [],
                    } as GetUsersQuery,
                },
                delay: 500,
            },
        ];
        render(
            <MockedProvider mocks={graphlMocks} addTypename={false}>
                <Users />
            </MockedProvider>,
        );
        expect(screen.queryByRole('progressbar')).toBeInTheDocument();
    });

    it('handles server errors', async () => {
        const graphlMocks: MockedProviderProps['mocks'] = [
            {
                request: {
                    query: getUsersQuery,
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
                <Users />
            </MockedProvider>,
        );
        await waitFor(() => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
        });
        const errorDialog = await screen.findByRole('alert');

        expect(
            getByText(errorDialog, 'Error loading users'),
        ).toBeInTheDocument();
        expect(
            getByText(errorDialog, 'Something went wrong'),
        ).toBeInTheDocument();
    });
});

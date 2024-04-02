import React from 'react';
import {
    act,
    queryByText,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MockedProvider, MockedProviderProps } from '@apollo/client/testing';
import AppPageProvider from './contexts/AppPageContext';
import AppContents from './AppContents';
import { getUsersQuery } from './pages/Users/Users';
import { getQuestionsQuery } from './pages/Questions/Questions';

const waitForLoadingToFinish = async () =>
    waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

describe('AppContets', () => {
    it('swaps between showing users and questions', async () => {
        const user = userEvent.setup();
        const graphlMocks: MockedProviderProps['mocks'] = [
            {
                request: {
                    query: getUsersQuery,
                },
                result: {
                    data: { users: [] },
                },
            },
            {
                request: {
                    query: getQuestionsQuery,
                },
                result: {
                    data: { questions: [] },
                },
            },
        ];
        render(
            <AppPageProvider>
                <MockedProvider mocks={graphlMocks} addTypename={false}>
                    <AppContents />
                </MockedProvider>
            </AppPageProvider>,
        );
        const pageContents = screen.getByTestId('page-contents');

        // initial state
        await waitForLoadingToFinish();
        expect(queryByText(pageContents, 'Users')).toBeInTheDocument();

        // change to questions
        await act(() =>
            user.click(screen.getByRole('button', { name: 'Questions' })),
        );
        await waitForLoadingToFinish();
        await waitFor(async () => {
            expect(queryByText(pageContents, 'Users')).not.toBeInTheDocument();
            expect(queryByText(pageContents, 'Questions')).toBeInTheDocument();
        });

        // change back to users
        await act(() =>
            user.click(screen.getByRole('button', { name: 'Users' })),
        );
        await waitForLoadingToFinish();
        await waitFor(async () => {
            expect(
                queryByText(pageContents, 'Questions'),
            ).not.toBeInTheDocument();
            expect(queryByText(pageContents, 'Users')).toBeInTheDocument();
        });
    });
});

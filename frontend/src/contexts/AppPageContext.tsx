import React, { createContext, useState } from 'react';

export type Page = 'questions' | 'users';

const defaultValue = Object.freeze({ page: 'users', setPage: () => {} });

export const AppPageContext = createContext<{
    page: Page;
    setPage: (page: Page) => void;
}>(defaultValue);

/* The use of context feels overkill here, however the brief asks for state handling using ContextAPI so we'll use it here */

const AppPageProvider = ({ children }: { children: React.ReactNode }) => {
    const [page, setPage] = useState<Page>(defaultValue.page);
    return (
        <AppPageContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{
                page,
                setPage,
            }}
        >
            {children}
        </AppPageContext.Provider>
    );
};

export default AppPageProvider;

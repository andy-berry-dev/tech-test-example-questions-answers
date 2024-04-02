import React, { useContext } from 'react';
import { Container } from '@chakra-ui/react';
import Users from './pages/Users';
import Questions from './pages/Questions';
import Topbar from './components/Topbar';
import { AppPageContext } from './contexts/AppPageContext';

const AppContents = () => {
    const { page } = useContext(AppPageContext);
    return (
        <>
            <Topbar />
            <Container size="lg" pt={4} data-testid="page-contents">
                {page === 'users' && <Users />}
                {page === 'questions' && <Questions />}
            </Container>
        </>
    );
};

export default AppContents;

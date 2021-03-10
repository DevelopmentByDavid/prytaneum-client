import React from 'react';
import Container from '@material-ui/core/Container';

import UserProvider from '@app/contexts/User';
import Component from './UserSettings';

export default { title: '@app/domains/User/User Settings' };

export function UserSettings() {
    return (
        <Container maxWidth='md'>
            <UserProvider>
                <Component />
            </UserProvider>
        </Container>
    );
}

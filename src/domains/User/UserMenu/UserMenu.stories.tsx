import React from 'react';
import { Meta } from '@storybook/react';

import UserProvider from '@app/contexts/User';
import UserMenu from './UserMenu';

export default { title: '@app/domains/User/User Menu', parameters: { layout: 'centered' } } as Meta;

export function Basic() {
    return (
        <UserProvider>
            <UserMenu links={{ settings: '/settings', logout: '/logout' }} />
        </UserProvider>
    );
}

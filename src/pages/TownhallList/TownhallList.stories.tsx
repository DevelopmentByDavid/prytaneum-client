import React from 'react';

import UserProvider from '@app/contexts/User';
import Layout from '@app/layout';
import Component from '.';

export default { title: '@app/pages/Townhall List' };

export function Basic() {
    return (
        <UserProvider>
            <Layout showAsLoggedIn>
                <Component />
            </Layout>
        </UserProvider>
    );
}

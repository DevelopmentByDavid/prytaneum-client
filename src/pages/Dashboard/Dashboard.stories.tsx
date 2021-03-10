import React from 'react';

import UserProvider from '@app/contexts/User';
import Layout from '@app/layout';
import Dashboard from './Dashboard';

export default { title: '@app/pages/Dashboard' };

export function Basic() {
    return (
        <UserProvider>
            <Layout showAsLoggedIn>
                <Dashboard />
            </Layout>
        </UserProvider>
    );
}

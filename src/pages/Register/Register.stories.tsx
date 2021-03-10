import React from 'react';

import UserProvider from '@app/contexts/User';
import Layout from '@app/layout';
import Component from '.';

export default { title: '@app/pages/Register' };

export function Basic() {
    return (
        <UserProvider forceNoLogin>
            <Layout>
                <Component />
            </Layout>
        </UserProvider>
    );
}

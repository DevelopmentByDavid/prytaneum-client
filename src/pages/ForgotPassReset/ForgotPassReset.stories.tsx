import React from 'react';

import UserProvider from '@app/contexts/User';
import Layout from '@app/layout';
import Component from '.';

export default { title: '@app/pages/Forgot Pass Reset' };

export function Basic() {
    return (
        <UserProvider forceNoLogin>
            <Layout>
                <Component token='asdf' />
            </Layout>
        </UserProvider>
    );
}

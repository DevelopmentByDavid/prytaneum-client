import React from 'react';

import Layout from 'layout';
import UserProvider from 'contexts/User';
import TownhallProvider from 'contexts/Townhall';
import { makeTownhall } from 'prytaneum-typings';

import Component from '.';

export default { title: 'Pages/Rating', component: Component };

export function Basic() {
    const townhall = makeTownhall();
    return (
        <UserProvider>
            <Layout>
                <TownhallProvider value={townhall} townhallId='123'>
                    <Component />
                </TownhallProvider>
            </Layout>
        </UserProvider>
    );
}

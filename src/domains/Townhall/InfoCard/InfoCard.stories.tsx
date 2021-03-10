import React from 'react';
import { Meta } from '@storybook/react';
import { makeTownhall, makeUser } from 'prytaneum-typings';

import TownhallProvider from '@app/contexts/Townhall';
import UserProvider from '@app/contexts/User';
import Component from './InfoCard';

export default { title: '@app/domains/Townhall/Info Card', parameters: { layout: 'centered' } } as Meta;

export function InfoCard() {
    return (
        <UserProvider value={makeUser()} forceNoLogin>
            <TownhallProvider townhallId='123' forceNoFetch value={makeTownhall()}>
                <Component />
            </TownhallProvider>
        </UserProvider>
    );
}

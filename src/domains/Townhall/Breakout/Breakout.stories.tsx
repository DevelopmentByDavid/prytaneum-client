import React from 'react';
import { Meta, Story } from '@storybook/react';
import UserProvider from '@app/contexts/User';
import { makeUser, makeTownhall } from 'prytaneum-typings';

import TownhallProvider from '@app/contexts/Townhall';
import Breakout from './Breakout';

export default {
    title: '@app/domains/Townhall/Breakout',
    decorators: [
        (MyStory) => (
            <TownhallProvider townhallId='123' forceNoFetch value={makeTownhall()}>
                <UserProvider value={makeUser()} forceNoLogin>
                    <MyStory />
                </UserProvider>
            </TownhallProvider>
        ),
    ],
    parameters: {
        layout: 'padded',
    },
} as Meta;

const Template: Story<{}> = () => <Breakout />;

export const User = Template.bind({});

import React from 'react';
import { Meta } from '@storybook/react';
import { makeQuestion } from 'prytaneum-typings';

import UserProvider from '@app/contexts/User';
import TownhallProvider from '@app/contexts/Townhall';
import Component from './ReplyForm';

export default {
    title: '@app/domains/Questions/Reply Form',
    parameters: { layout: 'centered' },
    decorators: [
        (MyStory) => (
            <TownhallProvider townhallId='123'>
                <UserProvider>
                    <MyStory />
                </UserProvider>
            </TownhallProvider>
        ),
    ],
} as Meta;

export function Basic() {
    return <Component replyTo={makeQuestion()} />;
}

import React from 'react';
import { Meta } from '@storybook/react';

import UserProvider from 'contexts/User';
import TownhallProvider from 'contexts/Townhall';
import { makeTownhall } from 'prytaneum-typings';

import Component from '.';

export default {
    title: 'Domains/Feedback/Rating',
    component: Component,
    argTypes: {
        questions: {
            control: { type: 'array' },
        },
    },
    parameters: {
        layout: 'none',
    },
} as Meta;

interface Props {
    questions: Array<string>;
}

export function Basic({ questions }: Props) {
    const townhall = makeTownhall();

    return (
        <UserProvider>
            <TownhallProvider value={townhall} townhallId='123'>
                <Component questions={questions} townhallId={townhall._id} onSuccess={() => {}} onFailure={() => {}} />
            </TownhallProvider>
        </UserProvider>
    );
}

Basic.args = {
    questions: ['Please rate your experience', 'audio', 'video', 'chat'],
};

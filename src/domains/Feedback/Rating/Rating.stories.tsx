import React, { useEffect, useState } from 'react';

import Main from 'layout/Main';
import UserProvider from 'contexts/User';
import TownhallProvider from 'contexts/Townhall';
import { makeTownhall } from 'prytaneum-typings';

import Component from '.';
import { Question } from './Rating';

export default {
    title: 'Domains/Feedback/Rating',
    component: Component,
    argTypes: {
        questions: {
            control: { type: 'array' },
        },
    },
};

interface Props {
    questions: Array<string>;
}

export function Basic({questions}: Props) {
    const townhall = makeTownhall();

    return (
        <Main>
            <UserProvider>
                <TownhallProvider value={townhall} townhallId='123'>
                    <Component
                        questions={questions}
                        townhallId={townhall._id}
                        onSuccess={() => {}}
                        onFailure={() => {}}
                    />
                </TownhallProvider>
            </UserProvider>
        </Main>
    );
}

Basic.args = {
    questions: [
        'Please rate your experience', 
        'audio', 
        'video', 
        'chat'
    ]
};
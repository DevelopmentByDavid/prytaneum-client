import React from 'react';

import Main from 'layout/Main';
import Component from '.';

export default { 
    title: 'Domains/Feedback/Rating',
    component: Component,
    argTypes: {
        question: {
            control: { type: 'text' }
        }
    }
};

interface Props {
    question: string
}

// TODO add mock api
export function Basic({question}: Props) {
    return (
        <Main>
            <Component
                question={question}
                townhallId=''
                onSuccess={() => {}}
                onFailure={() => {}}
            />
        </Main>
    );
}

Basic.args = {
    question: 'Please rate your experience'
};
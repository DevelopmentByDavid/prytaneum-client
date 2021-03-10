import React from 'react';
import { Meta } from '@storybook/react';
import Component from './NotFound';

export default {
    title: '@app/pages/Not Found',
    component: Component,
} as Meta;

interface Props {
    errorMessage: string;
}

export const NotFound = ({ errorMessage }: Props) => <Component errorMessage={errorMessage} />;

NotFound.args = {
    errorMessage: 'Invalid Link',
};

import React from 'react';
import { Meta } from '@storybook/react';

import Component from './UserList';

export default {
    title: '@app/domains/Admin/User List',
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <div style={{ padding: 30, flex: 1 }}>
                <Story />
            </div>
        ),
    ],
} as Meta;

export const UserList = () => <Component />;

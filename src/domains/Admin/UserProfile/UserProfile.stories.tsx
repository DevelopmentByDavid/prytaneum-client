import React from 'react';
import { Meta } from '@storybook/react';

import Component from './UserProfile';

export default { title: '@app/domains/Admin/User Profile', parameters: { layout: 'centered' } } as Meta;

export const UserProfile = () => <Component userId='1234' />;

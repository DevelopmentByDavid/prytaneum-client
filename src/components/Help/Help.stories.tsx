import React from 'react';
import faker from 'faker';

import Component from './Help';

export default { title: '@app/components/Help' };

export function Basic() {
    return <Component>{faker.lorem.lines()}</Component>;
}

import React from 'react';

import Main from '@app/layout/Main';
import Component from './TitleCard';

export default { title: '@app/components/Title Card' };

export function Basic() {
    return (
        <Main>
            <Component
                title='Townhalls'
                stats={[
                    ['Past', 10],
                    ['Upcoming', 3],
                    ['Total', 13],
                ]}
            />
        </Main>
    );
}

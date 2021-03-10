import React from 'react';

import SearchToolbar from './SearchToolbar';

export default { title: '@app/components/SearchToolbar' };

export function Primary() {
    return <SearchToolbar onChange={() => {}} label='Search Users' />;
}

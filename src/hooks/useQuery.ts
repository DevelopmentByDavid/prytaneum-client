import React from 'react';
import { QueryContext } from '@app/contexts/Query';

export default function useQuery() {
    const query = React.useContext(QueryContext);
    if (!query) return undefined;

    return query;
}

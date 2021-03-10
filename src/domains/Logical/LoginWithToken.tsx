import React from 'react';
import axios from 'axios';
import type { ClientSafeUser } from 'prytaneum-typings';

import Loader from '@app/components/Loader';
import useUser from '@app/hooks/useUser';
import useEndpoint from '@app/hooks/useEndpoint';
import useQuery from '@app/hooks/useQuery';

function loginWithToken(query?: string) {
    let url = '/api/users/introspect';
    if (query) url = `${url}${query}`;
    return axios.get<ClientSafeUser>(url);
}

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
}

export default function LoginWithToken({ children }: Props) {
    const [, setUser] = useUser();
    const query = useQuery();
    const endpoint = React.useCallback(() => loginWithToken(query), [query]);
    const [, isLoading] = useEndpoint(endpoint, {
        minWaitTime: 0,
        runOnFirstRender: true,
        onSuccess: ({ data }) => {
            setUser(data);
        },
        onFailure: () => {}, // explicitly do nothing
    });

    if (isLoading) return <Loader />;
    return <>{children}</>;
}

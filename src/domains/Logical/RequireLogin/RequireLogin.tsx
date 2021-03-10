import React from 'react';

import Login from '@app/pages/Login';
import useUser from '@app/hooks/useUser';

interface Props {
    children: React.ReactElement;
}

export default function RequireLogin({ children }: Props) {
    const [user] = useUser();
    if (!user) return <Login />;
    return children;
}

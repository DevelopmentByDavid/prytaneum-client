import React from 'react';

import Redirect from '@app/domains/Logical/Redirect';
import useEndpoint from '@app/hooks/useEndpoint';
import Loader from '@app/components/Loader';
import useUser from '@app/hooks/useUser';
import { clear } from '@app/utils/storage';
import { logout } from '@app/domains/Auth/api';

/** Logs the user out by redirecting to /login after clearing the window's local storage
 *  @category Domains/Auth
 *  @constructor Logout
 */
export default function Logout() {
    const [isLoggedOut, setState] = React.useState(false);
    const [, setUser] = useUser();
    const [, isLoading] = useEndpoint(logout, {
        onSuccess: () => {
            clear();
            setUser(undefined);
            setState(true);
        },
        runOnFirstRender: true,
    });

    if (isLoading || !isLoggedOut) return <Loader />;

    return <Redirect href='/login' />;
}

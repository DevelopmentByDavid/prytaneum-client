import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Logout() {
    // TODO: remove localstorage clear when stop using jwt for session tokens
    window.localStorage.clear();
    return <Redirect to='/login' />;
}

import React from 'react';

import MenuIcon from '@material-ui/icons/Menu';

import Component from './NavIcon';

export default { title: '@app/layout/Nav Icon' };

export function Basic() {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <Component open={open} onClick={() => setOpen(!open)} />
            <MenuIcon fontSize='large' />
        </>
    );
}

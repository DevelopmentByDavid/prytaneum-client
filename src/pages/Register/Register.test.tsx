import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import ThemeProviderContext from '@app/contexts/Theme';
import { makeUser } from 'prytaneum-typings';

import UserProvider from '@app/contexts/User';
import Register from './Register';

jest.mock('@app/hooks/useSnack');
jest.mock('@app/utils/axios');

describe('Register', () => {
    let container: HTMLDivElement | null = null;

    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        if (container) {
            unmountComponentAtNode(container);
            container.remove();
        }
        container = null;
        jest.restoreAllMocks();
    });

    // eslint-disable-next-line jest/expect-expect
    it('should render', () => {
        ReactTestUtils.act(() => {
            render(
                <ThemeProviderContext>
                    <UserProvider forceNoLogin value={makeUser()}>
                        <Register />
                    </UserProvider>
                </ThemeProviderContext>,
                container
            );
        });
    });
});

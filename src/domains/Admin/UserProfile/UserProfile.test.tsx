import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import UserProfile from './UserProfile';

jest.mock('@app/hooks/useSnack');
jest.mock('@app/utils/axios');

/* 
    Rendering Component 
    Just checking if component render correctly
    PropTypes does rest of checking
*/

let container: HTMLDivElement | null;

const OLD_ENV = import.meta.env;

beforeEach(() => {
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
    jest.resetModules();
    import.meta.env = { ...OLD_ENV }; // make a copy
});

describe('<UserInfo/> rendering', () => {
    // eslint-disable-next-line jest/expect-expect
    it('renders correctly', () => {
        ReactTestUtils.act(() => {
            render(<UserProfile userId='123456' />, container);
        });
    });
});

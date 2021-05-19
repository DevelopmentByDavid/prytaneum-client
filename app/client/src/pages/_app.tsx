import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';

import { useApollo } from '@local/utils/apolloClient';
import { useStore } from '@local/reducers/store';
import { UserProvider } from '@local/contexts/User';
import ThemeProvider from '@local/contexts/Theme';
import SnackContext from '@local/contexts/Snack';
import { Layout } from '@local/layout';
import '@local/index.css';

export default function App({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps);
    const store = useStore(pageProps.initialReduxState);
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <Head>
                <title>Prytaneum</title>
            </Head>
            <ApolloProvider client={apolloClient}>
                <ThemeProvider>
                    <CssBaseline />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <SnackContext maxSnack={1}>
                            <UserProvider>
                                <Layout hideSideNav={pageProps.hideSideNav} ContainerProps={pageProps.containerProps}>
                                    <Provider store={store}>
                                        <Component {...pageProps} />
                                    </Provider>
                                </Layout>
                            </UserProvider>
                        </SnackContext>
                    </MuiPickersUtilsProvider>
                </ThemeProvider>
            </ApolloProvider>
        </>
    );
}

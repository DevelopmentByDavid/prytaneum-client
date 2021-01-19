import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import ArrowDownIcon from '@material-ui/icons/ExpandMore';
import type { ChatMessage } from 'prytaneum-typings';
import { motion } from 'framer-motion';

import Message from 'components/Message';
import Fab from 'components/Fab';
import useScrollTo from 'hooks/useScrollTo';

export interface Props {
    messages: ChatMessage[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 475,
        flex: '1 1 100%',
        display: 'flex',
        position: 'relative',
    },
    item: {
        paddingBottom: theme.spacing(1),
    },
    list: {
        padding: theme.spacing(1),
        flex: '1 1 100%',
        listStyle: 'none',
    },
    sentinel: {
        height: 10,
        width: 10,
        visibility: 'hidden',
        bottom: 0,
    },
    scrollContainer: {
        display: 'flex',
        flex: '1 1 100%',
        overflowY: 'auto', // for scrolling
        overflowX: 'hidden', // otherwise a horizontal scrollbar will appear during load anim
        maxHeight: '100%', // for scrolling
    },
    fab: {
        position: 'absolute',
        right: theme.spacing(2),
        bottom: theme.spacing(2),
    },
}));

export default function ChatContent({ messages }: Props) {
    const classes = useStyles();
    const hasRun = React.useRef(false);
    const sentinelRef = React.useRef<HTMLLIElement | null>(null);
    const [scrollToAnchor, isAnchorInView] = useScrollTo(sentinelRef);

    // TODO: use to calculate how many new messages there are
    // and update the pane context so it can display in the menu
    // const [, dispatch] = React.useContext(PaneContext);
    // const ref = React.useRef(0);

    React.useLayoutEffect(() => {
        if (!hasRun.current) scrollToAnchor('smooth');
        hasRun.current = true;
    }, [scrollToAnchor, isAnchorInView]);

    React.useEffect(() => {
        if (isAnchorInView) scrollToAnchor('auto');
    }, [messages, isAnchorInView, scrollToAnchor]);

    if (messages.length === 0)
        return (
            <Grid container item xs={12} justify='center' direction='column' className={classes.root}>
                <Typography variant='h5' paragraph align='center'>
                    Nothing to display here :(
                </Typography>
                <Typography variant='body1' align='center'>
                    Start sending mesages by using the textbox below
                </Typography>
            </Grid>
        );
    return (
        <Grid item container xs={12} className={classes.root}>
            <div className={classes.scrollContainer}>
                <ul className={classes.list}>
                    {messages.map(({ meta, message, _id }) => (
                        <motion.li
                            key={_id}
                            initial={{ y: 5, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: 'keyframes' }}
                            className={classes.item}
                        >
                            <Message name={meta.createdBy.name.first} timestamp={meta.createdAt} message={message} />
                        </motion.li>
                    ))}

                    <li key='sentinel' ref={sentinelRef} className={classes.sentinel} />
                </ul>
            </div>
            <Fab zoomProps={{ in: !isAnchorInView }} className={classes.fab} onClick={() => scrollToAnchor('auto')}>
                <ArrowDownIcon />
            </Fab>
        </Grid>
    );
}
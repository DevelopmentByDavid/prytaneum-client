/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Badge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';

import ChipTab from 'components/ChipTab';
import { Panes } from '../types';
import { PaneContext } from '../Contexts/Pane';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-flex',
        position: 'relative',
        flexShrink: 0,
    },
    chip: {
        [theme.breakpoints.down('md')]: {
            marginBottom: theme.spacing(1),
        },
    },
    badge: {
        marginRight: -theme.spacing(0.5),
    },
}));

const makeTransition = (idx: number) => ({
    delay: (idx + 1) * 0.1,
    type: 'spring',
    damping: 12,
    stiffness: 150,
});

interface Props {
    label: string;
    index: number;
    /**
     * tabs parent component passes this in
     */
    selected?: boolean;
    onClick: () => void;
    /**
     * tabs parent component inspects this, otherwise it doesn't matter
     */
    // eslint-disable-next-line react/no-unused-prop-types
    value?: Panes;
}

function StyledTab({ label, index, selected, onClick }: Props) {
    const classes = useStyles();
    const [context] = React.useContext(PaneContext);

    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={makeTransition(index)}
            className={classes.root}
        >
            <Badge
                badgeContent={context[label]}
                overlap='circle'
                color='secondary'
                classes={{ badge: classes.badge }}
            >
                <ChipTab
                    aria-selected={selected}
                    aria-controls={`${label}-panel`}
                    role='tab'
                    label={label}
                    selected={selected}
                    value={label}
                    onClick={onClick}
                    className={classes.chip}
                />
            </Badge>
        </motion.div>
    );
}

StyledTab.defaultProps = {
    selected: false,
    value: undefined,
};

export default React.memo(StyledTab);
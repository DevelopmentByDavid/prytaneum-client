/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { motion, AnimationProps, MotionProps } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: { position: 'relative', width: '100%', height: '100%' },
    motion: { inset: 0, position: 'absolute' },
});

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
    animKey: React.Key;
}

export const fadeThroughProps: AnimationProps & MotionProps = {
    initial: { scale: 0.92, opacity: 0 },
    exit: { scale: 1, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: {
        ease: 'easeInOut',
    },
};

/**
 * This is a Page transition, hence the relative and absolute positioning,
 * if you want to make a component just fadeThrough, import the fadeThroughProps above and use
 * a motion.div
 */
export default function FadeThrough({ children, animKey: key }: Props) {
    const classes = useStyles();
    return (
        <motion.div key={key} {...fadeThroughProps} className={classes.motion}>
            {children}
        </motion.div>
    );
}
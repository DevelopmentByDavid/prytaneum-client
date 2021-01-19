import React from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import RatingWidget from 'domains/Feedback/Rating';
import { makeStyles } from '@material-ui/core/styles';

import history from 'utils/history';
import useTownhall from 'hooks/useTownhall';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(3),
            marginTop: '10vh',
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0, 1),
            paddingTop: '10vh',
            height: '100%',
            borderRadius: 0,
        },
    },
}));

export default function RatingPage() {
    const classes = useStyles();
    const [townhall] = useTownhall();

    return (
        <Grid
            container
            alignContent='center'
            className={classes.paper}
            justify='center'
            component={Paper}
        >
            <Grid container justify='center' item component={Typography} variant='h5'>
                Rating
            </Grid>
            <RatingWidget
                questions={[{ question: 'How did you like this townhall?' }]}
                townhallId={townhall._id}
                onSuccess={() => {
                    history.push('/app/home');
                }}
                onFailure={() => {}}
            />
        </Grid>
    );
}
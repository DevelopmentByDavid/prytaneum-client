import React, { useEffect, useState } from 'react';
import {
    Typography,
    Grid,
    Button,
    TextField,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import type { RatingForm } from 'prytaneum-typings';

import LoadingButton from 'components/LoadingButton';
import useEndpoint from 'hooks/useEndpoint';

import { rateTownhall } from '../api';

interface DefaultProps {
    townhallId: string;
}

interface Props {
    questions: Array<string>;
    onSuccess: () => void;
    onFailure: () => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    btn: {
        marginTop: theme.spacing(3),
    },
}));

export default function RatingWidget({ questions, onSuccess, onFailure, townhallId }: Props & DefaultProps) {
    const classes = useStyles();
    const [rating, setRating] = useState<RatingForm>({ values: {}, feedback: '' });
    const apiRequest = React.useCallback(() => rateTownhall(rating, townhallId), [rating, townhallId]);

    const [sendRequest, isLoading] = useEndpoint(apiRequest, {
        onSuccess,
        onFailure,
    });

    const handleSubmit = () => {
        sendRequest();
    };

    useEffect(() => {
        const updatedRating = { values: {}, feedback: '' };
        for (let i = 0; i < questions.length; i += 1) {
            updatedRating.values = { ...updatedRating.values, [questions[i]]: null };
        }
        setRating(updatedRating);
    }, [questions]);

    return (
        <div className={classes.root}>
            <Grid container>
                {questions.map((question, index) => (
                    <Grid container justify='center' item xs={12} key={index}>
                        <Grid item xs='auto' component={Typography}>
                            {question}
                        </Grid>
                        <Grid item xs={12} container justify='center'>
                            <Rating
                                name={question}
                                value={rating.values[question]}
                                onChange={(e, newValue) => {
                                    setRating({
                                        ...rating,
                                        values: { ...rating.values, [question]: newValue },
                                    });
                                }}
                            />
                        </Grid>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <TextField
                        id='feedback'
                        label='Feedback'
                        fullWidth
                        onChange={(e) => setRating({ ...rating, feedback: e.target.value })}
                    />
                </Grid>
                <Grid container justify='flex-end' item xs={12} className={classes.btn}>
                    <LoadingButton loading={isLoading}>
                        <Button variant='contained' onClick={handleSubmit}>
                            Submit
                        </Button>
                    </LoadingButton>
                </Grid>
            </Grid>
        </div>
    );
}

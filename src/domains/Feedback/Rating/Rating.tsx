import React, { useEffect, useState } from 'react';
import {
    Typography,
    Grid,
    Button,
    TextField,
    Switch,
    CircularProgress,
    FormGroup,
    FormControlLabel,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import type { RatingForm } from 'prytaneum-typings';

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

export default function RatingWidget({ questions, onSuccess, onFailure, townhallId }: Props & DefaultProps) {
    const [rating, setRating] = useState<RatingForm>({ values: {}, feedback: '' });
    const [anonymous, setAnonymous] = useState<boolean>(false);
    const apiRequest = React.useCallback(() => rateTownhall(rating, townhallId), [rating, townhallId]);

    const [sendRequest, isLoading] = useEndpoint(apiRequest, {
        onSuccess,
        onFailure,
    });

    const handleSubmit = () => {
        sendRequest();
    };

    const toggleAnonymous = () => {
        const userId = 'test'; // TODO Get userId from context
        setAnonymous(!anonymous);
        if (anonymous) setRating({ ...rating, userId: undefined });
        else setRating({ ...rating, userId });
    };

    useEffect(() => {
        const updatedRating = { values: {}, feedback: '' };
        for (let i = 0; i < questions.length; i += 1) {
            updatedRating.values = { ...updatedRating.values, [questions[i]]: null };
        }
        setRating(updatedRating);
    }, [questions]);

    return (
        <Grid container justify='center' xs='auto' item>
            {questions.map((question, index) => {
                return (
                    <Grid container justify='center' xs='auto' item key={index}>
                        <Grid container justify='center' item component={Typography}>
                            {question}
                        </Grid>
                        <Rating
                            name={question}
                            value={rating.values[question]}
                            onChange={(e, newValue) => {
                                setRating({ ...rating, values: { ...rating.values, [question]: newValue } });
                            }}
                        />
                    </Grid>
                );
            })}
            <TextField
                id='feedback'
                label='Feedback'
                style={{ margin: 8 }}
                placeholder='Feedback'
                fullWidth
                margin='normal'
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => setRating({ ...rating, feedback: e.target.value })}
            />
            <FormGroup>
                <FormControlLabel
                    value='Anonymous'
                    label='Anonymous'
                    control={<Switch checked={anonymous} onChange={toggleAnonymous} name='checkedB' color='primary' />}
                />
            </FormGroup>
            <Grid container justify='center' item>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <Button variant='contained' onClick={handleSubmit} disabled={isLoading}>
                        Submit
                    </Button>
                )}
            </Grid>
        </Grid>
    );
}

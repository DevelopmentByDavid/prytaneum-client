import React, { useState } from 'react';
import { Typography, Grid, Button, TextField } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import CircularProgress from '@material-ui/core/CircularProgress';

import useEndpoint from 'hooks/useEndpoint';

import { rateTownhall } from '../api';

interface DefaultProps {
    townhallId: string;
}

export interface Question {
    question: string;
    value: number | null;
}

interface Props {
    questions: Array<Question>;
    onSuccess: () => void;
    onFailure: () => void;
    townhallId?: string;
}

export default function RatingWidget({
    questions,
    onSuccess,
    onFailure,
    townhallId,
}: Props & DefaultProps) {
    const [values, setValues] = useState<Array<Question>>(questions);
    const [feedback, setFeedback] = useState<string>('');
    const apiRequest = React.useCallback(
        () => rateTownhall({values, feedback}, townhallId),
        [feedback, townhallId, values]
    );

    const [sendRequest, isLoading] = useEndpoint(apiRequest, {
        onSuccess,
        onFailure,
    });

    const handleSubmit = () => {
        sendRequest();
    };

    return (
        <Grid container justify='center' xs='auto' item>
            {questions.map((item, index) => { 
                return (
                    <Grid container justify='center' xs='auto' item key={index}>
                        <Grid
                            container
                            justify='center'
                            item
                            component={Typography}
                        >
                            {item.question}
                        </Grid>
                        <Rating
                            name={item.question}
                            value={item.value}
                            onChange={(event, newValue) => {
                                const updatedValues = [...values];
                                updatedValues[index] = {
                                    ...item,
                                    value: newValue,
                                };
                                setValues(updatedValues);
                            }}
                        />
                    </Grid>
                );
            }
            )}
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
                onChange={(e) => setFeedback(e.target.value)}
            />
            <Grid container justify='center' item>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <Button
                        variant='contained'
                        onClick={handleSubmit}
                        disabled={isLoading || !feedback}
                    >
                        Submit
                    </Button>
                )}
            </Grid>
        </Grid>
    );
}

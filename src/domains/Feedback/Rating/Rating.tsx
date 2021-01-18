import React, { useState } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import CircularProgress from '@material-ui/core/CircularProgress';

import useEndpoint from 'hooks/useEndpoint';

import { rateTownhall } from '../api';

interface DefaultProps {
    townhallId: string;
}

interface Props {
    question: string;
    onSuccess: () => void;
    onFailure: () => void;
    townhallId?: string;
}

export default function RatingWidget({
    question,
    onSuccess,
    onFailure,
    townhallId,
}: Props & DefaultProps) {
    const [value, setValue] = useState<number | null>(0);
    const apiRequest = React.useCallback(
        () => rateTownhall(townhallId, value),
        [townhallId, value]
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
            <Grid container justify='center' item component={Typography}>
                {question}
            </Grid>
            <Grid container justify='center' item>
                <Rating
                    name='simple-controlled'
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
            </Grid>
            <Grid container justify='center' item>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <Button
                        variant='contained'
                        onClick={handleSubmit}
                        disabled={isLoading || !value}
                    >
                        Submit
                    </Button>
                )}
            </Grid>
        </Grid>
    );
}

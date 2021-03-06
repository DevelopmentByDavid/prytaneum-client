import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Grid, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TitleCard from 'components/TitleCard';
import List from 'domains/Townhall/TownhallList';
import Dialog from 'components/Dialog';
import TownhallForm from 'domains/Townhall/TownhallForm';
import Fab from 'components/Fab';
import history, { makeRelativeLink } from 'utils/history';
import FadeThrough from 'components/FadeThrough';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    fab: {
        color: theme.palette.common.white,
    },
}));

export default function TownhallList() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <FadeThrough animKey='townhall-list-page'>
                <Grid container>
                    <Dialog open={open} onClose={() => setOpen(false)}>
                        <DialogContent>
                            <TownhallForm
                                onCancel={() => setOpen(false)}
                                onSubmit={() => setOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                    <TitleCard title='Townhalls' />
                    <Grid item xs={12}>
                        <List
                            onClickTownhall={(id) =>
                                history.push(makeRelativeLink(`/${id}`))
                            }
                        />
                    </Grid>
                </Grid>
            </FadeThrough>
            <Fab aria-label='Add Townhall' onClick={() => setOpen(true)}>
                <AddIcon className={classes.fab} />
            </Fab>
        </>
    );
}

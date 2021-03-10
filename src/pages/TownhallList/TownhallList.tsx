import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Grid, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';

import TitleCard from '@app/components/TitleCard';
import List from '@app/domains/Townhall/TownhallList';
import ResponsiveDialog from '@app/components/ResponsiveDialog';
import TownhallForm from '@app/domains/Townhall/TownhallForm';
import Fab from '@app/components/Fab';
import history, { makeRelativeLink as link } from '@app/utils/history';
import FadeThrough from '@app/animations/FadeThrough';

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
    const [onExit, setOnExit] = React.useState<(() => void) | undefined>(undefined);
    return (
        <motion.div key='townhall-list'>
            <FadeThrough animKey='townhall-list-page'>
                <Grid container>
                    <TitleCard title='Townhalls' />
                    <Grid item xs={12}>
                        <List onClickTownhall={(id) => history.push(link(`/${id}`))} />
                    </Grid>
                </Grid>
            </FadeThrough>
            <ResponsiveDialog open={open} onClose={() => setOpen(false)} onExited={onExit}>
                <DialogContent>
                    <TownhallForm
                        onCancel={() => setOpen(false)}
                        onSubmit={(id) => {
                            setOnExit(() => history.push(link(`/${id}`)));
                            setOpen(false);
                        }}
                    />
                </DialogContent>
            </ResponsiveDialog>
            <Fab aria-label='Add Townhall' onClick={() => setOpen(true)}>
                <AddIcon className={classes.fab} />
            </Fab>
        </motion.div>
    );
}

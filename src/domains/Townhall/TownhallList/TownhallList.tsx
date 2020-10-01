import React from 'react';
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Fade,
    ListItemSecondaryAction,
} from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';

import { formatDate } from 'utils/format';
import useEndpoint from 'hooks/useEndpoint';
import Loader from 'components/Loader';
import ListFilter from 'components/ListFilter';
import { getTownhallList } from '../api';
import { Townhall } from '../types';
import {
    filters as filterFuncs,
    TonwhallFilterFunc,
    search,
    applyFilters,
    Filters,
} from './utils';

interface Props {
    currentUser?: boolean;
    onClickTownhall: (id: string) => void;
}

export default function TownhallList({ currentUser, onClickTownhall }: Props) {
    const [list, setList] = React.useState<Townhall[] | null>(null);

    // search is always the first element in the filter array
    const [filters, setFilters] = React.useState<TonwhallFilterFunc[]>([
        (townhalls: Townhall[]) => townhalls,
    ]);
    const [sendRequest, isLoading] = useEndpoint(
        () => getTownhallList(currentUser),
        {
            onSuccess: (results) => {
                setList(results.data.list);
            },
        }
    );
    const filterOptions: Array<keyof Filters> = ['Ongoing', 'Past', 'Upcoming'];

    React.useEffect(sendRequest, []);

    if (isLoading || !list) {
        return (
            <div style={{ height: '500px' }}>
                <Loader />
            </div>
        );
    }

    if (list.length === 0) {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <Typography variant='h4'>No Townhalls to display</Typography>
            </div>
        );
    }

    return (
        <Fade in timeout={400}>
            <div style={{ width: '100%' }}>
                <div>
                    <ListFilter
                        onSearch={(text) =>
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            setFilters(([_prevSearch, ...otherFilters]) => [
                                (filteredList) => search(text, filteredList),
                                ...otherFilters,
                            ])
                        }
                        onFilter={(filterSet) => {
                            // TODO: optimize typings
                            const filterArr: Array<keyof Filters> = Array.from(
                                filterSet as Set<keyof Filters>
                            );
                            const state: TonwhallFilterFunc[] = filterArr.map(
                                (key) => filterFuncs[key]
                            );
                            setFilters(([prevSearch]) => [
                                prevSearch,
                                ...state,
                            ]);
                        }}
                        filterOptions={filterOptions}
                    />
                </div>
                <List>
                    {applyFilters(list, filters).map(
                        ({ settings, form, _id }) => (
                            <ListItem
                                key={_id}
                                divider
                                button
                                alignItems='flex-start'
                                onClick={() => onClickTownhall(_id)}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        alt='Speaker'
                                        src={form.speaker.picture}
                                    >
                                        {form.title[0]}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={form.title}
                                    secondary={formatDate(form.date)}
                                />
                                <ListItemSecondaryAction>
                                    <ChevronRight />
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    )}
                </List>
            </div>
        </Fade>
    );
}

TownhallList.defaultProps = {
    currentUser: false,
};

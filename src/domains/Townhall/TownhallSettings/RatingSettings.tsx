import React from 'react';
import { Switch } from '@material-ui/core';

import SettingsList from 'components/SettingsList';
import SettingsItem from 'components/SettingsItem';

import text from './help-text';
import { Props, areEqual } from './utils';

export default React.memo(function RatingSettings({
    onChange,
    value,
}: Props<'rating'>) {
    const ratingStateRef = React.useRef(value);
    const handleChange = (key: keyof typeof value) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { checked } = e.target;
        if (key === 'enabled') {
            if (ratingStateRef.current.enabled === checked) onChange(ratingStateRef.current);
            else
                onChange({
                    enabled: checked,
                });
        } else onChange({ ...value, [key]: checked });
    };
    return (
        <SettingsList>
            <SettingsItem helpText={text.rating.enabled} name='Enabled'>
                <Switch
                    checked={value.enabled}
                    onChange={handleChange('enabled')}
                />
            </SettingsItem>
        </SettingsList>
    );
},
areEqual);

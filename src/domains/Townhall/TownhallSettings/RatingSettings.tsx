import React from 'react';
import { Switch } from '@material-ui/core';

import SettingsList from 'components/SettingsList';
import SettingsItem from 'components/SettingsItem';

import text from './help-text';
import { Props, areEqual } from './utils';

export default React.memo(function ChatSettings({
    onChange,
    value,
}: Props<'rating'>) {
    const ref = React.useRef(value);
    const handleChange = (key: keyof typeof value) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { checked } = e.target;
        if (key === 'enabled') {
            if (ref.current.enabled === checked) onChange(ref.current);
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
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    checked={value.enabled}
                    onChange={handleChange('enabled')}
                />
            </SettingsItem>
        </SettingsList>
    );
},
areEqual);

import React from 'react';
import { Meta } from '@storybook/react';

import ConfirmationDialog from './ConfirmationDialog';

export default {
    title: '@app/components/Confirmation Dialog',
    parameters: { layout: 'centered' },
    argTypes: { onConfirm: { action: 'confirmed' }, onClose: { action: 'closed' } },
} as Meta;

interface Props {
    onConfirm: () => void;
    onClose: () => void;
}

export function Basic({ onConfirm, onClose }: Props) {
    return (
        <ConfirmationDialog title='Storybook' open onConfirm={onConfirm} onClose={onClose}>
            Some text that should be read before proceeding further.
        </ConfirmationDialog>
    );
}

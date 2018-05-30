import React from 'react';
import GenericIcon from 'modules/components/icons/generic-icon';
import arrowDownPath from './paths/arrow-down.path';

export {GenericIcon};

export function ArrowDown() {
    return <GenericIcon width={9} height={5} path={arrowDownPath} />;
}

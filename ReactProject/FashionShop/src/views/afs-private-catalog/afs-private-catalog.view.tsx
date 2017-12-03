import './private-catalog.css';

import * as React from 'react';

import { render } from 'react-dom';

import { IPrivateCatalogProps, IPrivateCatalogState } from './afs-private-catalog.models';

export class PrivateCatalog extends React.Component<IPrivateCatalogProps, IPrivateCatalogState>
{
    constructor(props: IPrivateCatalogProps)
    {
        super(props);
    }

    public render(): JSX.Element
    {
        return(
            <div className="afs-private-catalog">
                content
            </div>
        );
    }
}

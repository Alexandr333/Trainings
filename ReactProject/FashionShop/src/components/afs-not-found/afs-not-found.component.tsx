import './afs-not-found.css';

import * as React from 'react';

import { render } from 'react-dom';

import { INotFoundProps, INotFoundState } from './afs-not-found.models';

export class NotFound extends React.Component<INotFoundProps, INotFoundState>
{
    constructor(props: INotFoundProps)
    {
        super(props);
    }

    public render(): JSX.Element
    {
        return(
            <div className="afs-not-found">
                Page Not Found
            </div>
        );
    }
}

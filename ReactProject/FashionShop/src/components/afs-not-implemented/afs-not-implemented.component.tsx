import './afs-not-implemented.css';

import * as React from 'react';

import { render } from 'react-dom';

import { INotImplementedProps, INotImplementedState } from './afs-not-implemented.models';

export class NotImplemented extends React.Component<INotImplementedProps, INotImplementedState>
{
    constructor(props: INotImplementedProps)
    {
        super(props);
    }

    public render(): JSX.Element
    {
        return(
            <div className="afs-not-implemented">
                Sory Component not implemented now !!!
            </div>
        );
    }
}

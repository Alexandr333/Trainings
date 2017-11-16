import './afs-titled-label.css';

import * as React from 'react';

interface ITitledLabelProps
{
    label: string;
    title: string;
}

interface ITitledLabelState
{
}

export class TitledLabel extends React.Component<ITitledLabelProps , ITitledLabelState>
{
    constructor(props: ITitledLabelProps)
    {
        super(props);
    }
    //
    public render(): JSX.Element
    {
        return(
            <div className="afs-titled-label">
                <div className="afs-titled-label__label">
                   {this.props.label}
                </div>
                <div className="afs-titled-label__title">
                   {this.props.title}
                </div>
            </div>
        );
    }
}


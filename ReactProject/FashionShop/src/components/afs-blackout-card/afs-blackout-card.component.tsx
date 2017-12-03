import './afs-blackout-card.css';
import { IBlackoutCardProps, IBlackoutCardState } from './afs-blackout-card.models';

import * as React from 'react';

export class BlackoutCard extends React.Component<IBlackoutCardProps , IBlackoutCardState>
{
    constructor(props: IBlackoutCardProps)
    {
        super(props);
    }
    //
    public render(): JSX.Element
    {
        return(
            <div className="afs-blackout-card">
                <div className="afs-blackout-card__body">
                    <img className="afs-blackout-card__background" src={this.props.backgroundURL} />
                    <div className="afs-blackout-card__dark-layout">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

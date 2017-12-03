import './afs-fashion-card.css';

import * as React from 'react';
import { IFashionCardProps, IFashionCardState } from './afs-fashion-card.models';

export class FashionCard extends React.Component<IFashionCardProps , IFashionCardState>
{
    constructor(props: IFashionCardProps)
    {
        super(props);
    }
    //
    public render(): JSX.Element
    {
        return(
            <div className="afs-fashion-card">
                <div className="afs-fashion-card__box">
                    <div className="afs-fashion-card__title">
                        {this.props.offerTitle}
                    </div>
                    <div className="afs-fashion-card__price">
                        {this.props.price}
                    </div>
                    <button className="afs-fashion-card__button">
                        Discover
                    </button>
                    <button className="afs-fashion-card__button">
                        Add to private
                    </button>
                </div>
            </div>
        );
    }
}

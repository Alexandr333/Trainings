import './afs-fashion-catalog.css';

import * as React from 'react';
import { BlackoutCard } from '../afs-blackout-card/afs-blackout-card.component';
import { FashionCard } from '../afs-fashion-card/afs-fashion-card.component';

interface IFashionCatalogProps
{
    items: IFashionCatalogItem[];
    header: string;
}
interface IFashionCatalogState
{
}
export interface IFashionCatalogItem
{
    imageURL: string;
    title: string;
    price: number;
    currency: string;
}

export class FashionCatalog extends React.Component<IFashionCatalogProps, IFashionCatalogState>
{
    private _offerButtonTitles: string[] = [
        'Discover',
        'Add to private'
    ];
    constructor(props: IFashionCatalogProps)
    {
        super(props);
        this._createFashionCards = this._createFashionCards.bind(this);
    }
    public render(): JSX.Element
    {
        return(
            <div className="afs-fashion-catalog">
                <div className="afs-fashion-catalog__card-board">
                    {this._createFashionCards()}
                </div>
            </div>
        );
    }
    private _createFashionCards(): JSX.Element[]
    {
        return this.props.items.map(
            (elem: IFashionCatalogItem, index) =>
            {
                return (
                    <div className="afs-fashion-catalog__fashion-card" key={index}>
                        <BlackoutCard backgroundURL={elem.imageURL}>
                            <FashionCard
                                offerTitle={elem.title}
                                price={elem.currency + ' ' + elem.price}
                                firstButtonTitle={this._offerButtonTitles[0]}
                                secondButtonTitle={this._offerButtonTitles[1]}
                            />
                        </BlackoutCard>
                    </div>
                );
            }
        );
    }
}

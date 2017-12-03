import './afs-public-catalog.css';

import * as React from 'react';

import { render } from 'react-dom';

import { IPublicCatalogProps, IPublicCatalogState } from './afs-public-catalog.models';
import { AdvancedSearch, IAdvancedSearchItems } from '../../components/afs-advanced-search/index';
import { Dropdown, IDropdownElement } from '../../components/afs-dropdown/index';
import { TitledLabel } from '../../components/afs-titled-label/index';
import { CatalogInfo, LoadingStatus, FashionOffer, FashionOffersSearchTerms } from '../../models/index';
import { Loading } from '../../components/afs-loading/index';
import { BlackoutCard } from '../../components/afs-blackout-card/index';
import { FashionCard } from '../../components/afs-fashion-card/index';
import { ChangeEvent } from 'react';
import { Route } from 'react-router';

export class PublicCatalog extends React.Component<IPublicCatalogProps, IPublicCatalogState>
{
    private _searchTerms: FashionOffersSearchTerms;
    private _totalCount: number = 0;
    private _averageCost: number = 0;

    constructor(props: IPublicCatalogProps)
    {
        super(props);
        this._searchTerms = new FashionOffersSearchTerms();
        this.props.loadPublicCatalogsInfo();
        // function binding
        this._onCatalogSelected = this._onCatalogSelected.bind(this);
        this._onAdvancedSearchItemsChanged = this._onAdvancedSearchItemsChanged.bind(this);
        this._onMainSearchValueChanged = this._onMainSearchValueChanged.bind(this);
    }

    public render(): JSX.Element
    {
        return(
        <div className="afs-public-catalog">
            <div
                className="afs-public-catalog__preload"
                hidden={this.props.catalogsListLoadingStatus !== LoadingStatus.loading}
            >
                <Loading/>
            </div>
            <div
                className="afs-public-catalog__container"
                hidden={this.props.catalogsListLoadingStatus === LoadingStatus.loading}
            >
                <div className="afs-public-catalog__background">
                        <div className="afs-public-catalog__top-background" />
                        <div className="afs-public-catalog__bottom-background" />
                </div>
                <div className="afs-public-catalog__header">
                    <div className="afs-public-catalog__search-panel">
                        <div className="afs-public-catalog__catalogs-dropdown">
                            {this._createCatalogsDropdown()}
                        </div>
                        <div className="afs-public-catalog__main-search">
                            <input
                                type="text"
                                className="afs-public-catalog__search-input"
                                placeholder="Search-input"
                                onChange={this._onMainSearchValueChanged}
                            />
                            <button className="afs-public-catalog__button afs-public-catalog__button_search">Search</button>
                        </div>
                        <div className="afs-public-catalog__advanced-search">
                            <AdvancedSearch
                                onChange={this._onAdvancedSearchItemsChanged}
                            />
                        </div>
                    </div>
                    <div className="afs-public-catalog__search-info">
                        <div className="afs-public-catalog__search-result">
                            <TitledLabel
                                title="Items Found"
                                label={this._calcTotalCount().toString()}
                            />
                        </div>
                        <div className="afs-public-catalog__search-result">
                            <TitledLabel
                                title="Average cost"
                                label={this._calcAverageCost().toFixed(2)}
                            />
                        </div>
                    </div>
                </div>
                <div className="afs-public-catalog__fashion-board">
                    <div className="afs-public-catalog__catalog-title">
                        {this.props.currentCatalog ? this.props.currentCatalog.catalogName : 'Select catalog'}
                    </div>
                    {this._createSearchResults()}
                </div>
            </div>
        </div>
        );
    }
    private _onAdvancedSearchItemsChanged(formItems: IAdvancedSearchItems): void
    {
        this._mapFromAdvancedFormItemsToFashionOffersSearchTerms(formItems, this._searchTerms);
        this.props.fashionOffersSearchTermsChanged(this._searchTerms);
        this.props.loadCatalogOffers(this.props.currentCatalog);
    }
    private _onMainSearchValueChanged(event: ChangeEvent<HTMLInputElement>): void
    {
        this._searchTerms.title = event.target.value;
        this.props.fashionOffersSearchTermsChanged(this._searchTerms);
        this.props.loadCatalogOffers(this.props.currentCatalog);
    }
    private _onCatalogSelected(key: any): void
    {
        let catalog: CatalogInfo = (key as CatalogInfo);
        this.props.loadCatalogOffers(catalog);
    }
    private _createCatalogsDropdown(): JSX.Element
    {
        let dropdown: JSX.Element = null;
        if (this.props.catalogsListLoadingStatus !== LoadingStatus.loading)
        {
            dropdown = (
                <Dropdown
                    items={this._mapFromCatlogsInfoToDropdownItems(this.props.catalogsList)}
                    onSelect={this._onCatalogSelected}
                    selectedItemIndex={0}
                />
            );
        }
        return dropdown;
    }
    // mappers
    private _mapFromAdvancedFormItemsToFashionOffersSearchTerms(
        formItemsValues: IAdvancedSearchItems, searcchTerms: FashionOffersSearchTerms): void
    {
        searcchTerms.currency = formItemsValues.currency;
        searcchTerms.price = formItemsValues.price;
        searcchTerms.retailer = formItemsValues.retailer;
        searcchTerms.brand = formItemsValues.brand;
    }
    private _mapFromCatlogsInfoToDropdownItems(catalogsInfoList: CatalogInfo[]): IDropdownElement[]
    {
        let dropdownItems: IDropdownElement[] = [];
        if ( catalogsInfoList !== null )
        {
            for (let catalogInfo of catalogsInfoList)
            {
                dropdownItems.push(
                    {
                        key: catalogInfo,
                        value: catalogInfo.catalogName
                    } as IDropdownElement
                );
            }
        }
        return dropdownItems;
    }
    //
    private _createSearchResults(): JSX.Element
    {
        let result: JSX.Element;
        if (this.props.currentCatalogFashionOffersLoadingStatus === LoadingStatus.loading)
        {
            result = (
                <div className="afs-public-catalog__loading">
                    <Loading/>
                </div>
            );
        } else if (this.props.currentCatalogFashionOffers.length === 0)
        {
            result = (
                <div className="afs-public-catalog__no-results">
                    Nothing found
                </div>
            );
        } else
        {
            result = (
                <div className="afs-public-catalog__offers-container">
                    {this._createFashionCards()}
                </div>
            );
        }
        return result;
    }
    private _createFashionCards(): JSX.Element[]
    {
        return this.props.currentCatalogFashionOffers.map(
            (elem: FashionOffer, index) =>
            {
                return (
                    <div className="afs-public-catalog__fashion-card" key={index}>
                        <BlackoutCard backgroundURL={elem.imageURL}>
                            <FashionCard
                                offerTitle={elem.title.length > 35 ? elem.title.substr(0, 35) + '...' : elem.title}
                                price={elem.currency + ' ' + elem.price}
                                firstButtonTitle="Advanced"
                                secondButtonTitle="Add"
                            />
                        </BlackoutCard>
                    </div>
                );
            }
        );
    }
    private _calcTotalCount(): number
    {
        return this.props.currentCatalogFashionOffers.length;
    }
    private _calcAverageCost(): number
    {
        let averageCost: number = 0;
        for ( let offer of this.props.currentCatalogFashionOffers)
        {
            averageCost += offer.price;
        }
        if (this.props.currentCatalogFashionOffers.length !== 0)
        {
            averageCost = averageCost / this.props.currentCatalogFashionOffers.length;
        }
        return averageCost;
    }
    //
}

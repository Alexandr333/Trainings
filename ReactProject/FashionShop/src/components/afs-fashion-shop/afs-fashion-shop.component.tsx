import './afs-fashion-shop.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { FashionHeader, IFashionHeaderSearchInputsInfo } from '../afs-fashion-header/afs-fashion-header.component';
import { CollapsingMenu, ICollapsingMenuItem } from '../afs-collapsing-menu/afs-collapsing-menu.component';
import { FashionCatalog, IFashionCatalogItem} from '../afs-fashion-catalog/afs-fashion-catalog.component';
import { Loading } from '../afs-loading/afs-loading.component';

import { connect } from 'react-redux';
import { fashionOffersActions } from '../../store/actions/index';
import { FashionOffersSearchTerms, FashionOffer } from '../../models/index';
import { IAppState } from '../../store/common.models';

import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import { FashionOffersService } from '../../services/index';


interface IFashionShopProps
{
    offers: FashionOffer[];
    offersLoadingStatus: string;
}
interface IFashionShopState
{
    isMenuCollapsed: boolean;
    offers: FashionOffer[];
}
interface DispatchProps {
    loadOffers: (filterParams: FashionOffersSearchTerms) => void;
}
interface ISuperProps extends IFashionShopProps, DispatchProps
{
}

export class FashionShop extends React.Component<ISuperProps , IFashionShopState>
{
    private _menuItems: ICollapsingMenuItem[] = [
        {
            iconURL: require('../../assets/icons/icon-1.png'),
            titleText: 'First item',
        },
        {
            iconURL: require('../../assets/icons/icon-1.png'),
            titleText: 'Second item',
        },
        {
            iconURL: require('../../assets/icons/icon-1.png'),
            titleText: 'Third item',
        },
        {
            iconURL: require('../../assets/icons/icon-1.png'),
            titleText: 'Fourth item',
        },
        {
            iconURL: require('../../assets/icons/icon-1.png'),
            titleText: 'Fifth item',
        }
    ];
    private _searchService: FashionOffersService;
    private _totalOffersCount: number = 0;
    private _averagePrice: number = 0;
    private _isDataLoaded: boolean = true;
    private _waitedTerms: FashionOffersSearchTerms = null;
    //
    get sideMenuClasses(): string
    {
        return this.state.isMenuCollapsed ? 'afs-fashion-shop__side-menu_collapsed' : '';
    }
    //
    constructor(props: ISuperProps )
    {
        super(props);
        this.state = {
            isMenuCollapsed: false,
            offers: []
        } as IFashionShopState;
        this._searchService = new FashionOffersService();
        this._searchTermsChanged = this._searchTermsChanged.bind(this);
        this._mapToFashionCatalogItem = this._mapToFashionCatalogItem.bind(this);
        this._displaySearchResults = this._displaySearchResults.bind(this);
        this.props.loadOffers(new FashionOffersSearchTerms());
    }
    //
    public render(): JSX.Element
    {
        return(
            <div className="afs-fashion-shop">
                <div className="afs-fashion-shop__box">
                    <div className={`afs-fashion-shop__side-menu ${this.sideMenuClasses}`}>
                        <CollapsingMenu
                            titleIconURL={require('../../assets/icons/menu_icon.png')}
                            titleText="Menu"
                            isCollapsed={false}
                            items={this._menuItems}
                            onStateChange={this._menuChangeState()}
                        />
                    </div>
                    <div className="afs-fashion-shop__content">
                        <div className="afs-fashion-shop__background">
                            <div className="afs-fashion-shop__top-background" />
                            <div className="afs-fashion-shop__bottom-background" />
                        </div>
                        <div className="afs-fashion-shop__header">
                            <FashionHeader
                                onSearchInputsChanged={this._searchTermsChanged}
                                totalCount={this._totalOffersCount}
                                averagePrice={this._averagePrice}
                            />
                        </div>
                        <div className="afs-fashion-shop__catalog">
                            <div className="afs-fashion-shop__catalog-title">
                                Shop Style
                            </div>
                            {this._displaySearchResults()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    //
    public componentWillReceiveProps(newProps: ISuperProps): void
    {
        if (newProps.offersLoadingStatus !== 'loading_start')
        {
            console.log(newProps);
            this._onDataLoad(newProps.offers);
        }
    }
    private _loadData(terms: FashionOffersSearchTerms): void
    {
        if (this._isDataLoaded)
        {
            console.log('load');
            this.props.loadOffers(terms);
            this._isDataLoaded = false;
            this._waitedTerms = null;
        } else {
            this._waitedTerms = terms;
        }
    }
    private _onDataLoad(searchResult: FashionOffer[]): void
    {
        this._averagePrice = parseFloat(this._calculateAveragePrive(searchResult).toFixed(2));
        this._totalOffersCount = searchResult.length;
        this._isDataLoaded = true;
        if (this._waitedTerms)
        {
            this._averagePrice = 0;
            this._totalOffersCount = 0;
            this._loadData(this._waitedTerms);
        }
    }
    private _searchTermsChanged(searchTerms: IFashionHeaderSearchInputsInfo): void
    {
        let terms = this._mapToFashionOffersSearchTerms(searchTerms);
        this._loadData(terms);
    }
    private _calculateAveragePrive(offers: FashionOffer[]): number
    {
        let averageCost: number = 0;
        for (let offer of offers)
        {
            averageCost += offer.price;
        }
        return offers.length ? averageCost / offers.length : 0;
    }
    //
    private _displaySearchResults(): JSX.Element
    {
        let result: JSX.Element;
        if (this.props.offersLoadingStatus === 'loading_start')
        {
            result = (
                <div className="afs-fashion-shop__loading">
                    <Loading/>
                </div>
            );
        } else if (this.props.offers.length === 0)
        {
            result =  (
                <div className="afs-fashion-shop__no-results">
                    Nothing found
                </div>
            );
        } else
        {
            result =  (
                <FashionCatalog
                    items={this._mapToFashionCatalogItem(this.props.offers)}
                    header="Shop style"
                />
            );
        }
        return result;
    }
    private _menuChangeState(): (isCollapsed: boolean) => void
    {
        return (isCollapsed: boolean) =>
        {
            this.setState(
                (prevState: IFashionShopState) =>
                {
                    prevState.isMenuCollapsed = isCollapsed;
                    return prevState;
                }
            );
        };
    }
    private _mapToFashionOffersSearchTerms(terms: IFashionHeaderSearchInputsInfo): FashionOffersSearchTerms
    {
        let searchTerms: FashionOffersSearchTerms = new FashionOffersSearchTerms();
        searchTerms.brand = terms.brand;
        searchTerms.currency = terms.currency;
        searchTerms.price = terms.price;
        searchTerms.retailer = terms.retailer;
        searchTerms.title = terms.title;
        return searchTerms;
    }
    private _mapToFashionCatalogItem(offers: FashionOffer[]): IFashionCatalogItem[]
    {
        return offers.map(
            (item: FashionOffer, index) =>
            {
                return {
                    imageURL: item.imageURL,
                    title: item.title.length > 35 ? item.title.substr(0, 35) + '...' : item.title,
                    price: item.price,
                    currency: item.currency,
                } as IFashionCatalogItem;
            }
        );
    }
    //
}
const mapStateToProps = (state: IAppState): IFashionShopProps => {
    const offers = state.fashionOffersState.fashionOffers;
    const offersLoadingStatus = state.fashionOffersState.loadingStatus;
    return { offers, offersLoadingStatus };
};
const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    loadOffers: (values: FashionOffersSearchTerms) => dispatch(fashionOffersActions.loadFashionOffers(values))
});
export let FashionShopApp = connect(mapStateToProps, mapDispatchToProps )(FashionShop);

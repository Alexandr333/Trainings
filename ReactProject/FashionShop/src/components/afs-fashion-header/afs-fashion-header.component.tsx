import './afs-fashion-header.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Dropdown, IDropdownElement} from '../afs-dropdown/afs-dropdown.component';
import { TitledLabel } from '../afs-titled-label/afs-titled-label.component';
import { FashionSearchForm, IFashionSearchFormItems } from '../afs-fashion-search-form/afs-fashion-search-form.component';

interface IFashionHeaderProps
{
    onSearchInputsChanged: (searchInputsValues: IFashionHeaderSearchInputsInfo) => void;
    averagePrice: number;
    totalCount: number;
}
interface IFashionHeaderState
{
    searchFormHidden: boolean;
}
export interface IFashionHeaderSearchInputsInfo
{
    title: string;
    currency: string;
    price: number;
    retailer: string;
    brand: string;
}
//
export class FashionHeader extends React.Component<IFashionHeaderProps , IFashionHeaderState>
{
    private _catalogs= [
        {
            value: 'First catalog',
            key: '1'
        } as IDropdownElement,
        {
            value: 'Second catalog',
            key: '2'
        } as IDropdownElement,
        {
            value: 'First catalog select it please',
            key: '3'
        } as IDropdownElement
    ];
    private _searchInputsInfo: IFashionHeaderSearchInputsInfo = {
        title: '',
        currency: '',
        price: 0,
        retailer: '',
        brand: ''
    };
    constructor(props: IFashionHeaderProps)
    {
        super(props);
        this.state = {
            searchFormHidden : true
        } as IFashionHeaderState;
        this._advancedButtonClicked = this._advancedButtonClicked.bind(this);
        this._advancedFormItemsChanged = this._advancedFormItemsChanged.bind(this);
        this._searchButtonClicked = this._searchButtonClicked.bind(this);
        this._catalogSelected = this._catalogSelected.bind(this);
        this._mainInputChanged = this._mainInputChanged.bind(this);
    }
    //
    public render(): JSX.Element
    {
        return(
            <div className="afs-fashion-header">
                <div className="afs-fashion-header__controls">
                    <div className="afs-fashion-header__search-box">
                        <div className="afs-fashion-header__main-search">
                            <input
                                className="afs-fashion-header__main-input"
                                placeholder="Search"
                                onChange={this._mainInputChanged}
                            />
                            <button
                                className="afs-fashion-header__button afs-fashion-header__button_main"
                                onClick={this._searchButtonClicked}
                            >
                                Search
                            </button>
                        </div>
                        <button
                            className="afs-fashion-header__button afs-fashion-header__button_advanced"
                            onClick={this._advancedButtonClicked}
                        >
                            Advanced
                        </button>
                        <div className="afs-fashion-header__advanced-search-form" hidden={this.state.searchFormHidden}>
                            <FashionSearchForm onChange={this._advancedFormItemsChanged}/>
                        </div>
                    </div>
                    <div className="afs-fashion-header__dropdown">
                        <Dropdown
                            placeholder="select catalog"
                            items={this._catalogs}
                            onSelect={this._catalogSelected}
                        />
                    </div>
                </div>
                <div className="afs-fashion-header__search-info">
                    <div className="afs-fashion-header__search-result">
                        <TitledLabel
                            title="Items Found"
                            label={this.props.totalCount.toString()}
                        />
                    </div>
                    <div className="afs-fashion-header__search-result">
                        <TitledLabel
                            title="Average cost"
                            label={this.props.averagePrice.toString()}
                        />
                    </div>
                </div>
            </div>
        );
    }
    private _mainInputChanged(event: React.ChangeEvent<HTMLInputElement>): void
    {
        this._searchInputsInfo.title = event.target.value;
        this.props.onSearchInputsChanged(this._searchInputsInfo);
    }
    private _searchButtonClicked(): void
    {
        this.props.onSearchInputsChanged(this._searchInputsInfo);
    }
    private _advancedButtonClicked(): void
    {
        this.setState(
            (prevState: IFashionHeaderState) =>
            {
                prevState.searchFormHidden = !prevState.searchFormHidden;
                return prevState;
            }
        );
    }
    private _advancedFormItemsChanged(formItems: IFashionSearchFormItems): void
    {
        this._mapAdvancedFormItems(formItems);
        this.props.onSearchInputsChanged(this._searchInputsInfo);
    }
    private _mapAdvancedFormItems(formItemsValues: IFashionSearchFormItems): void
    {
        this._searchInputsInfo.currency = formItemsValues.currency;
        this._searchInputsInfo.price = formItemsValues.price;
        this._searchInputsInfo.retailer = formItemsValues.retailer;
        this._searchInputsInfo.brand = formItemsValues.brand;
    }
    private _catalogSelected(key: string): void
    {
        console.log(key);
    }
    //
}

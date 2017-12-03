import './afs-advanced-search.css';

import * as React from 'react';

import { IAdvancedSearchProps, IAdvancedSearchState, IAdvancedSearchItems } from './afs-advanced-search.models';
import { IDropdownElement, Dropdown } from '../afs-dropdown/index';
import { ValidatedInput, IValidationResult } from '../afs-validated-input/index';


export class AdvancedSearch extends React.Component<IAdvancedSearchProps, IAdvancedSearchState>
{
    private _currencies: IDropdownElement[] = [
        {
            value: 'USD',
            key: 'USD'
        } as IDropdownElement,
        {
            value: 'EUR',
            key: 'EUR'
        } as IDropdownElement,
        {
            value: 'RUB',
            key: 'RUB'
        } as IDropdownElement,
        {
            value: 'BYR',
            key: 'BYR'
        } as IDropdownElement
    ];
    private _formItems: IAdvancedSearchItems = {
        currency: '',
        price: 0,
        retailer: '',
        brand: ''
    };
    constructor(props: IAdvancedSearchProps)
    {
        super(props);
        this.state = {
            isFormOpened: false
        } as IAdvancedSearchState;
        this._currencyChanged = this._currencyChanged.bind(this);
        this._priceChanged = this._priceChanged.bind(this);
        this._retailerChanged = this._retailerChanged.bind(this);
        this._brandChanged = this._brandChanged.bind(this);
        //
        this._validatePrice = this._validatePrice.bind(this);
        this._validateRetailer = this._validateRetailer.bind(this);
        this._validateBrand = this._validateBrand.bind(this);
        //
        this._advancedButtonClicked = this._advancedButtonClicked.bind(this);
    }
    public render(): JSX.Element
    {
        return(
            <div className="afs-advanced-search">
                <div className="afs-advanced-search_container">
                    <button
                        className="afs-advanced-search__button"
                        onClick={this._advancedButtonClicked}
                    >
                        Advanced
                    </button>
                    <div className="afs-advanced-search__form" hidden={!this.state.isFormOpened}>
                        <div className="afs-advanced-search__header">
                            Advanced search
                        </div>
                        <div className="afs-advanced-search__elements">
                            <div className="afs-advanced-search__control afs-advanced-search__control_dropdown">
                                <Dropdown
                                    onSelect={this._currencyChanged}
                                    items={this._currencies}
                                    placeholder="Currency"
                                />
                            </div>
                            <div className="afs-advanced-search__control">
                                <ValidatedInput
                                    onChange={this._priceChanged}
                                    validateFunc={this._validatePrice}
                                    placeholder="Price"
                                />
                            </div>
                            <div className="afs-advanced-search__control">
                                <ValidatedInput
                                    onChange={this._retailerChanged}
                                    validateFunc={this._validateRetailer}
                                    placeholder="Retailer"
                                />
                            </div>
                            <div className="afs-advanced-search__control">
                                <ValidatedInput
                                    onChange={this._brandChanged}
                                    validateFunc={this._validateBrand}
                                    placeholder="Brand"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    private _advancedButtonClicked(): void
    {
        this.setState(
            (prevState: IAdvancedSearchState) =>
            {
                prevState.isFormOpened = !prevState.isFormOpened;
                return prevState;
            }
        );
    }
    //
    private _currencyChanged(key: string): void
    {
        this._formItems.currency = key;
        this.props.onChange(this._formItems);
    }
    //
    private _priceChanged(newValue: string): void
    {
        this._formItems.price = newValue ? +newValue : 0;
        this.props.onChange(this._formItems);
    }
    private _validatePrice(value: string): IValidationResult
    {
        let price: number;
        let validationResult: IValidationResult = {
            valid: true,
            validationMessage: ''
        };
        price = +value;
        if (isNaN(price))
        {
            validationResult.valid = false;
            validationResult.validationMessage = 'Price should be a number';
        } else if (price <= 0 && value !== '')
        {
            validationResult.valid = false;
            validationResult.validationMessage = 'Price should be greater then 0';
        }
        return validationResult;
    }
    //
    private _retailerChanged(newValue: string): void
    {
        this._formItems.retailer = newValue;
        this.props.onChange(this._formItems);
    }
    private _validateRetailer(value: string): IValidationResult
    {
        let validationResult: IValidationResult = {
            valid: true,
            validationMessage: ''
        };
        let regExp: RegExp = new RegExp('[0-9]+');
        if (regExp.test(value))
        {
            validationResult.valid = false;
            validationResult.validationMessage = 'Should be a string value';
        }
        return validationResult;
    }
    //
    private _brandChanged(newValue: string): void
    {
        this._formItems.brand = newValue;
        this.props.onChange(this._formItems);
    }
    private _validateBrand(value: string): IValidationResult
    {
        let validationResult: IValidationResult = {
            valid: true,
            validationMessage: ''
        };
        let regExp: RegExp = new RegExp('[0-9]+');
        if (regExp.test(value))
        {
            validationResult.valid = false;
            validationResult.validationMessage = 'Should be a string value';
        }
        return validationResult;
    }

}

import './afs-fashion-search-form.css';

import * as React from 'react';
import { ValidatedInput, IValidationResult } from '../afs-validated-input/afs-validated-input.component';
import { Dropdown, IDropdownElement } from '../afs-dropdown/afs-dropdown.component';

interface IFashionSearchFormProps
{
    onChange: (formItems: IFashionSearchFormItems) => void;
}
interface IFashionSearchFormState
{

}
export interface IFashionSearchFormItems
{
    currency: string;
    price: number;
    retailer: string;
    brand: string;
}
export class FashionSearchForm extends React.Component<IFashionSearchFormProps, IFashionSearchFormState>
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
    private _formItems: IFashionSearchFormItems = {
        currency: '',
        price: 0,
        retailer: '',
        brand: ''
    };
    constructor(props: IFashionSearchFormProps)
    {
        super(props);
        this._currencyChanged = this._currencyChanged.bind(this);
        this._priceChanged = this._priceChanged.bind(this);
        this._retailerChanged = this._retailerChanged.bind(this);
        this._brandChanged = this._brandChanged.bind(this);
        //
        this._validatePrice = this._validatePrice.bind(this);
        this._validateRetailer = this._validateRetailer.bind(this);
        this._validateBrand = this._validateBrand.bind(this);
    }
    public render(): JSX.Element
    {
        return(
            <div className="afs-fashion-search-form">
                <div className="afs-fashion-search-form__header">
                    Advanced search
                </div>
                <div className="afs-fashion-search-form__elements">
                    <div className="afs-fashion-search-form__control">
                        <Dropdown
                            onSelect={this._currencyChanged}
                            items={this._currencies}
                            placeholder="Currency"
                        />
                    </div>
                    <div className="afs-fashion-search-form__control">
                        <ValidatedInput
                            onChange={this._priceChanged}
                            validateFunc={this._validatePrice}
                            placeholder="Price"
                        />
                    </div>
                    <div className="afs-fashion-search-form__control">
                        <ValidatedInput
                            onChange={this._retailerChanged}
                            validateFunc={this._validateRetailer}
                            placeholder="Retailer"
                        />
                    </div>
                    <div className="afs-fashion-search-form__control">
                        <ValidatedInput
                            onChange={this._brandChanged}
                            validateFunc={this._validateBrand}
                            placeholder="Brand"
                        />
                    </div>
                </div>
            </div>
        );
    }
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

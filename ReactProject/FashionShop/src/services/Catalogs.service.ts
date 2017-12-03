import axios, {AxiosResponse, AxiosPromise} from 'axios';

import * as offersDataJSON from '../assets/response-data-export.json';
import * as publicCatalogsJSON from '../assets/publicCatalogs.json';
import * as publicCatalogsOffersJSON from '../assets/publicCatalogsOffers.json';
import { FashionOffersSearchTerms, FashionOffer, CatalogInfo, LoadingStatus } from '../models/index';
import { LocalStorageService } from './LocalStorage.service';

export class CatalogsService
{
    //
    private _apiURL: string;
    private _publicCatalogsURL: string;
    private _privateCatalogURL: string;
    private _favoritesCatalogURL: string;
    private _localStorageService: LocalStorageService;
    //
    public constructor()
    {
       this._apiURL = 'index.html';
       this._publicCatalogsURL = '';
       this._privateCatalogURL = 'private';
       this._favoritesCatalogURL = 'favorites';
       this._localStorageService = new LocalStorageService();
    }
    //
    public getPublicCatalogsList(): Promise<CatalogInfo[]>
    {
        let dataURL: string = this._apiURL + this._publicCatalogsURL;
        return this._loadData(dataURL).then(
            (response) =>
            {
                let result: CatalogInfo[] = this._mapToCatalogInfo(publicCatalogsJSON);
                return result;
            }
        );
    }
    public getPublicCatalogOffers(catalogID: string, searchTerms: FashionOffersSearchTerms): Promise<FashionOffer[]>
    {
        let dataURL: string = this._apiURL + this._publicCatalogsURL;
        return this._loadData(dataURL).then(
            (response) =>
            {
                let fashionOffers: FashionOffer[] = this._mapFromPublicCatalogResponseToFashionOffers(
                    this._getPublicCatalogOffersByCatalogID(catalogID, publicCatalogsOffersJSON)
                );
                return this._filterFashionOffers(searchTerms, fashionOffers);
            }
        );
    }
    public getPrivateCatalogOffers(searchTerms: FashionOffersSearchTerms): Promise<FashionOffer[]>
    {
        let dataURL: string = this._apiURL + this._privateCatalogURL;
        return this._loadData(dataURL).then(
            (response) =>
            {
                let fashionOffers: FashionOffer[] = [];
                if (this._localStorageService.isSupported)
                {
                    fashionOffers = this._mapFromPrivateCatalogResponseToFashionOffers(
                        JSON.parse(this._localStorageService.getItem(this._privateCatalogURL))
                    );
                }
                return this._filterFashionOffers(searchTerms, fashionOffers);
            }
        );
    }
    public setOffersToPrivateCatalog(fashionOffers: FashionOffer[]): void
    {
        this._localStorageService.setItem(this._privateCatalogURL, JSON.stringify(fashionOffers));
    }
    public getFavoritesOffers(searchTerms: FashionOffersSearchTerms): Promise<FashionOffer[]>
    {
        let dataURL: string = this._apiURL + this._publicCatalogsURL;
        return this._loadData(dataURL).then(
            (response) =>
            {
                let fashionOffers: FashionOffer[] = [];
                if (this._localStorageService.isSupported)
                {
                    fashionOffers = this._mapFromPrivateCatalogResponseToFashionOffers(
                        JSON.parse(this._localStorageService.getItem(this._favoritesCatalogURL))
                    );
                }
                return this._filterFashionOffers(searchTerms, fashionOffers);
            }
        );
    }
    public setOffersToFavorites(fashionOffers: FashionOffer[]): void
    {
        this._localStorageService.setItem(this._favoritesCatalogURL, JSON.stringify(fashionOffers));
    }
    //
    private _loadData(apiURL: string): AxiosPromise
    {
        return axios.get(
            this._apiURL
        );
    }
    //
    private _mapToCatalogInfo(objects: any): CatalogInfo[]
    {
        let result: CatalogInfo[] = [];
        for (let obj of objects)
        {
            try
            {
                let catalogInfo: CatalogInfo = new CatalogInfo();
                catalogInfo.catalogID = obj.catalogID;
                catalogInfo.catalogName = obj.catalogName;
                result.push(catalogInfo);
            }
            catch (error)
            {
                console.log(error);
            }
        }
        return result;
    }
    private _mapFromFavoritesResponseToFashionOffers(objects: any[]): FashionOffer[]
    {
        let result: FashionOffer[] = [];
        for (let obj of objects)
        {
            try
            {
                let offer: FashionOffer = new FashionOffer();
                offer.id = obj.id;
                offer.imageURL = obj.imageURL;
                offer.title = obj.title;
                offer.brand = obj.brand;
                offer.price = obj.price;
                offer.currency = obj.currency;
                offer.gender = obj.gender;
                offer.retailer = obj.retailer;
                result.push(offer);
            }
            catch (error)
            {
                console.log(error);
            }
        }
        return result;
    }
    private _mapFromPrivateCatalogResponseToFashionOffers(objects: any[]): FashionOffer[]
    {
        let result: FashionOffer[] = [];
        for (let obj of objects)
        {
            try
            {
                let offer: FashionOffer = new FashionOffer();
                offer.id = obj.id;
                offer.imageURL = obj.imageURL;
                offer.title = obj.title;
                offer.brand = obj.brand;
                offer.price = obj.price;
                offer.currency = obj.currency;
                offer.gender = obj.gender;
                offer.retailer = obj.retailer;
                result.push(offer);
            }
            catch (error)
            {
                console.log(error);
            }
        }
        return result;
    }
    private _mapFromPublicCatalogResponseToFashionOffers(objects: any[]): FashionOffer[]
    {
        let result: FashionOffer[] = [];
        for (let obj of objects)
        {
            try
            {
                let offer: FashionOffer = new FashionOffer();
                offer.id = obj.object.gid;
                offer.imageURL = obj.object.metadata.mainImageUrl;
                offer.title = obj.object.metadata.title;
                offer.brand = obj.object.metadata.brand;
                offer.price = obj.object.metadata.price;
                offer.currency = obj.object.metadata.currency;
                offer.gender = obj.object.metadata.gender;
                offer.retailer = obj.object.metadata.retailer;
                result.push(offer);
            }
            catch (error)
            {
                console.log(error);
            }
        }
        return result;
    }
    //
    private _getPublicCatalogOffersByCatalogID(catalogID: string, data: any): object[]
    {
        let result: any[] = [];
        let workSet: any[];
        try
        {
            workSet = data.response.results;
            for (let catalogData of data.response.results)
            {
                if (catalogData.catalogID === catalogID)
                {
                    result = catalogData.offers;
                }
            }
            return result;
        }
        catch (exc)
        {
            return result;
        }
    }
    private _filterFashionOffers(searchTerms: FashionOffersSearchTerms, data: FashionOffer[]): FashionOffer[]
    {
        let filtredResult: FashionOffer[] = data;
        if (searchTerms !== null )
        {
            filtredResult = data.filter(
                (elem: FashionOffer) =>
                {
                    let result: boolean = true;
                    result = result && elem.title.indexOf(searchTerms.title) > -1;
                    console.log(result);
                    result = result && elem.currency.indexOf(searchTerms.currency) > -1;
                    console.log(result);
                    result = result && elem.brand.indexOf(searchTerms.brand) > -1;
                    console.log(result);
                    if (searchTerms.price > 0 && searchTerms.price !== null)
                    {
                        result = result && elem.price === searchTerms.price;
                        console.log(result);
                    }
                    result = result && elem.retailer.indexOf(searchTerms.retailer) > -1;
                    console.log(result);
                    return result;
                }
            );
        }
        return filtredResult;
    }
}

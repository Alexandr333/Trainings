import axios, {AxiosResponse, AxiosPromise} from 'axios';

import * as offersData from '../assets/response-data-export.json';
import { FashionOffersSearchTerms, FashionOffer } from '../models/index';

export class FashionOffersService
{
    //
    private _apiURL: string;
    //
    public constructor()
    {
       this._apiURL = 'index.html';
    }
    public getFiltredOffers(searchTerms: FashionOffersSearchTerms): Promise<FashionOffer[]>
    {
        return this._loadData().then(
            (response) =>
            {
                let data = this._mapToSearchResults(offersData.response.results);
                return this._filterData(searchTerms,  data);
            }
        );
    }
    private _loadData(): AxiosPromise
    {
        return axios.get(
            this._apiURL
        );
    }
    private _mapToSearchResults(objects: any[]): FashionOffer[]
    {
        let result: FashionOffer[] = [];
        let sumCost: number = 0;
        for (let obj of objects)
        {
            try
            {
                let offer: FashionOffer = new FashionOffer();
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
    private _filterData(searchTerms: FashionOffersSearchTerms, data: FashionOffer[]): FashionOffer[]
    {
        let filtredResult: FashionOffer[] = [];
        filtredResult = data.filter(
            (elem: FashionOffer) =>
            {
                let result: boolean = true;
                result = result && elem.title.indexOf(searchTerms.title) > -1;
                result = result && elem.currency.indexOf(searchTerms.currency) > -1;
                result = result && elem.brand.indexOf(searchTerms.brand) > -1;
                if (searchTerms.price > 0)
                {
                    result = result && elem.price === searchTerms.price;
                }
                result = result && elem.retailer.indexOf(searchTerms.retailer) > -1;
                return result;
            }
        );
        return filtredResult;
    }
}

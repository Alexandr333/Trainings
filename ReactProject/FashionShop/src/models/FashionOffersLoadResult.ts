import {FashionOffer} from './FashionOffer';

export  interface IFashionOffersLoadResult {
    offers: FashionOffer[];
    error: boolean;
}
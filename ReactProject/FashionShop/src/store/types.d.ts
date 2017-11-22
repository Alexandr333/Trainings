import { Action } from "redux";
import { FashionOffer, IFashionOffersLoadResult } from '../models/index';

export interface IFashionOffersState  {
    fashionOffers: FashionOffer[];
    loadingStatus: string;
}

export interface IAppState{
    fashionOffersState: IFashionOffersState;
}

export interface IAction<T> extends Action
{
    payload: T;
}
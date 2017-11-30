import { Action } from 'redux';
import { FashionOffer, IFashionOffersLoadResult } from '../models/index';

//#region store states interfaces
export interface IFashionOffersState  {
    fashionOffers: FashionOffer[];
    loadingStatus: string;
}

export interface IAppState {
    fashionOffersState: IFashionOffersState;
}
//#endregion store states interfaces

//#region action creator function
export interface IAction<T> extends Action
{
    payload: T;
}

export function actionCreator<T>(type: string): (payload: T) => IAction<T>
{
    return function (payload: T): IAction<T>
    {
        return {
            type,
            payload
        };
    };
}
//#endregion action creator function

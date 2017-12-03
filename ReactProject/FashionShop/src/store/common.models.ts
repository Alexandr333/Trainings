import { Action, Middleware, MiddlewareAPI, Dispatch } from 'redux';
import { FashionOffer,  LoadingStatus, CatalogInfo, FashionOffersSearchTerms } from '../models/index';

//#region store states interfaces
export interface IPublicCatalogsState
{
    catalogs: CatalogInfo[];
    catalogsLoadingStatus: LoadingStatus;
    offers: FashionOffer[];
    offersLoadingStatus: LoadingStatus;
    currentCatalog: CatalogInfo;
}

export interface IFashionOffersSearchTermsState
{
    searchTerms: FashionOffersSearchTerms;
}

export interface IAppState
{
    publicCatalogsState: IPublicCatalogsState;
    fashionOffersSearchTermsState: IFashionOffersSearchTermsState;
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

//#region My middleware
export interface Middleware<StateType> extends Middleware {
    <S extends StateType>(api: MiddlewareAPI<S>): (next: Dispatch<S>) => Dispatch<S>;
}
//#endregion My middleware

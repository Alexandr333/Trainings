import { IPublicCatalogsState, IAction } from '../common.models';
import { publicCatalogsActionsTypes } from '../actions/index';
import { Action } from 'redux';
import { LoadingStatus, LoadingResult, FashionOffer, CatalogInfo } from '../../models/index';

const initState = {
    catalogs: [],
    catalogsLoadingStatus: null,
    currentCatalog: null,
    offers: [],
    offersLoadingStatus: null
} as IPublicCatalogsState;


export function publicCatalogsReducer( state: IPublicCatalogsState = initState, action: Action ): IPublicCatalogsState
{
    switch ( action.type )
    {
        case publicCatalogsActionsTypes.LOAD_CATALOGS_INFO: {
            return {
                ...state,
                catalogsLoadingStatus: LoadingStatus.loading
            };
        }
        case publicCatalogsActionsTypes.CATALOGS_INFO_LOADED: {
            let onLoadAction = (action as IAction<LoadingResult<CatalogInfo[]> >);
            return {
                ...state,
                catalogsLoadingStatus: onLoadAction.payload.status,
                catalogs: onLoadAction.payload.data
            };
        }
        case publicCatalogsActionsTypes.LOAD_CATALOG_OFFERS: {
            let onLoadAction = (action as IAction<CatalogInfo>);
            return {
                ...state,
                currentCatalog: {...onLoadAction.payload},
                offersLoadingStatus: LoadingStatus.loading
            };
        }
        case publicCatalogsActionsTypes.CATALOG_OFFERS_LOADED: {
            let onLoadAction = (action as IAction<LoadingResult<FashionOffer[]> >);
            return {
                ...state,
                offersLoadingStatus: onLoadAction.payload.status,
                offers: onLoadAction.payload.data
            };
        }
        //
        default:
        return state;
    }
}

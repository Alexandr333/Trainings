import { fashionOffersActionsTypes } from '../actions';
import { Action } from 'redux';
import { IFashionOffersLoadResult } from '../../models/index';
import { IFashionOffersState, IAction } from '../common.models';

const initState: IFashionOffersState = {
    fashionOffers: [],
    loadingStatus: ''
};
export function fashionOffersReducer(state: IFashionOffersState = initState, action: Action): IFashionOffersState
{
    switch (action.type)
    {
        case fashionOffersActionsTypes.LOAD_FASHION_OFFERS: {
            return{
                ...state,
                loadingStatus: 'loading_start'
            };
        }
        case fashionOffersActionsTypes.FASHION_OFFERS_LOADED: {
            let onLoadAction = (action as IAction<IFashionOffersLoadResult>);
            return{
                fashionOffers: onLoadAction.payload.offers,
                loadingStatus: onLoadAction.payload.error ? 'error_loading' : 'success'
            };
        }
        //
        default:
        return state;
    }
}

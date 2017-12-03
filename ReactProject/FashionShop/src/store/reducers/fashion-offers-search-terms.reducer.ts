import { IFashionOffersSearchTermsState, IAction } from '../common.models';
import { fashionOffersSearchTermsActionsTypes } from '../actions/index';
import { Action } from 'redux';
import { FashionOffersSearchTerms } from '../../models/index';

const initState = {
    searchTerms: null
} as  IFashionOffersSearchTermsState;

export function fashionOffersSearchTermsReducer(
    state: IFashionOffersSearchTermsState = initState, action: Action ): IFashionOffersSearchTermsState
{
    switch ( action.type )
    {
        case fashionOffersSearchTermsActionsTypes.FASHION_OFFERS_SEARCH_TERMS_CHANGED:
        {
            let onTermsChangedAction = (action as IAction<FashionOffersSearchTerms>);
            return {
                searchTerms: onTermsChangedAction.payload.copy()
            } as IFashionOffersSearchTermsState;
        }
        //
        default:
        return state;
    }
}

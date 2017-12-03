import { combineReducers } from 'redux';
import { IAppState } from '../common.models';
import { publicCatalogsReducer } from './public-catalogs.reducer';
import { fashionOffersSearchTermsReducer } from './fashion-offers-search-terms.reducer';

export const reducers = combineReducers<IAppState>(
    {
        publicCatalogsState: publicCatalogsReducer,
        fashionOffersSearchTermsState: fashionOffersSearchTermsReducer
    }
);

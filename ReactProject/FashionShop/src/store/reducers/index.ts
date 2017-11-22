import { fashionOffersReducer } from './fashion-offers.reducer';
import { combineReducers } from 'redux';
import { IAppState } from '../types';

export const reducers = combineReducers<IAppState>(
    {
        fashionOffersState: fashionOffersReducer
    }
);

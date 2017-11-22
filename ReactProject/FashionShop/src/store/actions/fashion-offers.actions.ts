import { IAction } from '../types';
import { FashionOffersSearchTerms, FashionOffer, IFashionOffersLoadResult } from '../../models/index';
import { actionCreator } from '../actionCreator';
import * as actionTypes from './fashion-offers.action.types';

export const loadFashionOffers = actionCreator<FashionOffersSearchTerms>(actionTypes.LOAD_FASHION_OFFERS);
export const fashionOffersLoaded = actionCreator<IFashionOffersLoadResult>(actionTypes.FASHION_OFFERS_LOADED);

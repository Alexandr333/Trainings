import { FashionOffersSearchTerms, FashionOffer, IFashionOffersLoadResult } from '../../models/index';
import { actionCreator } from '../common.models';
import * as actionTypes from './fashion-offers.action.types';

export const loadFashionOffers = actionCreator<FashionOffersSearchTerms>(actionTypes.LOAD_FASHION_OFFERS);
export const fashionOffersLoaded = actionCreator<IFashionOffersLoadResult>(actionTypes.FASHION_OFFERS_LOADED);

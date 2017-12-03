import { FashionOffersSearchTerms } from '../../models/index';
import { actionCreator } from '../common.models';
import * as actionTypes from './fashion-offers-search-terms.actions.types';

export const searchTermsChanged = actionCreator<FashionOffersSearchTerms>(actionTypes.FASHION_OFFERS_SEARCH_TERMS_CHANGED);

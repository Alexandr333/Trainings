import * as actionTypes from './public-catalogs.action.types';
import { actionCreator } from '../common.models';
import { CatalogInfo, LoadingResult, FashionOffer } from '../../models/index';

export const loadCatalogsInfo = actionCreator<null>(actionTypes.LOAD_CATALOGS_INFO);
export const catalogsInfoLoaded = actionCreator<LoadingResult<CatalogInfo[]> >(actionTypes.CATALOGS_INFO_LOADED);
//
export const loadCatalogOffers = actionCreator<CatalogInfo>(actionTypes.LOAD_CATALOG_OFFERS);
export const catalogOffersLoaded = actionCreator<LoadingResult<FashionOffer[]> >(actionTypes.CATALOG_OFFERS_LOADED);
//

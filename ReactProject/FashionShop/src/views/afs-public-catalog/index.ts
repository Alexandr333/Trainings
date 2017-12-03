import {PublicCatalog as _publicCatalog} from './afs-public-catalog.view';
import * as models from './afs-public-catalog.models';

import { IAppState } from '../../store/common.models';
import { publicCatalogsActions, fashionOffersSearchTermsActions} from '../../store/actions/index';
import { FashionOffersSearchTerms, CatalogInfo } from '../../models/index';
import { connect } from 'react-redux';



const mapStateToProps = (state: IAppState): models.IPublicCatalogFromStoreProps => {
    const catalogsList = state.publicCatalogsState.catalogs;
    const currentCatalog = state.publicCatalogsState.currentCatalog;
    const catalogsListLoadingStatus = state.publicCatalogsState.catalogsLoadingStatus;
    const currentCatalogFashionOffers = state.publicCatalogsState.offers;
    const currentCatalogFashionOffersLoadingStatus = state.publicCatalogsState.offersLoadingStatus;
    return { currentCatalog,
             catalogsList,
             catalogsListLoadingStatus,
             currentCatalogFashionOffers,
             currentCatalogFashionOffersLoadingStatus
    } as models.IPublicCatalogFromStoreProps;
};
const mapDispatchToProps = (dispatch: any): models.IPublicCatalogDispatchProps => ({
    fashionOffersSearchTermsChanged:
        (terms: FashionOffersSearchTerms) =>
        dispatch(fashionOffersSearchTermsActions.searchTermsChanged(terms)),
        //
    loadPublicCatalogsInfo:
        () =>
        dispatch(publicCatalogsActions.loadCatalogsInfo(null)),
        //
    loadCatalogOffers:
        (catalogInfo: CatalogInfo) =>
        dispatch(publicCatalogsActions.loadCatalogOffers(catalogInfo))
});
export let PublicCatalog = connect(mapStateToProps, mapDispatchToProps )(_publicCatalog);

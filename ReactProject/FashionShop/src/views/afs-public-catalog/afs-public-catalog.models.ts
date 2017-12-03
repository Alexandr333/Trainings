import { RouteComponentProps } from 'react-router-dom';
import { CatalogInfo, FashionOffer, LoadingStatus, FashionOffersSearchTerms } from '../../models/index';



export interface IPublicCatalogDispatchProps
{
    fashionOffersSearchTermsChanged: (terms: FashionOffersSearchTerms) => void;
    loadPublicCatalogsInfo: () => void;
    loadCatalogOffers: (catalog: CatalogInfo) => void;
}
export interface IPublicCatalogFromStoreProps
{
    currentCatalog: CatalogInfo;
    catalogsList: CatalogInfo[];
    catalogsListLoadingStatus: LoadingStatus;
    currentCatalogFashionOffers: FashionOffer[];
    currentCatalogFashionOffersLoadingStatus: LoadingStatus;
}
export interface IPublicCatalogRouteParams
{
}
export interface IPublicCatalogProps extends
IPublicCatalogDispatchProps, IPublicCatalogFromStoreProps, RouteComponentProps<IPublicCatalogRouteParams>
{
}

export interface IPublicCatalogState
{

}

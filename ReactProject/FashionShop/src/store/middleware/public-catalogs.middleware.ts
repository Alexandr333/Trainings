import { MiddlewareAPI, Action } from 'redux';
import { Store, Dispatch} from 'react-redux';
import { FashionOffersSearchTerms, FashionOffer, CatalogInfo, LoadingStatus, LoadingResult } from '../../models/index';
import { IAction, Middleware } from '../common.models';
import { FashionShopDataService } from '../../services/index';
import { publicCatalogsActionsTypes, publicCatalogsActions} from '../actions/index';
import { IAppState } from '../common.models';

export const publicCatalogsMiddleware: Middleware<IAppState> =
<T extends IAppState>(store: Store<T>) => (next: Dispatch<Action>) => (action: Action): any =>
{
    const returnValue = next(action);
    let state: IAppState;
    let service = new FashionShopDataService();
    if (action.type === publicCatalogsActionsTypes.LOAD_CATALOGS_INFO)
    {
        service.catalogsService.getPublicCatalogsList().then(
            (catalogs: CatalogInfo[]) =>
            {
                store.dispatch(
                    publicCatalogsActions.catalogsInfoLoaded(
                        {
                            data: catalogs,
                            status: LoadingStatus.success
                        } as LoadingResult<CatalogInfo[]>
                    )
                );
            }
        ).catch(
            () =>
            {
                store.dispatch(
                    publicCatalogsActions.catalogsInfoLoaded(
                        {
                            data: [],
                            status: LoadingStatus.error
                        } as LoadingResult<CatalogInfo[]>
                    )
                );
            }
        );
    }
    if (action.type === publicCatalogsActionsTypes.LOAD_CATALOG_OFFERS)
    {
        setTimeout(
            () =>
            {
                let catalogID = (action as IAction<CatalogInfo>).payload.catalogID;
                let searchTerms: FashionOffersSearchTerms = store.getState().fashionOffersSearchTermsState.searchTerms;
                service.catalogsService.getPublicCatalogOffers(catalogID, searchTerms).then(
                    (fashionOffers: FashionOffer[]) =>
                    {
                        store.dispatch(
                            publicCatalogsActions.catalogOffersLoaded(
                                {
                                    data: fashionOffers,
                                    status: LoadingStatus.success
                                } as LoadingResult<FashionOffer[]>
                            )
                        );
                    }
                ).catch(
                    () =>
                    {
                        store.dispatch(
                            publicCatalogsActions.catalogOffersLoaded(
                                {
                                    data: [],
                                    status: LoadingStatus.success
                                } as LoadingResult<FashionOffer[]>
                            )
                        );
                    }
                );
            },
            3000
        );
    }
    return returnValue;
};

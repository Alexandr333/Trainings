import { Middleware, MiddlewareAPI, Action } from 'redux';
import { Store, Dispatch} from 'react-redux';
import { IAppState, IAction } from '../types';
import { fashionOffersActions , fashionOffersActionsTypes} from '../actions';
import { FashionOffersService } from '../../services/index';
import { FashionOffersSearchTerms, FashionOffer, IFashionOffersLoadResult } from '../../models/index';

export const fashionOffersLoader: Middleware = <IAppState>(store: Store<IAppState>) => (next: Dispatch<any>) => (action: Action): any =>
{
    const returnValue = next(action);
    let service = new FashionOffersService();
    setTimeout(
        () =>
        {
            if (action.type === fashionOffersActionsTypes.LOAD_FASHION_OFFERS)
            {
              service.getFiltredOffers((action as IAction<FashionOffersSearchTerms>).payload).then(
                (offers: FashionOffer[]) =>
                {
                    store.dispatch(
                        fashionOffersActions.fashionOffersLoaded(
                            {
                                offers: offers,
                                error: false
                            }
                        )
                    );
                }
              ).catch(
                  () =>
                  {
                      store.dispatch(
                          fashionOffersActions.fashionOffersLoaded(
                              {
                                offers: [],
                                error: true
                              }
                          )
                      );
                  }
                );
            }
        },
        5000
    )
    return returnValue;
};

import { createStore, applyMiddleware, compose } from 'redux';

import { reducers } from './reducers';
import * as middleware from './middleware';
import { IAppState } from './types';

export const appStore = createStore<IAppState>(
    reducers,
    applyMiddleware(
        store => next => action =>
        (typeof action === 'function'
            ? action(store.dispatch, store.getState)
            : next(action)
        ),
        middleware.fashionOffersLoader
    )
);

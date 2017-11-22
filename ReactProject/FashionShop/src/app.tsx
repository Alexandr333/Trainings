import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { FashionShop, FashionShopApp } from './components/afs-fashion-shop/afs-fashion-shop.component';
import { Provider } from 'react-redux';
import { appStore } from './store';

interface IAppProps
{

}
interface IAppState
{

}

class App extends React.Component<IAppProps, IAppState>
{
    constructor()
    {
        super();
    }
    public render(): JSX.Element
    {
        return(
            <Provider store={appStore}>
                <div className="app">
                    <FashionShopApp />
                </div>
            </Provider>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app-container')
);

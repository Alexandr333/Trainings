import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { FashionShop } from './components/afs-fashion-shop/afs-fashion-shop.component';

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
            <div className="app">
                <FashionShop/>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app-container')
);

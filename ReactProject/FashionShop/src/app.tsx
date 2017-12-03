import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { appStore } from './store';
import { Root } from './views/afs-root/index';

interface IAppProps
{

}
interface IAppState
{

}

class App extends React.Component<IAppProps, IAppState>
{
    constructor(props: IAppProps)
    {
        super(props);
    }
    public render(): JSX.Element
    {
        return(
            <Provider store={appStore}>
                <div className="app">
                    <Root/>
                </div>
            </Provider>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app-container')
);

import './afs-root.css';
import * as React from 'react';
import { IRootProps, IRootState } from './afs-root.models';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import { CollapsingMenu, ICollapsingMenuItem } from '../../components/afs-collapsing-menu/index';
import { PublicCatalog } from '../afs-public-catalog/index';
import { NotFound } from '../../components/afs-not-found/index';
import { NotImplemented } from '../../components/afs-not-implemented/index';



export class Root extends React.Component<IRootProps, IRootState>
{

    constructor(props: IRootProps)
    {
        super(props);
        this._renderBasicRedirect = this._renderBasicRedirect.bind(this);
    }

    public render(): JSX.Element
    {
        return (
                <div className="afs-root">
                <Router>
                    <div className="afs-root__container">
                        <div className="afs-root__side-menu">
                            <Switch>
                                <Route render={this._createSideMenu} />
                            </Switch>
                        </div>
                        <div className="afs-root__content">
                            <Switch>
                                <Route exact={true} path="/a/a" render={this._renderBasicRedirect}/>
                                <Route path="/public" component={PublicCatalog}/>>
                                <Route path="/private" component={NotImplemented} />
                                <Route path="/favorites" component={NotImplemented} />
                                <Route path="/about" component={NotImplemented} />
                                <Route path="*" component={NotFound} />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }

    private _createSideMenu(): JSX.Element
    {
        let menuItems: ICollapsingMenuItem[] = [
            {
                iconURL: require('../../assets/icons/icon-1.png'),
                titleText: 'First item',
            },
            {
                iconURL: require('../../assets/icons/icon-1.png'),
                titleText: 'Second item',
            },
            {
                iconURL: require('../../assets/icons/icon-1.png'),
                titleText: 'Third item',
            },
            {
                iconURL: require('../../assets/icons/icon-1.png'),
                titleText: 'Fourth item',
            },
            {
                iconURL: require('../../assets/icons/icon-1.png'),
                titleText: 'Fifth item',
            }
        ];
        return (
            <CollapsingMenu
                items={menuItems}
                titleIconURL={require('../../assets/icons/menu_icon.png')}
                titleText="Menu"
            />
        );
    }
    private _renderBasicRedirect(): JSX.Element
    {
        return(
            <Redirect to="/public"/>
        );
    }
}

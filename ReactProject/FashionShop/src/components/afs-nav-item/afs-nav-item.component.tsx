import './nav-item.css';

import * as React from 'react';

import { render } from 'react-dom';

import { INavItemProps, INavItemState } from './afs-nav-item.models';
import { NavLink } from 'react-router-dom';

export class NavItem extends React.Component<INavItemProps, INavItemState>
{
    constructor(props: INavItemProps)
    {
        super(props);
    }

    public render(): JSX.Element
    {
        return(
            <div className="afs-nav-item">
                <NavLink to={this.props.navigateTo} className="afs-nav-item__nav-link">
                    <div className="afs-nav-item__item">
                        <img
                            src={this.props.imageURL}
                            alt="Иконка"
                            className="afs-nav-item__item-icon"
                        />
                        <div className="afs-nav-item__item-text">
                            {this.props.title}
                        </div>
                    </div>
                </NavLink>
            </div>
        );
    }
}

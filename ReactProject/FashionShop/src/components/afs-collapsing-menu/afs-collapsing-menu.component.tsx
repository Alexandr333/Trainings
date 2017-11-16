import './afs-collapsing-menu.css';

import * as React from 'react';

interface ICollapsingMenuProps
{
    titleIconURL?: string;
    titleText?: string;
    items?: ICollapsingMenuItem[];
    onStateChange: (isCollapsed: boolean) => void;
    isCollapsed: boolean;
}

interface ICollapsingMenuState
{
    isCollapsed: boolean;
    items?: ICollapsingMenuItem[];
}

export interface ICollapsingMenuItem
{
   iconURL: string;
   titleText: string;
}

export class CollapsingMenu extends React.Component<ICollapsingMenuProps , ICollapsingMenuState>
{
    constructor(props: ICollapsingMenuProps)
    {
        super(props);
        this.state = {
            isCollapsed: this.props.isCollapsed,
            items: this.props.items
        } as ICollapsingMenuState;
        this._changeState = this._changeState.bind(this);
    }
    //
    public render(): JSX.Element
    {
        return(
            <div className={this.state.isCollapsed ? 'afs-collapsing-menu afs-collapsing-menu_collapsed' : 'afs-collapsing-menu'}>
                <div className="afs-collapsing-menu__title">
                    <img
                        src={this.props.titleIconURL}
                        alt="Иконка"
                        className="afs-collapsing-menu__title-icon"
                        onClick={this._changeState}
                    />
                    <div className="afs-collapsing-menu__title-text">
                        {this.props.titleText}
                    </div>
                </div>
                <div className="afs-collapsing-menu__items">
                    {this._createMenuItems()}
                </div>
            </div>
        );
    }
    //
    private _createMenuItems(): JSX.Element[]
    {
        let items: JSX.Element[] = [];
        if (this.props.items)
        {
            items = this.state.items.map(
                (element, index) =>
                {
                    return(
                        <div className="afs-collapsing-menu-item" key={index}>
                            <img
                                src={element.iconURL}
                                alt="Иконка"
                                className="afs-collapsing-menu__item-icon"
                            />
                            <div className="afs-collapsing-menu__item-text">
                                {element.titleText}
                            </div>
                        </div>
                    );
                }
            );
        }
        return items;
    }
    private _changeState(): void
    {
        if (this.props.onStateChange)
        {
            this.props.onStateChange(!this.state.isCollapsed);
        }
        this.setState(
            (prevState: ICollapsingMenuState) =>
            {
                prevState.isCollapsed = !this.state.isCollapsed;
                return prevState;
            }
        );
    }
}

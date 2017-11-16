import './afs-dropdown.css';

import * as React from 'react';

interface IDropdownProps
{
    placeholder: string;
    selectedItemIndex?: number|null;
    items: IDropdownElement[];
    onSelect: (selectedItemKey: string) => void;
}
interface IDropdownState
{
    selectedItemIndex: number|null;
    isDropdownOpened: boolean;
}
export interface IDropdownElement
{
    value: string;
    key: string;
}
export class Dropdown extends React.Component<IDropdownProps , IDropdownState>
{
    constructor(props: IDropdownProps)
    {
        super(props);
        this.state = {
            selectedItemIndex: (props.selectedItemIndex in props.items) ? props.selectedItemIndex : null,
            isDropdownOpened: false,
        } as IDropdownState;
        this._setNewDropdownCondition = this._setNewDropdownCondition.bind(this);
    }
    //
    private get _selectedValue(): string
    {
        return this.state.selectedItemIndex !== null ? this.props.items[this.state.selectedItemIndex].value : this.props.placeholder;
    }
    private set _selectedItemIndex(newIndex: number)
    {
        this.setState(
            (prevState: IDropdownState) =>
            {
                prevState.selectedItemIndex = (newIndex in this.props.items) ? newIndex : null;
                return prevState;
            }
        );
    }
    private get _selectedItemIndex(): number|null
    {
        return this.state.selectedItemIndex;
    }
    //
    public render(): JSX.Element
    {
        return(
            <div className={`afs-dropdown ${this.state.isDropdownOpened ? 'afs-dropdown_opened' : 'afs-dropdown_closed'}`}>
                <div
                    className="afs-dropdown__header"
                    onClick={this._setNewDropdownCondition}
                >
                    <div className="afs-dropdown__item afs-dropdown__item_selected">
                        {this._selectedValue}
                    </div>
                    <div className="afs-dropdown__button">
                        <div className="afs-dropdown__button-content"/>
                    </div>
                </div>
                <div className="afs-dropdown__items">
                    {this._renderItemsList()}
                </div>
            </div>
        );
    }
    //
    private _renderItemsList(): JSX.Element[]
    {
        return this.props.items.map(
            (item: IDropdownElement, index: number) =>
            {
                if (index !== this._selectedItemIndex)
                {
                    return(
                    <div
                        className="afs-dropdown__item"
                        key={index}
                        onClick={this._itemSelected.bind(this, index, item.key)}
                    >
                        {this.props.items[index].value}
                    </div>
                    );
                }
            }
        );
    }
    private _setNewDropdownCondition(): void
    {
        this.setState(
            (prevState: IDropdownState) =>
            {
                prevState.isDropdownOpened = !prevState.isDropdownOpened;
                return prevState;
            }
        );
    }
    private _itemSelected(selectedIndex: number, key: string): void
    {
        this.props.onSelect(key);
        this._selectedItemIndex = selectedIndex;
        this._setNewDropdownCondition();
    }
}

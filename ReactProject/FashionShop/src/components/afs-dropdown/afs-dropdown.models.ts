export interface IDropdownProps
{
    placeholder?: string;
    selectedItemIndex?: number|null;
    items: IDropdownElement[];
    onSelect: (selectedItemKey: any) => void;
}
export interface IDropdownState
{
    selectedItemIndex: number|null;
    isDropdownOpened: boolean;
}
export interface IDropdownElement
{
    value: string;
    key: any;
}
export interface ICollapsingMenuProps
{
    titleIconURL?: string;
    titleText?: string;
    items?: ICollapsingMenuItem[];
    onStateChange?: (isCollapsed: boolean) => void;
    isCollapsed?: boolean;
}

export interface ICollapsingMenuState
{
    isCollapsed: boolean;
    items?: ICollapsingMenuItem[];
}

export interface ICollapsingMenuItem
{
   iconURL: string;
   titleText: string;
}
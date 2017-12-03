export interface IAdvancedSearchProps
{
    onChange: (formItems: IAdvancedSearchItems) => void;
}
export interface IAdvancedSearchState
{
    isFormOpened: boolean;
}
export interface IAdvancedSearchItems
{
    currency: string;
    price: number;
    retailer: string;
    brand: string;
}
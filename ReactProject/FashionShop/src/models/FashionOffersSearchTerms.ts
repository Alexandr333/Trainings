export class FashionOffersSearchTerms
{
    public currency: string;
    public brand: string;
    public retailer: string;
    public price: number|null;
    public title: string;
    constructor()
    {
        this.currency = '';
        this.brand = '';
        this.price = null;
        this.retailer = '';
        this.title = '';
        this.setTitle = this.setTitle.bind(this);
        this.setCurrency = this.setCurrency.bind(this);
        this.setPrice = this.setPrice.bind(this);
        this.setRetailer = this.setRetailer.bind(this);
        this.setBrand = this.setBrand.bind(this);
    }
    public setTitle(term: string): void
    {
        this.title = term;
    }
    public setCurrency(term: string): void
    {
        this.currency = term;
    }
    public setPrice(term: string|number): void
    {
        this.price = +term;
    }
    public setRetailer(term: string): void
    {
        this.retailer = term;
    }
    public setBrand(term: string): void
    {
        this.brand = term;
    }
    public copy(): FashionOffersSearchTerms
    {
        let copy = new FashionOffersSearchTerms;
        copy.brand = this.brand;
        copy.currency = this.currency;
        copy.price = this.price;
        copy.retailer = this.retailer;
        copy.title = this.title;
        return copy;
    }
}

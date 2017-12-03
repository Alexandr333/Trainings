import { CatalogsService } from './Catalogs.service';
import { LocalStorageService } from './LocalStorage.service';

export class FashionShopDataService
{
    public catalogsService: CatalogsService;
    public localStorageService: LocalStorageService;
    constructor()
    {
        this.catalogsService = new CatalogsService();
        this.localStorageService = new LocalStorageService();
    }
}

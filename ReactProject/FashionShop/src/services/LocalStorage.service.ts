export class LocalStorageService
{
    public get isSupported(): boolean
    {
        try
        {
            let itemBackup = localStorage.getItem('');
            localStorage.removeItem('');
            localStorage.setItem('', itemBackup);
            if (itemBackup === null)
            {
                localStorage.removeItem('');
            } else
            {
                localStorage.setItem('', itemBackup);
            }
            return true;
        }
        catch (exc)
        {
            return false;
        }
    }
    public hasItem(key: string): boolean
    {
        return localStorage.getItem(key) !== null;
    }
    public setItem(key: string, data: string): void
    {
        localStorage.setItem(key, data);
    }
    public removeItem(key: string): void
    {
        localStorage.removeItem(key);
    }
    public getItem(key: string): string
    {
        return localStorage.getItem(key);
    }
    public clear(): void
    {
        localStorage.clear();
    }
}

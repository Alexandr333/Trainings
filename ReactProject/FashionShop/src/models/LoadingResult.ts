import { LoadingStatus } from './index';

export class LoadingResult<T>
{
    public status: LoadingStatus;
    public data: T;
    constructor(data: T, status: LoadingStatus)
    {
        this.status = status;
        this.data = data;
    }
}

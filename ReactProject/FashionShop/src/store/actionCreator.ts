import { IAction } from './types';

export function actionCreator<T>(type: string): (payload: T) => IAction<T>
{
    return function (payload: T): IAction<T>
    {
        return {
            type,
            payload
        };
    };
}

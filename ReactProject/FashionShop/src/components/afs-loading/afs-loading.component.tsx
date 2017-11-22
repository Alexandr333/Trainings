import './afs-loading.css';

import * as React from 'react';

interface ILoadingProps
{

}
interface ILoadingState
{
    dotsNum: number;
}

export class Loading extends React.Component<ILoadingProps, ILoadingState>
{
    private _timer: any;
    constructor(props: any)
    {
        super(props);
        this.state = {
            dotsNum: 0
        } as ILoadingState;
        this._createDots = this._createDots.bind(this);
        this._timer = setInterval(
            () =>
            {
                this._addDot();
            },
            500
        );
    }
    public render(): JSX.Element
    {
        return(
            <div className="afs-loading">
                <div className="afs-loading__title">
                    Loading please wait
                    <span className="afs-loading__dots">
                        {this._createDots()}
                    </span>
                </div>

            </div>
        );
    }
    public componentWillUnmount(): void
    {
        clearInterval(this._timer);
    }
    private _addDot(): void
    {
        this.setState(
            (prevState: ILoadingState) =>
            {
                if (prevState.dotsNum > 3)
                {
                    prevState.dotsNum = 0;
                }
                prevState.dotsNum++;
                return prevState;
            }
        );
    }
    private _createDots(): string
    {
        let str: string = '';
        for (let i = 1 ; i < this.state.dotsNum ; i++)
        {
            str += '.';
        }
        return str;
    }
}

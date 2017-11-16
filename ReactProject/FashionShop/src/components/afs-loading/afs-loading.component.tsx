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
    constructor(props: any)
    {
        super(props);
        this.state = {
            dotsNum: 0
        } as ILoadingState;
        this._createDots = this._createDots.bind(this);
        setInterval(
            () =>
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
                )
            },
            1000
        )
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

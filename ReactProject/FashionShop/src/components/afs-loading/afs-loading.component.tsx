import './afs-loading.css';

import * as React from 'react';

import { ILoadingProps, ILoadingState } from './afs-loading.models';



export class Loading extends React.Component<ILoadingProps, ILoadingState>
{
    constructor(props: ILoadingProps)
    {
        super(props);
    }
    public render(): JSX.Element
    {
        return(
            <div className="afs-loading">
                <div className="afs-loading-title">Loading</div>
                <div className="sk-fading-circle">
                    <div className="sk-circle1 sk-circle"/>
                    <div className="sk-circle2 sk-circle"/>
                    <div className="sk-circle3 sk-circle"/>
                    <div className="sk-circle4 sk-circle"/>
                    <div className="sk-circle5 sk-circle"/>
                    <div className="sk-circle6 sk-circle"/>
                    <div className="sk-circle7 sk-circle"/>
                    <div className="sk-circle8 sk-circle"/>
                    <div className="sk-circle9 sk-circle"/>
                    <div className="sk-circle10 sk-circle"/>
                    <div className="sk-circle11 sk-circle"/>
                    <div className="sk-circle12 sk-circle"/>
                </div>
            </div>
        );
    }
}

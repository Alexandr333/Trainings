import './hello.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface HelloAttributes
{

}

export class HelloComponent extends React.Component<HelloAttributes, {}>
{
    constructor(helloAttributes:HelloAttributes)
    {
        super(helloAttributes);
    }
    render():JSX.Element
    {
        return (
            <div className="hello">
                <div className="hello__container">
                    <div className="hello__greeting">Hello</div>
                    <div className="hello__text">This is my first react application</div>
                </div>
            </div>
        );
    }
}
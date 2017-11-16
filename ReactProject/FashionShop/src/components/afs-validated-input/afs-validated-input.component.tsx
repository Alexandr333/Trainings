import './afs-validated-input.css';

import * as React from 'react';

interface IValidatedInputProps
{
    placeholder: string;
    onChange: (newValue: string) => void;
    validateFunc: (value: string) => IValidationResult;
}
interface IValidatedInputState
{
    valid: boolean|null;
    validationMessage: string;
}
export interface IValidationResult
{
    valid: boolean|null;
    validationMessage: string;
}

export class ValidatedInput extends React.Component<IValidatedInputProps, IValidatedInputState>
{
    get validationClasses(): string
    {
        let classes: string = '';
        if (this.state.valid !== null)
        {
            classes += this.state.valid ? 'afs-validated-input_valid' : 'afs-validated-input_invalid';
        }
        return classes;
    }
    constructor(props: IValidatedInputProps)
    {
        super(props);
        this.state = {
            valid: null,
            validationMessage: ''
        } as IValidatedInputState;
        this._onChange = this._onChange.bind(this);
    }
    public render(): JSX.Element
    {
        return(
            <div className={`afs-validated-input ${this.validationClasses}`}>
                <input
                    className="afs-validated-input__input"
                    placeholder={this.props.placeholder}
                    type="text"
                    onChange={this._onChange}
                />
                <div className="afs-validated-input__message" hidden={this.state.validationMessage ? false : true}>
                    {this.state.validationMessage}
                </div>
            </div>
        );
    }
    private _onChange(event: React.ChangeEvent<HTMLInputElement>): void
    {
        let newValue = event.target.value;
        let validationResult = this.props.validateFunc(newValue);
        if (validationResult.valid)
        {
            this.props.onChange(newValue);
        }
        this.setState(
            (prevState: IValidatedInputState) =>
            {
                prevState.valid = validationResult.valid;
                prevState.validationMessage = validationResult.validationMessage;
                return prevState;
            }
        );
    }
}

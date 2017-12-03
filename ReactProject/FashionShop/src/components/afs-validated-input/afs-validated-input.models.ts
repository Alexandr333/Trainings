export interface IValidatedInputProps
{
    placeholder: string;
    onChange: (newValue: string) => void;
    validateFunc: (value: string) => IValidationResult;
}
export interface IValidatedInputState
{
    valid: boolean|null;
    validationMessage: string;
}
export interface IValidationResult
{
    valid: boolean|null;
    validationMessage: string;
}
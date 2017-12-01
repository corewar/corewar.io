import { IOptions } from "./IOptions";

export interface IOptionValidator {

    validate(state: IOptions): void;
}
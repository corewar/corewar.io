
export enum Standard {
    ICWS86,
    ICWS88,
    ICWS94draft
}

export interface IParseOptions {

    standard?: Standard;
    coresize?: number;
}

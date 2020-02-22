export enum Standard {
    ICWS86 = 'ICWS86',
    ICWS88 = 'ICWS88',
    ICWS94draft = 'ICWS94draft'
}

export interface IParseOptions {
    standard?: Standard
    coresize?: number
}

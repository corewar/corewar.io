import { IHill } from '@matches/interface/IHill';
import { IHillResult } from '@matches/interface/IHillResult';

export interface IHillRunner {

    run(hill: IHill): IHillResult;
}
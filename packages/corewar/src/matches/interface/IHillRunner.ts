import { IHillResult } from '@matches/interface/IHillResult';
import { IRules } from './IRules';
import IWarrior from '@simulator/interface/IWarrior';

export interface IHillRunner {

    run(rules: IRules, warriors: IWarrior[]): IHillResult;
}
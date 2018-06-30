import { IWarrior } from "../../simulator/interface/IWarrior";

export interface IWarriorResult {

    warrior: IWarrior;
    won: number;
    drawn: number;
    lost: number;
}
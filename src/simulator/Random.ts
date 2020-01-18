import { IRandom } from "@simulator/interface/IRandom";

export class Random implements IRandom {

    public get(max: number): number {

        return Math.floor(Math.random() * max);
    }
}
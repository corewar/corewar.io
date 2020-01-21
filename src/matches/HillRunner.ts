import { IHillRunner } from "@matches/interface/IHillRunner";
import { IHill } from "@matches/interface/IHill";
import { IHillResult } from "@matches/interface/IHillResult";

export class HillRunner implements IHillRunner{

    run(hill: IHill): IHillResult {
        throw new Error("Method not implemented.");
    }
}
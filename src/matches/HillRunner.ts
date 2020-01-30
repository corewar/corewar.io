import { IHillRunner } from "@matches/interface/IHillRunner";
import { IHill } from "@matches/interface/IHill";
import { IHillResult } from "@matches/interface/IHillResult";
import { IHillResultMapper } from "@matches/interface/IHillResultMapper";
import { IPublisher } from "@simulator/interface/IPublisher";
import { MessageType } from "@simulator/interface/IMessage";
import { IHillMatchRunner } from "@matches/interface/IHillMatchRunner";

export class HillRunner implements IHillRunner {

    private hillMatchRunner: IHillMatchRunner;
    private hillResultMapper: IHillResultMapper;
    private publisher: IPublisher;

    constructor(
        publisher: IPublisher,
        hillMatchRunner: IHillMatchRunner,
        hillResultMapper: IHillResultMapper) {

        this.publisher = publisher;
        this.hillMatchRunner = hillMatchRunner;
        this.hillResultMapper = hillResultMapper;
    }

    private publishEnd(result: IHillResult): void {

        this.publisher.queue({
            type: MessageType.HillEnd,
            payload: result
        });
        this.publisher.publish();
    }

    public run(hill: IHill): IHillResult {

        const matchResults = [];

        for (const warriorA of hill.warriors) {
            for (const warriorB of hill.warriors) {
                if (warriorA === warriorB) {
                    continue;
                }

                matchResults.push(
                    this.hillMatchRunner.run(hill.rules, warriorA, warriorB)
                );
            }
        }

        const result = this.hillResultMapper.map(hill, matchResults);

        this.publishEnd(result);

        return result;
    }
}
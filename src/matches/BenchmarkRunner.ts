import { IHill } from "@matches/interface/IHill";
import { IHillResult } from "@matches/interface/IHillResult";
import { IHillResultMapper } from "@matches/interface/IHillResultMapper";
import { IPublisher } from "@simulator/interface/IPublisher";
import { MessageType } from "@simulator/interface/IMessage";
import { IHillMatchRunner } from "@matches/interface/IHillMatchRunner";
import { IHillWarrior } from "@matches/interface/IHillWarrior";
import { IBenchmarkRunner } from "@matches/interface/IBenchmarkRunner";

export class BenchmarkRunner implements IBenchmarkRunner {

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

    public run(warrior: IHillWarrior, benchmark: IHill): IHillResult {

        const matchResults = [];

        for (const warriorB of benchmark.warriors) {
            matchResults.push(
                this.hillMatchRunner.run(benchmark.rules, warrior, warriorB)
            );
        }

        const hillResult = this.hillResultMapper.map(benchmark, matchResults);

        const result = {
            warriors: hillResult.warriors.filter(x => x.source === warrior.source)
        }

        this.publishEnd(result);

        return result;
    }
}
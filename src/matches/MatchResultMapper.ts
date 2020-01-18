import { IMatchResultMapper } from "@matches/interface/IMatchResultMapper";
import { IMatchResult } from "@matches/interface/IMatchResult";
import { IMatch } from "@matches/interface/IMatch";
import { IMatchWarriorResult } from "@matches/interface/IMatchWarriorResult";

export class MatchResultMapper implements IMatchResultMapper {

    private getWarriorResult(warrior, match): IMatchWarriorResult {

        const rounds = match.rules.rounds;

        const won = warrior.wins;
        const lost: number = match.warriors
            .filter(w => warrior.warriorMatchId != w.warriorMatchId)
            .map(w => w.wins)
            .reduce((t, w) => t + w, 0);
        const drawn = rounds - won - lost;

        const winpoints = won / rounds * 100 * 3;
        const drawpoints = drawn / rounds * 100 * 1;
        const losepoints = lost / rounds * 100 * 3;

        return {
            source: warrior.source,
            won,
            drawn,
            lost,
            given: losepoints + drawpoints,
            taken: winpoints + drawpoints
        };
    }

    public map(match: IMatch): IMatchResult {

        return {
            rounds: match.rules.rounds,
            warriors: match.warriors.map(w => this.getWarriorResult(w, match))
        };
    }
}
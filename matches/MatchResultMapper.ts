import { IMatchResultMapper } from "./interface/IMatchResultMapper";
import { IMatchResult } from "./interface/IMatchResult";
import { IMatch } from "./interface/IMatch";
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from "constants";
import { IMatchWarriorResult } from "./interface/IMatchWarriorResult";

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
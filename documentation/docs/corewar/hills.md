# Hills

**Corewar.io does not yet support hills but this functionality will be coming soon!**

Hills are eternally running leagues which allow your warriors to compete against other warriors in order to measure its performance.  A hill is composed of a current list of warriors, ranked by their past performance.  When a new warrior is submitted to the hill, a new season of the hill is triggered in which each warrior competes against all other warriors on the hill in a round robin style tournament.

Each match-up between a pair of warriors is competed over a number of rounds.  Once a matchup is complete, the warriors are given a score based on the percentage of rounds they won, drew and lost as follows:

```
Score = Win% * 3 + Draw%
```

Once all matches are complete, the warriors are ranked from best to worst.  The worst performing warrior is eliminated and 'pushed off' the hill.  All surviving warriors have their age increased by one.  Therefore the age of a warrior tells you how long that warrior has survived on the hill.

Each hill has a specific set of settings, against which all warriors are parsed and all matches are run.  For example the hill might be a 'nano' hill in which the core size is limited to 80 addresses.  See [match settings](./match_settings) for details on available options.

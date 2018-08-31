#Loader

At the beginning of a round, the parsed output of each [warrior](warriors) is loaded into the [core](core).  Warriors are loaded into core at randomly selected addresses but are gauranteed no to be loaded closer than the [Minimum Separation](match_settings#minimum-separation) specified in the [Match Settings](match_settings).

Because warriors are loaded to a random address, successive rounds with the same warriors can have drastically different results.  For this reason, matches between warrios are usually conducted over a number of rounds large enough to give a fair representation of each warrior's performance, removing the effect of 'lucky' wins.

When a warrior is loaded into Core, each of its parsed output instructions are placed sequentially and the warrior is allocated a single, initial [process](processes) set to execute the warrior's first instruction which is defined by the [ORG](../redcode/org) or [END](../redcode/org) directive.  If no directive is specified, the first instruction in the warriors parsed output will be executed.

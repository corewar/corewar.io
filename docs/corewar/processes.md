#Processes

Each [Warrior](./warriors) has one or more `Processes`. When the warrior is first [loaded](./loader) into [Core](./core) it is given a single process, however a warrior can gain more processes by executing the [spl](../redcode/opcodes#spl-split) instruction.

During a game of Corewar each Warrior takes it in turns to execute a single process. In the first cycle of the round, the first warrior executes an instruction. In the next cycle, the next warrior executes an instruction. Once each warrior has taken a turn, the first warrior goes again.

If no warrior executes a `spl` instruction then this is all there is to it and execution continues in this fashion with each warrior taking a turn over successive cycles until the round ends.

When a `spl` instruction is executed, the executing warrior gains a new process. Now when the warrior takes a turn it will execute one process and when it next gets a turn it will execute the other process.

For example, if there are two warriors in a match, 'imp' and 'paper'. 'Imp' has a single process (A). 'Paper' has two processes (A and B). In this situation the turn order will be as follows:

```
Imp (A)
Paper (A)
Imp (A)
Paper (B)
Imp (A)
Paper (A)
etc..
```

Notice that although Paper has twice as many processes as Imp, it does not get any more turns. As a result, each of Paper's processes effectively execute at half the speed of Imp's single process.

Of course a big advantage of having multiple processes is resiliency, it will be harder to kill a warrior with many processes than a more fragile warrior with only a single process. The downside of multiple processes is the added complexity of multi-threaded programming.

For more details on the `spl` instruction see [spl](../redcode/opcodes#spl-split).

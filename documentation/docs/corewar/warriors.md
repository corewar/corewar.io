#Warriors

Players compete in the game of Corewar by writing Warriors.  A warrior is a program written in an assembly like programming language called [redcode](../redcode).  Below is an example of a simple Corewar Warrior named 'Dwarf'.

```redcode
add #4, 3
mov 2, @2
jmp -2
dat #0, #0
```

A `warrior` is made up of a number of `instructions`, each written on a new line.  The above example contains four instructions.  Therefore when this warrior is loaded into the Core, it will occupy four consecutive memory addresses.

Warriors own one or more [processes](processes) which execute the warrior's instructions sequentially.  If a process executes an illegal instruction (usually a [dat](../redcode/opcodes#dat-data), the process is terminated.  If all of a warrior's processes are terminated, the warrior is eliminated from the round.

The objective of corewar is to write a warrior which will still be running (have active processes) after all other warriors have been terminated.

See the [Redcode Reference](../redcode) for further details on the redcode language.

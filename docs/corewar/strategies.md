# Strategies

A number of strategies for Corewar have developed over the years.  The principal three strategies follow the rock, paper, scissors paradigm.

* **Rock** - a warrior which rapidly bombs the core with `dat` instructions
* **Paper** - a warrior which replicates, creating multiple, parallel copies
* **Scissors** - a warrior which scans the core looking for other warriors

There are endless variations on the above core strategies including some quite distinct sub-strategies.  In addition, many warriors incorporate several strategies to form a hybrid strategy.

## Rock

Rock or bombers are warriors which rapidly copy bombs (usually `dat` instructions) across core hoping to land a bomb on another warrior, usually with the hope of killing it outright.

The original rock is Dwarf was written by A. K. Dewdney (the creator of Corewar).

```redcode
;name dwarf
start   add.ab  #4, bmb
        mov.i   bmb, @bmb
        jmp     start
bmb     dat     #0, #0
```

This warrior copies the `dat` instruction to the address pointed to by the `dat` instruction's B field.  Each iteration of the loop it adds four to the pointer, eventually bombing every fourth instruction in the core.

The development of the 94 standard brought the ubiquitous stone, a more powerful bomber making use of 94 standard [modifiers](../redcode/modifiers).

```redcode
;name stone
start mov.i <2, 3
      add.f d1, start
      jmp   start
      dat   #0
d1    dat   #-4, #4
end start
```

This bomber not only copies a bomb each iteration of its loop, it also decrements the B field of instructions within the core which may damage other warriors even if it doesn't kill them outright, stunning them until stone can deliver the killing blow.

Rock tends to do well against scissors (scanners) because bombers tend to be simple (and therefore small) programs which clutter the core with bombs, each one forming a decoy confusing the scanner.  Scissors tend to be long and complex programs making a big target for rock's bombs.

# Paper

Paper are warriors which replicate, making numerous copies of themselves through-out core - each copy with its own set of processes.  This makes paper warriors very resilient to damage.

The following is an early, looping paper. It creates copies of itself in the core by looping over its program code, copy to a destination address.  Each time a copy is completed, the `spl` instruction is used to create a new process for the new clone and the destination address is increased.

```redcode
;name mice
mov.ab  #12, -1
mov.i   @-2, <5
djn     -1, -3
spl     @3, 0
add.ab  #653, 2
jmz     -5, -6
dat     #0, #833
```

Below is a more advanced paper which uses multiple processes to copy itself in one pass through the code without the need to loop over program code. The boot code creates 6 processes which all execute the `mov` instruction causing six instructions to be copied. The advantage of this approach is the copy executes much faster.

```redcode
;name silk
      spl     1
      mov     -1,       0
      spl     1

paper spl     @paper,   2364
      mov.i   }paper,   >paper
      mov.i   bmb,      >paper
      mov.i   bmb,      {-61
      mov.i   bmb,      {4000
silk  jmp     @0,       {paper
bmb   dat.f   <2667,    <2*2667
```

Paper tends to do well vs stone because the loss of some of the copies of the paper does not prevent the other copies from running and actually makes them run faster (because the fewer processes a warrior has, the more frequently each process executes see [processes](./processes)). Eventually the paper will bomb or overwrite the stone, wiping it out.

Paper tends to do poorly against scissors which tend to use `spl` bombs which cause the paper to spawn numerous useless processes, causing the remaining, working copies to run slower and slower.

##Scissors

Scissors are warriors which scan the core looking for other warriors to attack. When a target is located, the scissors heavily bombs the detected area, usually with `spl` instructions causing opposing warriors to spawn new processes uncontrollably. The result is that the affected warrior spends most of its execution time running useless `spl` instructions.

```redcode
scn add   #10, ptr
ptr jmz.f scn, 5
    mov.i 2, >ptr
    jmp   -1
```

The above example is a simple scanner which scans the core using the [jmz](../redcode/opcodes#jmz-jump-if-zero) instruction to detect instructions where either the a or b field are non zero. The address which is scanned is increased with each iteration of the loop causing every tenth instruction in the core to be scanned. When a non zero field is detected, the executing process falls through to the `mov` instruction which copies a `dat` instruction over the scanned address, followed by every address from the scanned instruction up to the scanner itself.

This is a very simple example of a (not very good) scanner. It can be improved by wiping the core with one or more `spl` instructions followed by a `dat` in order to first stun and then kill papers. The scan loop can also be made more efficient so that it scans more addresses each iteration.

Scissors tend to do well against papers as they quickly locate and 'stun' them using `spl` bombs, finally wiping the core with a `dat` clear. Scissors struggle against rock strategies which fill the core with bombs which provide false positives to the scanner.

# Strategies

A number of strategies for Corewar have developed over the years.  The principal three strategies follow the rock, paper, scissors paradigm.

**Rock** - a warrior which rapidly bombs the core with `dat` instructions
**Paper** - a warrior which replicates, creating multiple, parallel copies
**Scissors** - a warrior which scans the core looking for other warriors

There are endless variations on the above core strategies including some quite distinct sub-strategies.  In addition, many warriors incorporate several strategies to form a hybrid strategy.

## Rock

Rock or bombers are warriors which rapidly copy bombs (usually `dat` instructions) across core hoping to land a bomb on another warrior, usually with the hope of killing it outright.

The original rock is Dwarf was written by A. K. Dewdney (the creator of Corewar).

```redcode
start   add.ab  #4, bmb
        mov.i   bmb, @bmb
        jmp     start
bmb     dat     #0, #0
```

This warrior copies the `dat` instruction to the address pointed to by the `dat` instruction's B field.  Each iteration of the loop it adds four to the pointer, eventually bombing every fourth instruction in the core.

The development of the 94 standard brought the ubiquitous stone, a more powerful bomber making use of 94 standard [modifiers](../redcode/modifiers).

```redcode
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

The following is .

```redcode
mov.ab  #12, -1
mov.i   @-2, <5
djn     -1, -3
spl     @3, 0
add.ab  #653, 2
jmz     -5, -6
dat     #0, #833
```


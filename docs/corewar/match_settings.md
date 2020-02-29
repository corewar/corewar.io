# Match Settings

The following settings can be specified for a given match allowing for a great variety in the types of Corewar matches that can be run.

## Core Size

The number of instructions which can be stored within the [Core](core).  This number is also the maximum number which can be represented within the simulation.  See [Addresses](core#addresses) for details.

## Maximum Cycles

The number of Cycles to execute before the Round ends in a draw.

## Maximum Processes

The maximum number of [Processes](processes) that each Warrior can have at one time.  Attempting to generate further processes using the [spl](../redcode/opcodes#spl_split) will have no effect - effectively acting as a [nop](../redcode/opcodes#nop_no_operation).

## Maximum Warrior Length

The maximum number of instructions which each Warrior can be composed of.  Writing a warrior longer than this limit will result in a [Parser](../redcode/parser) error.

## Minimum Separation

The [Loader](loader) will not place Warriors closer than this number of addresses at the start of a Round.

## Standard

Which redcode [standard](../redcode/#standards) should be used when parsing warriors. Using instructions which are outside of the selected standard will result in a parser error.

## Read limit

**Note this feature is not currently implemented within the corewar.io simulator**

Instructions beyond this distance from the currently executing instruction cannot be read.  If a read address exceeds the read limit (relative to the currently executing instruction) the address is wrapped around to restrict it to the read limit.  In effect this limit restricts read operations to a 'mini-core' within the core.

See [core](core) for details on how mod maths are used when resolving addresses.

## Write limit

**Note this feature is not currently implemented within the corewar.io simulator**

Instructions beyond this distance from the currenlty executing instruction cannot be written to.  If a write address exceeds the write limit (relative to the currently executing instruction) the address is wrapped around to restrict it to the write limit.  In effect this limit restricts write operations to a 'mini-core' within the core.

See [core](core) for details on how mod maths are used when resolving addresses.

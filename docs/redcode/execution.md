#Execution

Each cycle, a Corewar instruction is executed following a fetch, decode, execute scheme.

[Fetch](#fetch) > [Decode](#decode) > [Execute](#execute)

During execution the `simulator` makes use of a number of registers to temporaily store data. Misunderstanding this process can lead to a number of gotchas where instructions do not behave as you might naively expect.

The following notional registers are used:

|Register|Purpose|
|---|---|
|Instruction Register|The executing instruction|
|Source Register|The source instruction|
|Destination Register|The destination instruction|

**Copies** of instructions are written to these registers. Therefore changes made to the original instructions in the [Core](core) after they are copied to a register, do not affect the data in the registers themselves.

#Fetch

The first step in execution is fetch. During this step the `simulator` determines the instruction to be executed by populating the `Instruction Register`.

First, the current [warrior](warriors) is determined (see [warriors](warriors) for details).

Next the current [process](warriors#processes) is determined for the current warrior (see [processes](processes) for details).

The `instruction pointer` for the current process is determined.

The `instruction` in core at the address pointed to by the `instruction pointer` is retrieved and stored in the `Instruction Register`.

## Decode

The second step in execution is decode. During this step the `simulator` determines the `source` and `destination` instructions for the executing instruction (fetched in the previous step).

First the `A` [operand](operands) of the executing instruction is evaluated. The evaluation of this operand is controlled by the operand's [addressing mode](addressing_modes).

Evaluation produces an address within the [Core](core). The instruction at this address is retrieved and stored in the `Source Register`.

Next the `B` operand of the executing instruction is evaluated, again using the operand's addressing mode.

The evaluated address from the `B` operand is used to retrieve and store an instruction in the `Destination Register`.

## Execute

The final step in execution is execute.

First the current [process's](warriors#processes) `instruction pointer` is incremented (so that the process will execute the next instruction in core when it is next executed).

Next the `Instruction Register` instruction's [opcode](opcodes) and [modifier](modifiers) are used to determine the operation to perform.

The operation is performed using the instructions in the `Source Register` and `Destination Register` as the `source` and `destination` respectively for the executing instruction.

Note that some opcodes (such as [jmp](opcodes#jmp-jump)) will modify the current process's `instruction pointer`, overwritting the current value.

Finally, the current warrior's active process is moved to the next process in the warrior's process list and the game's active warrior is moved to the next warrior in the game's list of active warriors.

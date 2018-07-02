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

**Copies** of instructions are written to these registers. Therefore changes made to the original instructions in the [Core](core) after they are copied to a register, do not affect the data in the registers themselves.  This can be best explained with an [example](#example).

#Fetch

The first step in execution is fetch. During this step the `simulator` determines the instruction to be executed by populating the `Instruction Register`.

First, the current [warrior](../corewar/warriors) is determined (see [warriors](../corewar/warriors) for details).

Next the current [process](../corewar/warriors#processes) is determined for the current warrior (see [processes](processes) for details).

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

First the current [process's](../corewar/warriors#processes) `instruction pointer` is incremented (so that the process will execute the next instruction in core when it is next executed).

Next the `Instruction Register` instruction's [opcode](opcodes) and [modifier](modifiers) are used to determine the operation to perform.

The operation is performed using the instructions in the `Source Register` and `Destination Register` as the `source` and `destination` respectively for the executing instruction.

Note that some opcodes (such as [jmp](opcodes#jmp-jump)) will modify the current process's `instruction pointer`, overwritting the current value.

Finally, the current warrior's active process is moved to the next process in the warrior's process list and the game's active warrior is moved to the next warrior in the game's list of active warriors.

## Example

Understanding how instructions are evaluated and executed is vitally important to writing correctly functioning warriors, unfortunately it is also something which can be very difficult for beginners to understand. Here is an example to aid understanding.

### The executing instruction is modified during evaluation of addressing modes

Consider the following redcode:

```redcode
0000: mov.i >0, $0
0001: dat.f $0, $0
```

The instructions have been prefixed with a number indicating their absolute address in the [Core](core).

When imaging how this first instruction will execute, your reasoning might be:

*The [B Post-Increment Indirect](addressing_modes#b-post-increment-indirect) (`>`) addressing mode will increase the `B` number of the instruction from 0 to 1 and then the instruction at address 0 will be copied to address 1.*

Naively, you might therefore expect the core to look like this after the first instruction is executed:

```redcode
0000: mov.i >0, $1
0001: mov.i >0, $1
```

However, this is **incorrect**.

During the [fetch](#fetch) stage, the instruction `mov.i >0, $0` will be copied to the `Instruction Register`.

|Instruction Register|Source Register|Destination Register|
|---|---|---|
|`0000: mov.i >0, $0`| | |

Next, during the [decode](#decode) stage, the `A` operand will be evaluated. The addressing mode (`>`) means that the instruction pointed to by the B number will be used as the address of the `source instruction`. The `B` number is `0`, therefore, the current instruction is copied to the `Source Register`.

|Instruction Register|Source Register|Destination Register|
|---|---|---|
|`0000: mov.i >0, $0`|`0001: mov.i >0, $0`| |

Following this the post-increment is applied to the `B` operand so the instruction in core looks like this:

```redcode
0000: mov.i >0, $1
0001: dat.f $0, $0
```

However, the instruction in the `Source Register` is still `mov.i >0, $0`.

Next the `B` operand will be evaluated using the direct (`$`) addressing mode. The `B` number is `1`, which references the second instruction (`dat.f $0, $0`). Therefore the `dat` instruction is copied to the `Destination Register`.

|Instruction Register|Source Register|Destination Register|
|---|---|---|
|`0000: mov.i >0, $0`|`0000: mov.i >0, $0`|`0001: dat.f $0, $0`|

Now the instruction in the `Instruction Register` is executed. It copies the instruction in the `Source Register` to the address stored in the `Destination Register`.

The resulting core looks like this:

```redcode
0000: mov.i >0, $1
0001: mov.i >0, $0
```

So in fact, this instruction will continue to execute safetly, in a similar fashion to the classic `imp`.

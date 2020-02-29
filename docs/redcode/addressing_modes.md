#Addressing Modes

Each [operand](operands) in a Corewar instruction has an addressing mode. The addressing mode controls how the `Source` and `Destination` instructions are determined.

When an instruction is executed, the addressing modes for the `A` and `B` operands of the instruction are evaluated to determine the source and destination instruction for the current [opcode](opcodes). Additionally, some addressing modes modify the operand number by incrementing or decrementing it during this evaluation.

See the [Execution](../corewar/execution) page for details of how addressing modes fit into Corewar's execution cycle.

The following addressing modes can be used in Corewar

* [#](#immediate) - Immediate
* [$](#direct) - Direct
* [*](#a-indirect) - A Indirect
* [@](#b-indirect) - B Indirect
* [{](#a-pre-decrement-indirect) - A Pre-decrement Indirect
* [}](#a-post-increment-indirect) - A Post-increment Indirect
* [<](#b-pre-decrement-indirect) - B Pre-decrement Indirect
* [>](#b-post-increment-indirect) - B Post-increment Indirect

##Immediate

Operands with the immediate (`#`) addressing mode are always evaluated as an address of 0. This allows data to be stored in the operand without affecting the address the operand references.

For example, the follow example works just like the classic `imp` despite having a non-zero `A` operand. This can also make the imp more resilient as it will continue to function perfectly even if the `A` number is modified.

```redcode
mov.i #123, $1
```

##Direct

The direct (`$`) addressing mode provides a relative address from the executing instruction to another instruction in the core.

This is used in the classic `imp`.

```redcode
mov.i $0, $1
```

The `A` operand has a direct address of 0 and the `B` operand has a direct address of 1. This corresponds to the current and next instructions respectively.

The direct addressing mode is the default addressing mode.

##A Indirect

The A Indirect (`*`) addressing mode uses the executing instruction's operand as a pointer to an intermediate instruction. This second instruction's `A` field is then used as a direct reference to the instruction of interest.

Note the intermediate instruction's address is resolved relative to this intermediate instruction, not the executing instruction.

Let's look at an example.

```redcode
mov.i *1, $2
dat    2, 0  ; <- 2 is used as a pointer
dat    0, 0  ; <- this instruction will be overwritten
jmp    0     ; <- with this instruction
```

The `mov` instruction is about to be executed. The `B` opeand is using the [Direct](#direct) addressing mode and is refering to the third instruction (`dat 0, 0`).

The `A` operand is using the A Indirect addressing mode. The `A` number is `1`, which indicates that the `A` operand of the second instruction (`dat 2, 0`) should be used as a pointer to the `source` instruction.

The `A` number of the second instruction is `2`, therefore the `source` instruction is found by moving 2 addresses forward from the second instruction. This means that the fourth instruction (`jmp 0`) will be used as the `source` for this move instruction. 

##B Indirect

The B Indirect (`@`) addressing mode works in the same way as the [A Indirect](#a-indirect) (`*`) addressing mode described above except that it uses the intermediate instruction's `B` field as a pointer rather than its `A` field.

The `@` addressing mode is used by the classic warrior `dwarf` to set the location where its bombs will fall:

```redcode
add #4,  3
mov  2, @2
jmp -2
dat #0, #0
```
The `dat` instruction is used both as a bomb and also as a pointer to the target address. The dwarf warrior runs in an infinite loop. Each iteration of the loop, it adds `4` (the step size) to the `dat` instructions `B` number.

After this it executes `mov 2, @2` to copy the `dat` bomb to the address pointed to by the `dat` bomb's `B` number.

##A Pre-decrement Indirect

The A Pre-decrement Indirect (`{`) addressing mode works in the same way as the [A Indirect](`*`) addressing mode detailed above with the addition that it **first** decrements the `A` number **before** using it as a pointer.

```redcode
mov.i {1, $1
dat   $0, $0
```

The above example will first decrement the `A` number of the `dat` instruction before using the `dat` instruction's `A` number as a pointer.

```redcode
mov.i  {1, $1
dat   $-1, $0
```

After decrementing, the `A` number of the `dat` instruction will be `-1` and therefore refer to the `mov` instruction, which will be used as the `source` instruction.

##A Post-increment Indirect

The A Post-increment Indirect (`}`) addressing mode works in the same way as the [A Indirect](`*`) addressing mode detailed above with the addition that it increments the `A` number **after** using it as a pointer.

```redcode
mov.i }1, $1
dat   $0, $0
```

The above example will first use the `A` number of the `dat` instruction as a pointer. As the `dat` instruction's `A` number is `0`, the `dat` instruction is pointing to itself and so the `dat` instruction will be used as the `source` instruction for the move operation.

After this has happened, the `dat` instruction's `A` number will be incremented to `1`.

```redcode
mov.i  }1, $1
dat   $1, $0
```

Finally the move operation will be applied using the **copy** of the `dat` instruction from the `Source Register`:

```redcode
mov.i }1, $1
dat   $0, $0
```

Note, perhaps counter-intuitively, the final resulting core looks exactly the same as the starting core. The change made by the post-increment was overwritten by the move operation. See [execution](../corewar/execution) for more details about the execution order within Corewar.

##B Pre-decrement Indirect

The B Pre-decrement Indirect (`<`) addressing mode works in the same way as the [A Pre-decrement Indirect](#a-pre-decrement-indirect) addressing mode detailed above except it decrements and uses the intermediate instruction's `B` number as a pointer, rather than its `A` number.

##B Post-increment Indirect

The B Post-increment Indirect (`>`) addressing mode works in the same way as the [A Post-increment Indirect](#a-post-increment-indirect) addressing mode detailed above except it increments and uses the intermediate instruction's `B` number as a pointer, rather than its `A` number.

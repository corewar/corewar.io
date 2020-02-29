#Operands

Each redcode instruction contains two operands. An operand is composed of an [addressing mode](addressing_modes) and a number. The first operand is known as the `A` operand and the second as the `B` operand.

```redcode
mov.i $1, #2
```
In the above example, the A operand is `$1` and the B operand is `#2`.

The A addressing mode is `$` (direct) and the A number is `1`.
The B addressing mode is `#` (immediate) and the B number is `2`.

If no addressing mode is specified for an operand, the [Parser](parser) inserts a default addressing mode of `$` (direct).

Some [opcodes](opcodes) only require a single operand in order to be successfully parsed. When this is the case, the parser inserts `$0` as the second operand. In these situations the opcode determines whether the `A` or `B` operand is inserted.
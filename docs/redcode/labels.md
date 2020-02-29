# Labels

Writing literal addresses in your redcode can be difficult to read and maintain.

Consider the following code:

```redcode
dat #1, #2
mov -1, 10
```

The `mov` instruction copies the previous `dat` instruction to a new location. Suppose we now add a new line in between the `dat` and `mov` instructions:

```redcode
dat #1, #2
spl 5       ; <- a new instruction
mov -1, 10
```

The `mov` instruction now copies the `spl` rather than the `dat` as we originally intended.

The get around these problems and generally improve readability of your redcode you can use `labels`.

Labels allow aliases to be defined for addresses within your code. To specify a label, enter its name in front of the instruction's [opcode](opcodes). A label name must begin with an alphabetic character (a-z) or an underscore. The rest of the label can contain alphanumeric characters or underscores.

Optionally, a colon `:` may be placed after the label name.

Legal label declarations include:

```redcode
lbl
_Label
a123:
my_label:
b_13_
```

Once a label is declared, it can be used throughout your redcode in place of an [operand's](operands) number as demonstrated below.

```redcode
bmb: dat     #4, #0
top: add.ab bmb, bmb
     mov.i  bmb, @bmb
     jmp top
```

Here we have declared two labels `bmb` and `top`. The `bmb` label refers to the `dat` instruction's address and `top` to the `add` instruction's address.

When this program is parsed, the parser will replace all references to the label with its address relative to the instruction where it is used. The above code, when parsed will look like this:

```redcode
DAT.F #4, #0
ADD.AB $-1, $-1   ; <- here bmb was replaced with -1
MOV.I $-2, @-2    ; <- here bmb was replaced with -2
JMP.B $-2, $0     ; <- here top was replaced with -2
```

Notice that on the `add` instruction, the refence to `bmb` was replaced with `-1` since the `dat` instruction is one position above the `add` instruction. However on the `mov` instruction `bmb` was replaced with `-2` since the `dat` instruction is two positions above the `mov` instruction.

It is possible to define multiple labels for the same address, either by placing each label declaration on the same line or on multiple lines before the instruction they refer to:

```redcode
label:
another:
mov 0, 1
```

Here both `label` and `another` refer to the `mov` instruction's address.

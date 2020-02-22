# Enumerations

The following enumerations are used by the corewar library's API.

## Token Categories

Semantic meaning of tokens produced by the [Parser](./parser).

|Value|Meaning|
|---|---|
|0|Label|
|1|Opcode|
|2|Preprocessor|
|3|Modifier|
|4|Mode|
|5|Number|
|6|Comma|
|7|Maths|
|8|EOL|
|9|Comment|
|10|Unknown|

## Message Type

Message types which can be returned by the [Parser](./parser)

|Value|Meaning|
|---|---|
|0|Error|
|1|Warning|
|2|Info|

## Standard

Standard refers to the Corewar [Standard](../redcode/#standards) used.

|Value|Meaning|
|---|---|
|0|ICWS86|
|1|ICWS88|
|2|ICWS94draft|

## Opcode

Opcode refers to the [opcode](../redcode/opcodes) the instruction represents.

|Value|Meaning|
|---|---|
|0|DAT|
|1|MOV|
|2|ADD|
|3|SUB|
|4|MUL|
|5|DIV|
|6|MOD|
|7|JMP|
|8|JMZ|
|9|JMN|
|10|DJN|
|11|CMP|
|12|SEQ|
|13|SNE|
|14|SLT|
|15|SPL|
|16|NOP|

## Modifier

The [Modifier](../redcode/modifiers) for the instruction's operand.

|Value|Meaning|
|---|---|
|0|A|
|1|B|
|2|AB|
|3|BA|
|4|F|
|5|X|
|6|I|

## Mode

The [Addressing Mode](../redcode/addressing_modes) of the instruction's operand.

|Value|Meaning|
|---|---|
|0|Immediate (`#`)|
|1|Direct (`$`)|
|2|A Indirect (`*`)|
|3|B Indirect (`@`)|
|4|A Pre Decrement (`{`)|
|5|B Pre Decrement (`<`)|
|6|A Post Increment (`}`)|
|7|B Post Increment (`>`)|

## Enumeration

|Value|Meaning|
|---|---|
|||

## Enumeration

|Value|Meaning|
|---|---|
|||

## Enumeration

|Value|Meaning|
|---|---|
|||

## Enumeration

|Value|Meaning|
|---|---|
|||
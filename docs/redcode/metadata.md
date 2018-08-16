# Metadata

It is possible to include certain information about your warrior within special metadata comments. These comments are recognised by the parser and included in the parsed output (though they are excluded when the parsed warrior is loaded into the core).

The following metadata comments are recognised by the redcode parser

## ;redcode-94

Indicates that this warrior was written using [ICWS'94](./#standards) standard compliant redcode.

Earlier standards of Corewar did not have a standard way to declare the version of redcode used.  The corewar.io parser supports `;redcode-88` and `;redcode-86` comments.

When parsing output the corewar.io parser will emit a stardards comment matching the standard to which the redcode was built.

## ;name

Allows the author to give a name to their warrior, for example `;name imp`.

The corewar.io parser will insert a default name comment of `;name Nameless` if not name comment is found in the source redcode.

## ;author

Specifies the name of the warrior's author (i.e. you).

The corewar.io parser currently defaults this to `;author Blameless`.  Future versions may automatically include the author's user name when saving or parsing a warrior's redcode.

## ;strategy

A publically visible, high-level description of the warrior.  For example `;strategy A stone imp`.

It is possible to specify a multi-line strategy by including multiple strategy comments as shown below:

```redcode
;strategy This is a longer strategy which is 
;strategy broken down into three successive
;strategy lines
```
